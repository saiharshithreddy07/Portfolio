// ========================================
// Navigation Functionality
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll handler for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// Typing Animation
// ========================================
const typedText = document.getElementById('typed-text');
const phrases = [
    'Data Scientist',
    'Data Analyst',
    'ML Enthusiast',
    'SQL Expert',
    'Python Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ========================================
// Counter Animation
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
        };

        updateCounter();
    });
}

// ========================================
// Skill Progress Bars Animation
// ========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        bar.classList.add('animate');
    });
}

// ========================================
// Scroll-based Animations (Intersection Observer)
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Enhanced Scroll Reveal System
const revealElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .contact-card, ' +
    '.skill-card, .about-text, .about-image, .contact-text, ' +
    '.section-title, .info-item'
);

revealElements.forEach((el, index) => {
    // Add scroll-reveal class
    el.classList.add('scroll-reveal');

    // Add staggered delay for grid items
    if (el.classList.contains('skill-card') ||
        el.classList.contains('project-card') ||
        el.classList.contains('contact-card')) {
        el.style.transitionDelay = `${index * 0.1}s`;
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Legacy fade-in support
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// Counter animation observer
const heroStats = document.querySelector('.hero-stats');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (heroStats) {
    counterObserver.observe(heroStats);
}

// Skill bars animation observer
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.2 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========================================
// Magnetic Button Effect
// ========================================
const magneticButtons = document.querySelectorAll('.btn, .project-link, .social-link');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;

        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = x * strength * 0.3;
            const moveY = y * strength * 0.3;

            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Enhanced Parallax Effect for Hero Shapes
// ========================================
const shapes = document.querySelectorAll('.shape');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function animateShapes() {
    // Smooth interpolation for parallax
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        const moveX = (currentX - 0.5) * speed;
        const moveY = (currentY - 0.5) * speed;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateShapes);
}

animateShapes();

// ========================================
// Scroll Progress Indicator
// ========================================
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    // Can be used for a progress bar if needed
    // document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// Form Validation (if contact form added)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c👋 Hello, curious developer!
%cI'm Sai Harshith Reddy - a Data Analyst who loves turning data into insights.

Want to work together? Let's connect!
📧 saiharshithreddy07@gmail.com
`,
    'color: #03ef62; font-size: 18px; font-weight: bold;',
    'color: #a0b3c6; font-size: 14px;');

// ========================================
// Page Load Complete
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial scroll check for elements in viewport
    window.dispatchEvent(new Event('scroll'));
});

// ========================================
// Tilt Effect for Project Cards (Optional Enhancement)
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// Copy to Clipboard Functionality
// ========================================
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy. Please try again.');
    });
}

function showToast(message) {
    const toast = document.getElementById('copyToast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
