[file name]: script.js
[file content begin]
// ========== NAVIGATION FUNCTION ==========
function showSection(sectionId, e) {
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
    if (e && e.target) {
        e.target.classList.add('active');
    }
    
    // Add confetti effect
    createConfetti();
    createLoveEmojis(10);
}

// ========== DAYS COUNTER FUNCTION ==========
function calculateDaysTogether() {
    // Tanggal jadian: 24 Maret 2025
    const startDate = new Date('2025-03-24');
    const today = new Date();
    
    // Set waktu ke 00:00:00 untuk perhitungan akurat
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Hitung selisih hari
    const diffTime = today - startDate;
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    
    // Update di HTML
    const daysElement = document.getElementById('daysTogether');
    if (daysElement) {
        daysElement.textContent = diffDays;
        
        // Tambah efek khusus untuk milestone
        if ([7, 30, 100, 365].includes(diffDays)) {
            daysElement.style.animation = 'glow 0.5s infinite alternate';
            createConfetti();
            createLoveEmojis(50);
            showSpecialMessage(diffDays);
        }
        
        // Update warna berdasarkan jumlah hari
        updateCounterColor(diffDays);
    }
    
    return diffDays;
}

// ========== UPDATE COUNTER COLOR ==========
function updateCounterColor(days) {
    const daysElement = document.getElementById('daysTogether');
    if (!daysElement) return;
    
    const dateCounter = document.querySelector('.date-counter');
    if (!dateCounter) return;
    
    // Gradient berdasarkan jumlah hari
    if (days >= 365) {
        dateCounter.style.background = 'linear-gradient(45deg, #ff006e, #ffd700)'; // Gold untuk 1 tahun
        daysElement.style.color = '#fff';
    } else if (days >= 100) {
        dateCounter.style.background = 'linear-gradient(45deg, #ff006e, #ff1493)'; // Pink strong
        daysElement.style.color = '#fff';
    } else if (days >= 30) {
        dateCounter.style.background = 'linear-gradient(45deg, #ff477e, #ff85a1)'; // Pink medium
    } else if (days >= 7) {
        dateCounter.style.background = 'linear-gradient(45deg, #ff85a1, #ffafcc)'; // Pink light
    }
}

// ========== SPECIAL MESSAGES ==========
function showSpecialMessage(days) {
    const messages = {
        1: "🎉 Hari pertama kita bersama! Awal yang indah...",
        7: "🎊 Minggu pertama bersama Sindi! Seminggu penuh kebahagiaan! 💕",
        30: "🌟 Sebulan bersama kamu! Setiap hari semakin mencintaimu!",
        100: "💯 100 hari mencintaimu! Terima kasih untuk setiap momen indah!",
        365: "🎂🎉 1 TAHUN CINTA KITA! Aku mencintaimu lebih dari kata-kata bisa ungkapkan! 💘"
    };
    
    if (messages[days]) {
        // Buat notification
        const notification = document.createElement('div');
        notification.className = 'special-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff006e, #ff477e);
                padding: 40px;
                border-radius: 25px;
                text-align: center;
                box-shadow: 0 0 60px rgba(255, 0, 110, 0.7);
                z-index: 10000;
                animation: popIn 0.5s ease;
                color: white;
                max-width: 90%;
                width: 400px;
                border: 3px solid white;
            ">
                <div style="font-size: 50px; margin-bottom: 15px;">🎉</div>
                <h2 style="margin-bottom: 15px; font-size: 1.8em;">${messages[days]}</h2>
                <p style="font-size: 1.1em; opacity: 0.9;">💖 Marwan 💖</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 25px;
                    background: white;
                    color: #ff006e;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1em;
                    transition: all 0.3s ease;
                ">Tutup</button>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Extra effects
        createConfetti();
        createLoveEmojis(100);
        
        // Auto play celebration sound
        playCelebrationSound();
        
        // Auto remove setelah 15 detik
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 15000);
    }
}

// ========== CELEBRATION SOUND ==========
function playCelebrationSound() {
    const audio = new Audio();
    // Gunakan sound effect celebration (bisa diganti dengan file sendiri)
    audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3';
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Celebration sound:', e));
}

// ========== MUSIC PLAYER FUNCTION ==========
function toggleMusic(e) {
    const audio = document.getElementById('ourSong');
    const button = e.target;
    
    // Simple play/pause
    try {
        if (audio.paused) {
            audio.volume = 0.7;
            audio.play();
            button.textContent = '⏸️ Pause Lagu';
            button.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
            createLoveEmojis(20);
        } else {
            audio.pause();
            button.textContent = '🎵 Putar Lagu Kita';
            button.style.background = 'linear-gradient(45deg, #ff006e, #ff477e)';
        }
    } catch (error) {
        console.error('Audio error:', error);
        button.textContent = '👆 Tap Screen Dulu';
        
        // Fallback untuk mobile
        const onceClick = () => {
            audio.play();
            button.textContent = '⏸️ Pause Lagu';
            button.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
            document.removeEventListener('click', onceClick);
        };
        
        document.addEventListener('click', onceClick);
    }
}

// ========== CONFETTI EFFECT FUNCTION ==========
function createConfetti() {
    const colors = ['#ff006e', '#ff477e', '#ff85a1', '#ffafcc', '#ffd6e0'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.width = (Math.random() * 12 + 8) + 'px';
            confetti.style.height = (Math.random() * 12 + 8) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 30);
    }
}

