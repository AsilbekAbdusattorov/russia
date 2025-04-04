document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем меню на мобилке после клика
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }
        });
    });
    
    // Управление видео
    const video = document.querySelector('.hero-video video');
    const playPauseBtn = document.querySelector('.play-pause');
    const muteUnmuteBtn = document.querySelector('.mute-unmute');
    
    if (video) {
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
            if (video.muted) {
                video.muted = false;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }
    
    // Табы в форме
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Удаляем активный класс у всех кнопок и контента
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и соответствующему контенту
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            const icon = this.querySelector('.toggle-icon');
            if (faqItem.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });
    
    // Виджет мессенджеров
    const messengerToggle = document.querySelector('.messenger-toggle');
    const messengerWidget = document.querySelector('.messenger-widget');
    
    messengerToggle.addEventListener('click', function() {
        messengerWidget.classList.toggle('active');
    });
    
    // Валидация формы
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая проверка капчи
            const captcha = document.getElementById('captcha');
            if (captcha && captcha.value !== '10') {
                alert('Пожалуйста, введите правильный ответ на вопрос.');
                return;
            }
            
            // Проверка заполнения обязательных полей
            const activeTab = document.querySelector('.tab-content.active');
            const activeInput = activeTab.querySelector('input');
            
            if (activeInput && activeInput.hasAttribute('required') && !activeInput.value) {
                alert('Пожалуйста, заполните обязательное поле.');
                return;
            }
            
            const nameInput = consultationForm.querySelector('input[name="name"]');
            if (nameInput && !nameInput.value) {
                alert('Пожалуйста, введите ваше имя.');
                return;
            }
            
            // Здесь должна быть отправка формы на сервер
            // Вместо этого просто покажем сообщение об успехе
            alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            consultationForm.reset();
        });
    }
    
    // Маска для телефона
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
});