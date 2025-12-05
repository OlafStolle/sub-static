/**
 * AI Crafters Werbe-Slider
 * Kontinuierlicher horizontaler Scroll mit Click-to-Action
 */

(function() {
    // Click on card to open URL
    const cards = document.querySelectorAll('.ad-card');

    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
})();
