// Reasons why I love Shabiba
const loveReasons = [
    {
        number: 1,
        emoji: "💖",
        text: "Your smile is my favorite sight — it melts my worries and makes my world feel lighter.",
        photo: "photos/7.jpg"
    },
    {
        number: 2,
        emoji: "🌷",
        text: "You love with such tenderness — being cared for by you feels rare and precious.",
        photo: "photos/9.jpg"
    },
    {
        number: 3,
        emoji: "💕",
        text: "The way you hold my heart so gently makes me feel deeply loved and chosen.",
        photo: "photos/10.png"
    },
    {
        number: 4,
        emoji: "✨",
        text: "You are my best friend and my love — the one I want beside me in every version of life.",
        photo: "photos/8.jpg"
    },
    {
        number: 5,
        emoji: "🤍",
        text: "You understand me without words — your presence alone brings me peace.",
        photo: "photos/11.jpg"
    },
    {
        number: 6,
        emoji: "💝",
        text: "Loving you makes me want to become the best version of myself, every single day.",
        photo: "photos/13.jpg"
    },
    {
        number: 7,
        emoji: "💫",
        text: "Time slows down with you — every moment feels intimate and endlessly special.",
        photo: "photos/shabiba2.jpg"
    },
    {
        number: 8,
        emoji: "🌸",
        text: "You are my safe place — where my heart feels calm, understood, and truly at home.",
        photo: "photos/1.jpg"
    },
    {
        number: 9,
        emoji: "💗",
        text: "Your love gives me confidence and courage — with you, the future feels beautiful.",
        photo: "photos/14.jpg"
    },
    {
        number: 10,
        emoji: "👑",
        text: "You are the woman I choose, every day and always — my love, my forever.",
        photo: "photos/12.jpg"
    }
];


// State variables
let currentReasonIndex = 0;
let isTransitioning = false;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.getElementById('shuffleButton');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const reasonCounter = document.getElementById('reasonCounter');
const continueButton = document.getElementById('continueButton');

// Create stars in background
function createStars() {
    const container = document.querySelector('.star-container');
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 4 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(star);
    }
}

// Create reason card
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.style.animationDelay = Math.random() + 's';
    
    card.innerHTML = `
        <div class="reason-number">${reason.number}</div>
        <div class="reason-content">
            <div class="reason-emoji">${reason.emoji}</div>
            <div class="reason-text">${reason.text}</div>
            <img src="${reason.photo}" alt="Reason ${reason.number}" class="reason-photo">
        </div>
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3
        });
    });
    
    return card;
}

// Add new reason to the page
function addNewReason() {
    if (isTransitioning || currentReasonIndex >= loveReasons.length) return;
    
    isTransitioning = true;
    
    const reason = loveReasons[currentReasonIndex];
    const card = createReasonCard(reason);
    
    // Set initial state
    gsap.set(card, {
        opacity: 0,
        scale: 0.8,
        y: 50
    });
    
    reasonsContainer.appendChild(card);
    
    // Animate card entry
    gsap.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => {
            // Animate photo appearance
            const photo = card.querySelector('.reason-photo');
            gsap.to(photo, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.3
            });
            
            // Create floating hearts
            createFloatingHearts(card);
            
            isTransitioning = false;
        }
    });
    
    // Update progress
    currentReasonIndex++;
    updateProgress();
    
    // Update counter
    reasonCounter.textContent = `${currentReasonIndex}/${loveReasons.length}`;
    
    // Show continue button if all reasons are shown
    if (currentReasonIndex === loveReasons.length) {
        setTimeout(() => {
            continueButton.classList.add('show');
            
            gsap.fromTo(continueButton,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }
            );
            
            // Change shuffle button text
            shuffleButton.innerHTML = `
                <span class="button-content">
                    <span class="heart-icon">🎂</span>
                    <span class="button-label">Happy Birthday My Love!</span>
                    <span class="sparkle">✨</span>
                </span>
            `;
            
            shuffleButton.style.background = 'linear-gradient(45deg, #ff1493, #9b6dff)';
            
            // Create celebration effect
            celebrateCompletion();
        }, 500);
    }
}

// Update progress bar and text
function updateProgress() {
    const percentage = (currentReasonIndex / loveReasons.length) * 100;
    
    gsap.to(progressFill, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: "power2.out"
    });
    
// Update progress text
const messages = [
    "Discovering more reasons to love you 💖",
    "Each moment makes me fall for you again 🌟",
    "You make my heart feel at home 🤍",
    "Loving you feels natural and right ✨",
    "You mean more to me than words can say 💕",
    "With you, everything feels brighter ☀️",
    "My love for you grows every day 💫",
    "You are my calm and my joy 🥰",
    "Forever feels beautiful with you 💖",
    "Happy Birthday, my beautiful Shabiba 🎂"
];

    
    if (currentReasonIndex > 0 && currentReasonIndex <= messages.length) {
        progressText.textContent = messages[currentReasonIndex - 1];
        
        gsap.fromTo(progressText,
            { opacity: 0, y: -10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.3
            }
        );
    }
}

// Create floating hearts animation
function createFloatingHearts(element) {
    const rect = element.getBoundingClientRect();
    const heartCount = 5;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = '20px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0';
        
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            opacity: 1,
            scale: 1.5,
            y: -100,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => heart.remove()
        });
    }
}

// Celebration effect when all reasons are shown
function celebrateCompletion() {
    // Create burst of hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💓', '💞'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.zIndex = '1000';
            heart.style.opacity = '0.8';
            
            document.body.appendChild(heart);
            
            gsap.to(heart, {
                y: '-100vh',
                x: Math.random() * 200 - 100,
                rotation: Math.random() * 720,
                duration: Math.random() * 3 + 2,
                ease: "power1.out",
                onComplete: () => heart.remove()
            });
        }, i * 100);
    }
    
    // Animate all cards
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
        }, index * 100);
    });
}

// Initialize page
function init() {
    // Create stars
    createStars();
    
    // Add first reason
    addNewReason();
    
    // Button click event
    shuffleButton.addEventListener('click', () => {
        if (!isTransitioning && currentReasonIndex < loveReasons.length) {
            // Button animation
            gsap.to(shuffleButton, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: addNewReason
            });
        } else if (currentReasonIndex >= loveReasons.length) {
            // All reasons shown - button does celebration
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 3
            });
            
            createFloatingHearts(shuffleButton);
        }
    });
    
    // Continue button event
    continueButton.addEventListener('click', () => {
        // Transition effect
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    });
    
    // Add click effect to cards
    document.addEventListener('click', (e) => {
        if (e.target.closest('.reason-card')) {
            const card = e.target.closest('.reason-card');
            gsap.to(card, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
    });
    
    // Add initial animation to header
    gsap.from('.header-section', {
        opacity: 0,
        y: -30,
        duration: 1,
        delay: 0.5
    });
    
    // Animate progress bar
    gsap.to(progressFill, {
        width: '10%',
        duration: 1,
        delay: 1
    });
}

// Start when page loads
window.addEventListener('load', init);