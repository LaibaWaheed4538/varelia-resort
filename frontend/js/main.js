

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initScrollObserver();
    initParallaxHero();
});


function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}


function initScrollObserver() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.feature-card, .stat-box, .section-intro');
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal-hidden');
        el.style.transitionDelay = `${(index % 3) * 0.18}s`;
        revealObserver.observe(el);
    });
}


function initParallaxHero() {
    const hero = document.querySelector('.hero-section');
   
    if (!hero || hero.getAttribute('style')) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    }, { passive: true });
}