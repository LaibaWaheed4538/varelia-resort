

document.addEventListener('DOMContentLoaded', () => {
    initExperiencesInteractions();
});

function initExperiencesInteractions() {
    const expCards = document.querySelectorAll('.experience-card');
    
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}