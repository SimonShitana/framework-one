const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

const phrases = [
    "Hi, Welcome to my Personal Web Portfolio",
    "Metallurgical Engineer",
    "Extractive Metallurgy Enthusiast",
    "Sustainable Materials Innovator",
    "Let's Engineer a Better Future"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('changingWord');

function typeEffect() {
    if (!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typewriterElement) {
    setTimeout(typeEffect, 500);
}

function downloadCV() {
    const cvUrl = 'assets/pdfs/Helena_Amunyela.pdf';
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Helena_Amunyela.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    const replyMsg = document.getElementById('formReply');
    if (replyMsg) {
        replyMsg.textContent = 'CV download started';
        replyMsg.style.color = '#f9a8d4';
        setTimeout(() => { 
            if (replyMsg) replyMsg.textContent = ''; 
        }, 3000);
    }
}

const cvBtn = document.getElementById('downloadCVBtnContact');
if (cvBtn) cvBtn.addEventListener('click', downloadCV);

const contactForm = document.getElementById('contactForm');
const formReply = document.getElementById('formReply');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value.trim() || 'No subject';
        const message = document.getElementById('message')?.value.trim() || '';
        
        if (!name || !email || !message) {
            if (formReply) {
                formReply.textContent = 'Please fill in all required fields';
                formReply.style.color = '#ec4899';
            }
            return;
        }
        
        if (formReply) {
            formReply.innerHTML = `Thank you ${name}! Your message has been received. I will respond soon.`;
            formReply.style.color = '#a855f7';
            contactForm.reset();
            setTimeout(() => {
                if (formReply) formReply.innerHTML = '';
            }, 5000);
        }
    });
}

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 50) {
        header.style.padding = '1rem 0';
        header.style.background = 'rgba(10,10,10,0.95)';
    } else if (header) {
        header.style.padding = '1.6rem 0';
        header.style.background = 'rgba(10,10,10,0.9)';
    }
});