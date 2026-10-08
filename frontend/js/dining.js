

document.addEventListener('DOMContentLoaded', () => {
    initDiningInteractions();
});

function initDiningInteractions() {
    const reserveButtons = document.querySelectorAll('.reserve-dining-btn');
    
    reserveButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const experienceName = e.target.getAttribute('data-experience') || 'Private Culinary Event';
            alert(`Culinary Concierge: Your interest in "${experienceName}" has been noted. You can include this directly in your reservation via the Booking Portal.`);
        });
    });
}