/**
 * AI Crafters Werbe-Slider
 * Automatischer Card-Slider mit Click-to-Action
 */

(function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.ad-card');
    const container = document.querySelector('.ad-slider-container');
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Navigation Functions
    function goToSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        const offset = -currentSlide * 100;
        container.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto-slide every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event Listeners
    document.querySelector('.ad-next').addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    document.querySelector('.ad-prev').addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Click on card to open URL
    slides.forEach(function(card) {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Pause on hover
    const slider = document.getElementById('ad-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide on load
    startAutoSlide();
})();
