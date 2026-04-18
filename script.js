// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1500);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Menu Tabs =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuContents = document.querySelectorAll('.menu-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // Remove active from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show target content
        menuContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) {
                content.classList.add('active');
            }
        });
    });
});

// ===== Reviews Carousel =====
const track = document.querySelector('.reviews-track');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let currentSlide = 0;

function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function getCardWidth() {
    const card = document.querySelector('.review-card');
    if (!card) return 0;
    return card.offsetWidth + 20; // width + gap
}

function updateCarousel() {
    const cardWidth = getCardWidth();
    const translateValue = currentSlide * cardWidth;
    track.style.transform = `translateX(${translateValue}px)`;
}

function getTotalSlides() {
    const cards = document.querySelectorAll('.review-card');
    const perView = getCardsPerView();
    return Math.max(0, cards.length - perView);
}

nextBtn.addEventListener('click', () => {
    const max = getTotalSlides();
    if (currentSlide < max) {
        currentSlide++;
        updateCarousel();
    } else {
        currentSlide = 0;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    } else {
        currentSlide = getTotalSlides();
        updateCarousel();
    }
});

// Auto-play carousel
let carouselInterval = setInterval(() => {
    const max = getTotalSlides();
    if (currentSlide < max) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateCarousel();
}, 5000);

// Pause on hover
const carousel = document.getElementById('reviewsCarousel');
carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        const max = getTotalSlides();
        if (currentSlide < max) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
    }, 5000);
});

// Reset on resize
window.addEventListener('resize', () => {
    currentSlide = 0;
    updateCarousel();
});

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.querySelectorAll('.section-header, .about-grid, .menu-tabs, .menu-content, .gallery-grid, .reviews-stats, .reviews-carousel, .contact-grid, .about-feature, .contact-card').forEach(el => {
    el.classList.add('reveal');
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax effect for hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
