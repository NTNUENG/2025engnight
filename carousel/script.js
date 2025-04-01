
// JavaScript to control carousel functionality
const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const indicators = document.querySelectorAll('.carousel-indicators button');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

// Function to update the carousel position
function updateCarousel() {
    const offset = -currentIndex * 100; // Move carousel by 100% of one item
    carouselInner.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

// Function to update indicator buttons
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Automatic scrolling every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
}, 3000);  // Change slides every 3 seconds