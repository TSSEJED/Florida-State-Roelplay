// ===========================================
// PROTECTION: Right-Click and Developer Tools
// ===========================================

// 1. Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 2. Disable keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if ((e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
    
    // Additional common developer shortcuts
    if (e.key === 'F11' || // Fullscreen
        (e.ctrlKey && e.key === 's') || // Save
        (e.ctrlKey && e.key === 'p') || // Print
        (e.ctrlKey && e.shiftKey && e.key === 'P') // Browser's command palette
    ) {
        e.preventDefault();
        return false;
    }
});

// 3. Disable developer tools menu (for some browsers)
Object.defineProperty(document, 'oncontextmenu', {
    get() { return null; },
    set() {}
});

// 4. Prevent opening developer tools by right-clicking on elements
['contextmenu', 'mousedown', 'mouseup', 'keydown', 'keyup', 'keypress'].forEach(event => {
    document.addEventListener(event, function(e) {
        if (e.which === 123) { // F12
            e.preventDefault();
            return false;
        }
    }, true);
});

// 5. Prevent opening developer tools via browser menu
if (window.console && window.console.firebug) {
    console.clear();
    document.body.innerHTML = '';
}

// 6. Prevent debugging by breaking into debugger
setInterval(function() {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) { // If debugger was opened
        document.body.innerHTML = '';
        window.close();
        window.location.href = 'about:blank';
    }
}, 1000);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            document.body.style.overflow = 'auto';
        }, 1000);
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Sticky Header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hidden') && currentScroll > 200) {
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        header.classList.remove('hidden');
    }
    
    header.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Smooth scroll to target
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on initial load

// Particle Background
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `-${Math.random() * 20}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add hover-shine effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('hover-shine');
    });
    
    // Add hover-scale to cards
    const cards = document.querySelectorAll('.card, .feature-box');
    cards.forEach(card => {
        card.classList.add('hover-scale');
    });
});

// Form Validation
const forms = document.querySelectorAll('form');

if (forms.length > 0) {
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Add error message or animation
            }
        });
    });
}

// Add active class to current navigation link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);
highlightNav(); // Run on page load
