// Инициализация адаптера
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Адаптер swetlov загружен');
    
    initHoverEffects();
    initAvatarAnimation();
    initAudioEffects();
    initCursorEffects();
    updateTime();
});

// Эффекты при наведении на кнопки
function initHoverEffects() {
    const buttons = document.querySelectorAll('.adapter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Добавляем класс активности
            this.classList.add('active');
            
            // Создаем частицы
            createParticles(this);
            
            // Воспроизводим звук (если доступен)
            playHoverSound();
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        // Клик по кнопке
        button.addEventListener('click', function(e) {
            // Анимация клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Статистика кликов (демо)
            logClick(this.href);
        });
    });
}

// Анимация аватара
function initAvatarAnimation() {
    const avatar = document.getElementById('avatar');
    if (!avatar) return;
    
    // Вращение при наведении
    avatar.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
    
    // Периодическое мерцание
    setInterval(() => {
        avatar.style.boxShadow = `
            0 0 ${20 + Math.random() * 20}px 
            rgba(128, 128, 128, ${0.3 + Math.random() * 0.3})
        `;
    }, 2000);
}

// Создание частиц
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 8;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Позиция
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(128, 128, 128, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        // Анимация
        const angle = (Math.PI * 2 / particles) * i;
        const speed = 2 + Math.random() * 2;
        const distance = 30 + Math.random() * 40;
        
        particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        document.body.appendChild(particle);
        
        // Удаление частицы
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Звуковые эффекты
function initAudioEffects() {
    // Создаем аудио контекст для более сложных звуков
    try {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            window.audioContext = new (AudioContext || webkitAudioContext)();
        }
    } catch (e) {
        console.log('Аудио контекст не поддерживается');
    }
}

function playHoverSound() {
    const audio = document.getElementById('hover-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Автовоспроизведение заблокировано'));
    }
}

// Эффекты курсора
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid rgba(128, 128, 128, 0.7)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, border-color 0.2s';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '4px';
    cursorDot.style.height = '4px';
    cursorDot.style.background = 'rgba(128, 128, 128, 0.9)';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Обновление позиции курсора
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Курсор-точка следует сразу
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Анимация основного курсора
    function animateCursor() {
        // Плавное следование основного курсора
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Эффекты при наведении на кнопки
    document.querySelectorAll('a, button, .adapter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(255, 255, 255, 0.9)';
            cursor.style.borderWidth = '1px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(128, 128, 128, 0.7)';
            cursor.style.borderWidth = '2px';
        });
    });
}

// Логирование кликов (демо)
function logClick(url) {
    console.log(`📊 Клик по ссылке: ${url}`);
    
    // Можно добавить отправку в Google Analytics или другую аналитику
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Adapter Link',
            'event_label': url
        });
    }
}

// Обновление времени (опционально)
function updateTime() {
    const timeElement = document.createElement('div');
    timeElement.id = 'live-time';
    timeElement.style.position = 'fixed';
    timeElement.style.bottom = '20px';
    timeElement.style.right = '20px';
    timeElement.style.color = 'rgba(128, 128, 128, 0.6)';
    timeElement.style.fontSize = '0.8rem';
    timeElement.style.fontFamily = 'monospace';
    timeElement.style.zIndex = '100';
    document.body.appendChild(timeElement);
    
    function update() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        timeElement.textContent = `⏱ ${timeString}`;
    }
    
    update();
    setInterval(update, 1000);
}

// Добавляем CSS для частиц
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
    }
    
    @media (max-width: 768px) {
        #custom-cursor,
        #cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);