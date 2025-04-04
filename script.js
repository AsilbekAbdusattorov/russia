document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu with animations
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
    
    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
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
    
    // Video controls
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
                this.classList.add('active');
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.classList.remove('active');
            }
        });
        
        muteUnmuteBtn.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.classList.remove('active');
            } else {
                video.muted = true;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                this.classList.add('active');
            }
        });
    }
    
    // Tab system with animations
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
            activeTab.classList.add('active');
            activeTab.style.animation = 'fadeIn 0.4s ease';
        });
    });
    
    // FAQ accordion with animations
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                // Close all others
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        item.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
                
                // Open this one
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Messenger widget
    const messengerToggle = document.querySelector('.messenger-toggle');
    const messengerWidget = document.querySelector('.messenger-widget');
    
    if (messengerToggle && messengerWidget) {
        messengerToggle.addEventListener('click', function(e) {
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
    
    // Form validation
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate captcha
            const captcha = document.getElementById('captcha');
            if (captcha && captcha.value !== '10') {
                shakeElement(captcha);
                return;
            }
            
            // Validate name
            const nameInput = consultationForm.querySelector('input[name="name"]');
            if (nameInput && !nameInput.value.trim()) {
                shakeElement(nameInput);
                return;
            }
            
            // Validate phone if in active tab
            const activeTab = consultationForm.querySelector('.tab-content.active');
            const phoneInput = activeTab?.querySelector('input[type="tel"]');
            if (phoneInput && !phoneInput.value.trim()) {
                shakeElement(phoneInput);
                return;
            }
            
            // Show success animation
            const submitBtn = consultationForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
            
            consultationForm.reset();
        });
    }
    
    // Phone mask
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
    
    // Animation helper function
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        element.focus();
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);

    // Enhanced scroll animations for sections
    const animateSectionsOnScroll = function() {
        const sections = document.querySelectorAll('section');
        const features = document.querySelectorAll('.feature');
        const priceCards = document.querySelectorAll('.price-card');
        const benefitCards = document.querySelectorAll('.benefit-card');
        const steps = document.querySelectorAll('.step');
        const contactImages = document.querySelectorAll('.contact-images img');
        
        // Animate sections
        sections.forEach((section, index) => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                // Different animations for different sections
                if (section.id === 'home') {
                    section.style.animation = 'fadeIn 0.8s ease forwards';
                } else if (section.id === 'prices') {
                    section.style.animation = 'slideInLeft 0.8s ease forwards';
                } else if (section.id === 'about') {
                    section.style.animation = 'slideInRight 0.8s ease forwards';
                } else {
                    section.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            }
        });
        
        // Animate features
        features.forEach((feature, index) => {
            const featurePosition = feature.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (featurePosition < screenPosition) {
                feature.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            }
        });
        
        // Animate price cards
        priceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.animation = `scaleIn 0.6s ease forwards ${index * 0.1}s`;
            }
        });
        
        // Animate benefit cards
        benefitCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
            }
        });
        
        // Animate steps
        steps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (stepPosition < screenPosition) {
                step.style.animation = `slideInLeft 0.6s ease forwards ${index * 0.1}s`;
            }
        });
        
        // Animate contact images
        contactImages.forEach((img, index) => {
            const imgPosition = img.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (imgPosition < screenPosition) {
                img.style.animation = `fadeIn 0.6s ease forwards ${index * 0.2}s`;
            }
        });
    };
    
    // Run animations on scroll and on load
    window.addEventListener('scroll', animateSectionsOnScroll);
    window.addEventListener('load', animateSectionsOnScroll);
    animateSectionsOnScroll();
});