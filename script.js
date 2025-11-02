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
}

// Music player function
function toggleMusic() {
    const audio = document.getElementById('ourSong');
    const button = event.target;
    
    if (audio.paused) {
        audio.play();
        button.textContent = '⏸️ Pause Lagu';
        button.style.background = 'linear-gradient(45deg, #ff477e, #ff006e)';
    } else {
        audio.pause();
        button.textContent = '🎵 Putar Lagu Kita';
        button.style.background = 'linear-gradient(45deg, #ff006e, #ff477e)';
    }
}

// Confetti effect function
function createConfetti() {
    const colors = ['#ff006e', '#ff477e', '#ff85a1', '#ffafcc'];
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
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            overlay.style.cursor = 'pointer';
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.borderRadius = '10px';
            enlargedImg.style.boxShadow = '0 0 50px rgba(255, 0, 110, 0.5)';
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });
});

// Auto-create confetti on page load
window.addEventListener('load', function() {
    setTimeout(createConfetti, 1000);
});

// Add smooth scroll to elements
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
