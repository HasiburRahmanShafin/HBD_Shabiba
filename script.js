// ============================================
// COMPLETE SCRIPT FOR SHABIBA'S BIRTHDAY WEBSITE
// ============================================

// Secret messages for random appearance
const secretMessages = [
  "Cutest soul in the universe 🌌",
  "I love you 💖",
  "My sunshine, Shabiba ☀️",
  "Every day with you is magic ✨",
  "You make my heart dance 💓",
  "So excited to celebrate you 🎉",
  "My favorite hello, hardest goodbye 🥺",
  "Your smile lights up cities 🌃",
  "Luckiest person alive 🍀",
  "Happy Birthday, Shabiba 🎂",
  "You make moments special 💫",
  "My love is endless 🌊",
  "Rarer than diamonds 💎",
  "Thank you for being you 💕"
];

// Typewriter effect for greeting
const greetingText = "My dearest Shabiba, you are more than my love — you are my sunshine, my calm, and my home. You understand me in ways no one else ever has, and with you I feel safe, calm, and truly myself. On your birthday, I just want you to know that I see you — your strength, your softness, your beautiful soul. I choose you, today and always. May your life be filled with the love and peace you give so effortlessly. Happy Birthday, my love. 💖";
let charIndex = 0;

function typeGreeting() {
    const greetingElement = document.getElementById('greetingText');
    if (!greetingElement) return;
    
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        
        // Random speed for natural typing
        const speed = Math.random() * 50 + 50;
        setTimeout(typeGreeting, speed);
        
      
    }
}

// Create sparkle animation
function createSparkle(element) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1rem';
    sparkle.style.opacity = '0';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (Math.random() * rect.width) + 'px';
    sparkle.style.top = (Math.random() * rect.height) + 'px';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    gsap.to(sparkle, {
        opacity: 1,
        scale: 1.5,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        onComplete: () => sparkle.remove()
    });
}

// Create cursor trail
function initializeCursorTrail() {
    const cursorTrail = document.querySelector('.cursor-trail');
    if (!cursorTrail) return;
    
    const trailLength = 8;
    const trailPoints = [];
    
    // Create trail dots
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.opacity = 0.7 - (i * 0.1);
        cursorTrail.appendChild(dot);
        trailPoints.push({
            element: dot,
            x: 0,
            y: 0
        });
    }
    
    let mouseX = 0, mouseY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate dots
    function animateTrail() {
        trailPoints.forEach((point, index) => {
            setTimeout(() => {
                point.x += (mouseX - point.x - 10) * 0.3;
                point.y += (mouseY - point.y - 10) * 0.3;
                
                gsap.to(point.element, {
                    x: point.x,
                    y: point.y,
                    duration: 0.1,
                    ease: "power2.out"
                });
            }, index * 10);
        });
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

// Create floating hearts in background
function createBackgroundHearts() {
    const container = document.querySelector('.background-hearts');
    if (!container) return;
    
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💝'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `floatUp ${Math.random() * 10 + 10}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, 20000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    // Continue creating hearts
    setInterval(createHeart, 1500);
}

// Create floating up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create confetti
function createConfetti(x, y, count = 50) {
    const colors = ['#ff69b4', '#ff1493', '#9b6dff', '#ff6dc7', '#ffb6c1'];
    const container = document.querySelector('.confetti-container') || document.body;
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        container.appendChild(confetti);
        
        gsap.to(confetti, {
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            rotation: Math.random() * 360,
            scale: 0,
            duration: Math.random() * 2 + 1,
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

// Create secret message popup
function createSecretMessage(x, y) {
    const message = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    const popup = document.createElement('div');
    popup.className = 'message-popup';
    popup.textContent = message;
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    
    document.body.appendChild(popup);
    
    gsap.fromTo(popup,
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            y: '-=50',
            duration: 0.5,
            ease: "back.out"
        }
    );
    
    setTimeout(() => {
        gsap.to(popup, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            onComplete: () => popup.remove()
        });
    }, 2000);
}

// Update countdown
function updateCountdown() {
    // Set birthday date to February 5, 2026
    const birthdayDate = new Date('February 5, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = birthdayDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('countdownDays').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdownHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdownMinutes').textContent = minutes.toString().padStart(2, '0');
        
        // Animate numbers
        gsap.to('.time-value', {
            scale: 1.2,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    } else {
        // Birthday has arrived!
        const title = document.getElementById('countdownTitle');
        if (title) {
            title.textContent = "🎉 IT'S YOUR BIRTHDAY TODAY! 🎉";
            title.style.color = '#ff1493';
            title.style.fontSize = '1.8rem';
            
            // Animate the title
            gsap.to(title, {
                scale: 1.1,
                duration: 0.5,
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut"
            });
        }
        
        // Create extra celebration
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createConfetti(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    30
                );
            }, i * 200);
        }
    }
}

