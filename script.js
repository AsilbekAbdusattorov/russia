document.addEventListener('DOMContentLoaded', function() {
    // ========== Header Scroll Effect ==========
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ========== Mobile Menu ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Animate menu items
            const navItems = mainNav.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (mainNav.classList.contains('active')) {
                    item.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
                } else {
                    item.style.animation = '';
                }
            });
        });
    }
    
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav?.classList.contains('active')) {
                    menuToggle?.classList.remove('active');
                    mainNav?.classList.remove('active');
                }
            }
        });
    });
    
    // ========== Video Controls ==========
    const video = document.querySelector('.hero-video video');
    const playPauseBtn = document.querySelector('.play-pause');
    const muteUnmuteBtn = document.querySelector('.mute-unmute');
    
    if (video && playPauseBtn && muteUnmuteBtn) {
        // Autoplay video on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Autoplay prevented:', e));
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video.parentElement);
        
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        muteUnmuteBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            this.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
    }
    
    // ========== Tab System ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.animation = '';
            });
            
            // Add active class to current
            this.classList.add('active');
            const activeTab = document.getElementById(`${tabId}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.style.animation = 'fadeIn 0.4s ease';
            }
        });
    });
    
    // ========== FAQ Accordion ==========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close all other items
                if (!item.classList.contains('active')) {
                    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                        activeItem.classList.remove('active');
                        activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                    });
                }
                
                // Toggle current item
                item.classList.toggle('active');
                answer.style.maxHeight = item.classList.contains('active') ? 
                    answer.scrollHeight + 'px' : '0';
            });
        }
    });
    
    // ========== Messenger Widget ==========
    const messengerWidget = document.querySelector('.messenger-widget');
    
    if (messengerWidget) {
        const messengerToggle = messengerWidget.querySelector('.messenger-toggle');
        
        messengerToggle?.addEventListener('click', function(e) {
            e.stopPropagation();
            messengerWidget.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function() {
            messengerWidget.classList.remove('active');
        });
        
        // Prevent closing when clicking widget
        messengerWidget.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // ========== Form Validation ==========
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate captcha
            const captcha = document.getElementById('captcha');
            if (captcha && captcha.value.trim() !== '10') {
                shakeElement(captcha);
                return false;
            }
            
            // Validate name
            const nameInput = consultationForm.querySelector('input[name="name"]');
            if (nameInput && !nameInput.value.trim()) {
                shakeElement(nameInput);
                return false;
            }
            
            // Validate phone if in active tab
            const activeTab = consultationForm.querySelector('.tab-content.active');
            const phoneInput = activeTab?.querySelector('input[type="tel"]');
            if (phoneInput && !phoneInput.value.trim()) {
                shakeElement(phoneInput);
                return false;
            }
            
            // Show success state
            const submitBtn = consultationForm.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('success');
                }, 3000);
            }
            
            consultationForm.reset();
            return false;
        });
    }
    
    // ========== Phone Mask ==========
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="whatsapp"], input[name="phone"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7' + value.substring(1);
            }
            
            this.value = value;
        });
    });
    
    // ========== Animation Helper ==========
    function shakeElement(element) {
        element.classList.add('shake');
        element.focus();
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    // ========== Scroll Animations ==========
    const animateOnScroll = function() {
        const animateElements = [
            { selector: 'section', animation: 'fadeInUp' },
            { selector: '.feature', animation: 'fadeInUp', delay: 0.1 },
            { selector: '.price-card', animation: 'scaleIn', delay: 0.1 },
            { selector: '.benefit-card', animation: 'fadeInUp', delay: 0.1 },
            { selector: '.step', animation: 'slideInLeft', delay: 0.1 },
            { selector: '.contact-images img', animation: 'fadeIn', delay: 0.2 }
        ];
        
        const screenPosition = window.innerHeight / 1.3;
        
        animateElements.forEach(config => {
            document.querySelectorAll(config.selector).forEach((element, index) => {
                if (element.getBoundingClientRect().top < screenPosition) {
                    const delay = config.delay ? index * config.delay : 0;
                    element.style.animation = `${config.animation} 0.6s ease forwards ${delay}s`;
                }
            });
        });
    };
    
    // Run animations on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Animation Keyframes */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    /* Animation Classes */
    .shake {
        animation: shake 0.5s;
    }
    
    /* Form Success State */
    .submit-btn.success {
        background-color: #4CAF50 !important;
    }
`;
document.head.appendChild(style);