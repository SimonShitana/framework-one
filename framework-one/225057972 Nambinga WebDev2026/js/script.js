/* ============================================
   MAIN JAVASCRIPT - Blue & White Portfolio
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       HEADER SCROLL ANIMATION
       ============================================ */
    const header = document.getElementById('header');
    
    function headerScroll() {
        if (window.scrollY > 30) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', headerScroll);
    headerScroll();
    
    /* ============================================
       MOBILE MENU TOGGLE
       ============================================ */
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar__link');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    document.addEventListener('click', function(event) {
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            const isClickInside = navbarMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside) {
                toggleMenu();
            }
        }
    });
    
    /* ============================================
       CONTACT FORM VALIDATION
       ============================================ */
    const contactForm = document.getElementById('messageForm');
    const formReply = document.getElementById('form-reply');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
            
            // Validation
            if (name === '') {
                showReply('Please enter your name.', 'error');
                return;
            }
            
            if (email === '') {
                showReply('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showReply('Please enter a valid email address.', 'error');
                return;
            }
            
            if (message === '') {
                showReply('Please enter your message.', 'error');
                return;
            }
            
            // Success message
            showReply(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`, 'success');
            
            // Clear form
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showReply(message, type) {
        if (formReply) {
            formReply.textContent = message;
            formReply.style.color = type === 'error' ? '#cc0000' : '#0052cc';
            formReply.style.fontWeight = type === 'error' ? 'bold' : 'normal';
            
            setTimeout(() => {
                formReply.textContent = '';
            }, 5000);
        }
    }
    
    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ============================================
       ADD ACTIVE CLASS TO CURRENT NAVIGATION
       ============================================ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar__link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.style.color = '#00b4d8';
        }
    });
    
    /* ============================================
       INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
       ============================================ */
    const fadeElements = document.querySelectorAll('.highlight-card, .skill-category, .interest-card, .timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});