// Music player
function initializeMusicPlayer() {
    const musicButton = document.getElementById('musicToggle');
    const birthdayAudio = document.getElementById('birthdayAudio');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (!musicButton || !birthdayAudio) return;
    
    let isPlaying = false;
    
    // Set initial volume
    birthdayAudio.volume = 0.5;
    if (volumeSlider) {
        volumeSlider.value = 50;
    }
    
    musicButton.addEventListener('click', () => {
        if (!isPlaying) {
            birthdayAudio.play().catch(e => {
                console.log("Autoplay prevented. Click again to play.");
                musicButton.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Click to Play</span>';
            });
            musicButton.innerHTML = '<span class="music-icon">🎶</span><span class="music-text">Pause Music</span>';
            isPlaying = true;
            
            gsap.to(musicButton, {
                backgroundColor: '#ff1493',
                duration: 0.3
            });
        } else {
            birthdayAudio.pause();
            musicButton.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Play Birthday Theme</span>';
            isPlaying = false;
            
            gsap.to(musicButton, {
                backgroundColor: '#9b6dff',
                duration: 0.3
            });
        }
    });
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            birthdayAudio.volume = this.value / 100;
        });
    }
}

// Create heart at click location
function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.textContent = '💖';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '30px';
    heart.style.transform = 'translate(-50%, -50%) scale(0)';
    
    document.body.appendChild(heart);
    
    gsap.to(heart, {
        scale: 1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            gsap.to(heart, {
                y: '-=100',
                opacity: 0,
                duration: 1,
                onComplete: () => heart.remove()
            });
        }
    });
}

// Animate love meter
function animateLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveText = document.getElementById('loveText');
    
    if (!loveMeter || !loveText) return;
    
    // Animate the love meter fill
    gsap.to(loveMeter, {
        width: '100%',
        duration: 2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true
    });
    
    // Animate the love text
    const loveWords = ['100% Infinite', 'Endless Love', 'Forever & Always', 'More Than 100%', 'Limitless Love'];
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % loveWords.length;
        gsap.to(loveText, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loveText.textContent = loveWords[index] + ' 💝';
                gsap.to(loveText, {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    }, 3000);
}

// Page transition
function createPageTransition() {
    const transition = document.createElement('div');
    transition.style.position = 'fixed';
    transition.style.top = '0';
    transition.style.left = '0';
    transition.style.width = '100%';
    transition.style.height = '100%';
    transition.style.background = 'linear-gradient(45deg, #ff69b4, #9b6dff)';
    transition.style.zIndex = '10000';
    transition.style.transform = 'scale(0)';
    transition.style.borderRadius = '50%';
    
    document.body.appendChild(transition);
    
    gsap.to(transition, {
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            window.location.href = 'cause.html';
        }
    });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    console.log("🎂 Shabiba's Birthday Website - Loading with love... 💖");
    
    // Start typing greeting
    setTimeout(typeGreeting, 1000);
    
    // Initialize features
    initializeCursorTrail();
    createBackgroundHearts();
    initializeMusicPlayer();
    animateLoveMeter();
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    
    // Animate CTA button
    const surpriseButton = document.getElementById('surpriseButton');
    if (surpriseButton) {
        gsap.to(surpriseButton, {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        
        surpriseButton.addEventListener('click', () => {
            // Create transition effect
            createPageTransition();
        });
    }
    
    // Add click anywhere for surprises
    document.addEventListener('click', (e) => {
        // Don't trigger on button clicks
        if (e.target.closest('button')) return;
        
        // Create confetti
        createConfetti(e.clientX, e.clientY, 20);
        
        // Create heart at click location
        createClickHeart(e.clientX, e.clientY);
        
        // Occasionally show secret message (20% chance)
        if (Math.random() > 0.8) {
            createSecretMessage(e.clientX, e.clientY);
        }
    });
    
    // Add animation to nickname bubbles
    const bubbles = document.querySelectorAll('.cloud-bubble');
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            gsap.to(bubble, {
                scale: 1.1,
                duration: 0.3,
                ease: "back.out"
            });
        });
        
        bubble.addEventListener('mouseleave', () => {
            gsap.to(bubble, {
                scale: 1,
                duration: 0.3,
                ease: "back.out"
            });
        });
    });
    
    console.log("✅ Website ready! Happy Birthday Shabiba! 🎉💝");
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    
    // Provide emergency navigation if button fails
    setTimeout(() => {
        if (!document.querySelector('.emergency-nav')) {
            const emergencyButton = document.createElement('button');
            emergencyButton.className = 'emergency-nav';
            emergencyButton.innerHTML = 'Click here if navigation fails';
            emergencyButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff1493;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                z-index: 100000;
                cursor: pointer;
                font-family: 'Comic Neue', cursive;
                box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
            `;
            emergencyButton.onclick = () => {
                window.location.href = 'cause.html';
            };
            document.body.appendChild(emergencyButton);
            
            // Remove after 10 seconds
            setTimeout(() => {
                if (emergencyButton.parentNode) {
                    emergencyButton.parentNode.removeChild(emergencyButton);
                }
            }, 10000);
        }
    }, 5000);
});