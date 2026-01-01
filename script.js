// OriMind Website - Interactive Scripts with Parallax & Smooth Animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initParallax();
    initTiltEffect();
    initMagneticButtons();
    initImageLoading();
    initRippleEffects();
    initSmoothScroll();
    initTextAnimations();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    // Only show custom cursor on desktop
    if (window.innerWidth > 1024) {
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor follow
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            cursorDot.style.left = dotX - 3 + 'px';
            cursorDot.style.top = dotY - 3 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .focus-card, .agent-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// Navbar scroll effect with smooth transitions
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');

            const spans = menuBtn.querySelectorAll('span');
            if (menuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Advanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animateElements = [
        '.section-label',
        'section h2',
        '.about-content',
        '.about-tagline p',
        '.focus-card',
        '.execution-comparison',
        '.how-it-works',
        '.agent-card',
        '.different-content',
        '.vision-content',
        '.vision-image',
        '.step',
        '.infinall-description',
        '.infinall-subdesc'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('scroll-fade');
            el.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.1;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            
            // Only apply parallax when element is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                const yPos = (scrolled - elementTop + windowHeight) * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        const maxTilt = parseFloat(element.dataset.tiltMax) || 10;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * maxTilt;
            const tiltY = ((centerX - x) / centerX) * maxTilt;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic, .hero-cta, .cta-button, .nav-apply');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Image lazy loading with smooth fade-in
function initImageLoading() {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => img.classList.add('loaded'));
                }
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));
}

// Ripple effect for buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.hero-cta, .nav-apply, .cta-button, .infinall-cta');

    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Smooth scroll with easing
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Text reveal animations
function initTextAnimations() {
    const textElements = document.querySelectorAll('.hero-tagline, .cta-section h2');
    
    textElements.forEach(element => {
        const text = element.innerHTML;
        element.classList.add('text-reveal');
    });
}

// Floating particles background (subtle)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// Interactive card particles
document.querySelectorAll('.focus-card').forEach(card => {
    const particles = card.querySelector('.card-particles');
    if (!particles) return;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transition: all 0.5s ease;
        `;
        particles.appendChild(particle);
    }
    
    card.addEventListener('mouseenter', () => {
        particles.querySelectorAll('div').forEach((p, i) => {
            setTimeout(() => {
                p.style.opacity = '0.5';
                p.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`;
            }, i * 50);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        particles.querySelectorAll('div').forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translate(0, 0)';
        });
    });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), #ff8a50);
    z-index: 9999;
    transition: width 0.1s linear;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
});

// Console branding
console.log('%c🧠 OriMind', 'font-size: 28px; font-weight: bold; color: #f26625; text-shadow: 2px 2px 0 #ff8a50;');
console.log('%cOne Mind. Infinite Intelligence.', 'font-size: 16px; color: #4a4a4a; font-style: italic;');
console.log('%c→ orimind.com', 'font-size: 12px; color: #999;');