// ========== CREATE PINK BUBBLES BACKGROUND ==========
function createPinkBubbles() {
    const bubblesContainer = document.querySelector('.pink-bubbles');
    for (let i = 0; i < 25; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = Math.random() * 100 + 30 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '-100px';
        bubble.style.animationDelay = Math.random() * 10 + 's';
        bubble.style.opacity = Math.random() * 0.6 + 0.3;
        bubble.style.background = `radial-gradient(circle, 
            hsl(${320 + Math.random() * 40}, 100%, ${65 + Math.random() * 20}%), 
            hsl(${330 + Math.random() * 30}, 100%, ${60 + Math.random() * 15}%))`;
        bubblesContainer.appendChild(bubble);
    }
}

// ========== SPARKLE CURSOR EFFECT ==========
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.7) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        sparkle.style.boxShadow = `0 0 10px hsl(${Math.random() * 360}, 100%, 70%)`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 800);
    }
});

// ========== RANDOM LOVE EMOJIS ==========
function createLoveEmojis(count = 5) {
    const emojis = ['💖', '💕', '💞', '💓', '💗', '💘', '💝', '🌸', '🎀', '✨', '🌟', '🎉', '🎊', '🥰', '😍'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'love-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
            emoji.style.animationDuration = (Math.random() * 4 + 3) + 's';
            emoji.style.animationDelay = Math.random() * 1 + 's';
            emoji.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.remove();
                }
            }, 5000);
        }, i * 150);
    }
}

// ========== IMAGE CLICK ZOOM EFFECT ==========
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item, .preview-photo');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 0 50px rgba(255, 0, 110, 0.5);
                animation: zoomIn 0.5s ease;
                border: 3px solid #ff006e;
            `;
            
            // Add caption if exists
            if (this.alt && this.alt !== 'Foto kita') {
                const caption = document.createElement('div');
                caption.textContent = this.alt;
                caption.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    color: white;
                    background: rgba(255, 0, 110, 0.8);
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-size: 1.1em;
                `;
                overlay.appendChild(caption);
            }
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', function() {
                this.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    if (this.parentNode) {
                        document.body.removeChild(this);
                    }
                }, 300);
            });
            
            // Add keyboard close
            const closeOnEscape = (e) => {
                if (e.key === 'Escape') {
                    overlay.click();
                }
            };
            document.addEventListener('keydown', closeOnEscape);
            overlay._closeOnEscape = closeOnEscape;
        });
    });
});

// ========== AUTO-PLAY AUDIO SETUP ==========
let audioInitialized = false;
document.addEventListener('click', function initAudio() {
    if (!audioInitialized) {
        const audio = document.getElementById('ourSong');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Auto-play blocked:', e));
        audioInitialized = true;
        document.removeEventListener('click', initAudio);
        
        // Update button text
        const playButton = document.querySelector('.play-music');
        if (playButton) {
            playButton.textContent = '⏸️ Pause Lagu';
            playButton.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
        }
    }
});

// ========== WINDOW LOAD FUNCTION ==========
window.addEventListener('load', function() {
    console.log('💖 Website untuk Sindi sudah siap!');
    
    // Hitung hari jadian
    const daysTogether = calculateDaysTogether();
    console.log(`📅 Sudah ${daysTogether} hari bersama Sindi sejak 24 Maret 2025!`);
    
    // Update counter setiap 5 menit
    setInterval(calculateDaysTogether, 300000);
    
    // Setup audio events
    const audio = document.getElementById('ourSong');
    
    audio.addEventListener('loadeddata', () => {
        console.log('🎵 Audio loaded, duration:', audio.duration, 'seconds');
    });
    
    audio.addEventListener('error', (e) => {
        console.error('❌ Audio error:', audio.error);
        const playButton = document.querySelector('.play-music');
        if (playButton) {
            playButton.textContent = '🔇 File Audio Tidak Ditemukan';
            playButton.style.background = '#ccc';
            playButton.disabled = true;
        }
    });
    
    // Auto effects
    createPinkBubbles();
    setTimeout(() => {
        createConfetti();
        createLoveEmojis(15);
    }, 1000);
    
    // Auto create emojis periodically
    setInterval(() => {
        if (Math.random() > 0.6) {
            createLoveEmojis(Math.floor(Math.random() * 3) + 1);
        }
    }, 8000);
    
    // Check if today is special date
    const today = new Date();
    if (today.getDate() === 24 && today.getMonth() + 1 === 3) { // 24 Maret
        console.log('🎂 HARI INI ULANG TAHUN BULAN JADIAN!');
        createConfetti();
        createLoveEmojis(100);
        
        // Update title
        document.title = "💖 Happy Anniversary Sindi! - From Marwan";
        const titleElement = document.querySelector('.title');
        if (titleElement) {
            titleElement.innerHTML = '💖 Happy Anniversary Sayang! 💖';
        }
    }
});

// ========== ANIMATION KEYFRAMES (Dinamis) ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
        70% { transform: translate(-50%, -50%) scale(1.05); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);

// ========== ADD DATE TO FOOTER ==========
window.addEventListener('load', function() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('id-ID', options);
    
    const footer = document.querySelector('.footer');
    if (footer) {
        const dateElement = document.createElement('p');
        dateElement.textContent = `Hari ini: ${dateString} 💕`;
        dateElement.style.marginTop = '10px';
        dateElement.style.fontSize = '0.9em';
        dateElement.style.opacity = '0.8';
        footer.appendChild(dateElement);
    }
});
[file content end]
