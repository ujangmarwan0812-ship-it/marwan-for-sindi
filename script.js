// Navigation function
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Add confetti effect when switching sections
    createConfetti();
    createLoveEmojis(10); // Tambah emoji extra
}

// Music player function
function toggleMusic(event) { // ✅ Tambah parameter 'event'
    const audio = document.getElementById('ourSong');
    const button = event.target;
    
    // Debug: cek apakah audio file beneran ada
    console.log('Audio src:', audio.src);
    console.log('Audio current src:', audio.currentSrc);
    
    if (audio.paused) {
        audio.play().then(() => {
            // Success
            button.textContent = '⏸️ Pause Lagu';
            button.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
            createLoveEmojis(20);
            console.log('🎵 Audio playing');
        }).catch(error => {
            // Failed - biasanya karena autoplay policy
            console.error('Audio play failed:', error);
            button.textContent = '👆 Klik Dimana Saja Dulu';
            button.style.background = 'linear-gradient(45deg, #ff006e, #ff0000)';
            
            // One-time click listener untuk enable audio
            const enableAudio = () => {
                audio.play();
                button.textContent = '⏸️ Pause Lagu';
                button.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
                document.removeEventListener('click', enableAudio);
            };
            
            document.addEventListener('click', enableAudio);
        });
    } else {
        audio.pause();
        button.textContent = '🎵 Putar Lagu Kita';
        button.style.background = 'linear-gradient(45deg, #ff006e, #ff477e)';
    }
}

// Confetti effect function
function createConfetti() {
    const colors = ['#ff006e', '#ff477e', '#ff85a1', '#ffafcc', '#ffd6e0'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create pink bubbles background
function createPinkBubbles() {
    const bubblesContainer = document.querySelector('.pink-bubbles');
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = Math.random() * 80 + 20 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = Math.random() * 100 + 'px';
        bubble.style.animationDelay = Math.random() * 8 + 's';
        bubble.style.opacity = Math.random() * 0.6 + 0.2;
        bubblesContainer.appendChild(bubble);
    }
}

// Sparkle cursor effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.8) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.background = `hsl(${Math.random() * 360}, 100%, 65%)`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
});

// Random love emojis
function createLoveEmojis(count = 5) {
    const emojis = ['💖', '💕', '💞', '💓', '💗', '💘', '💝', '🌸', '🎀', '✨'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'love-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = (Math.random() * 15 + 15) + 'px';
            emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
            emoji.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.remove();
                }
            }, 4000);
        }, i * 200);
    }
}

// Image click zoom effect
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item, .preview-photo');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0, 0, 0, 0.95)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            overlay.style.cursor = 'pointer';
            overlay.style.animation = 'fadeIn 0.3s ease';
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.borderRadius = '15px';
            enlargedImg.style.boxShadow = '0 0 50px rgba(255, 0, 110, 0.5)';
            enlargedImg.style.animation = 'fadeIn 0.5s ease';
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', function() {
                overlay.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
            });
        });
    });
});

// Auto-create effects on page load
window.addEventListener('load', function() {
    createPinkBubbles();
    setTimeout(() => {
        createConfetti();
        createLoveEmojis(15);
    }, 1000);
    
    // Auto create emojis periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createLoveEmojis(3);
        }
    }, 5000);
});

// Add smooth scroll to elements
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Typewriter effect for title (bonus)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
