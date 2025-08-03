document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    const slidesWrapper = document.getElementById('slidesWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const progressBar = document.getElementById('progressBar');

    let currentSlide = 1;
    const totalSlides = 5;
    let isTransitioning = false;

    function updateSlide(slideNumber) {
        if (isTransitioning || slideNumber === currentSlide) return;
        isTransitioning = true;

        const prevSlide = currentSlide;
        currentSlide = slideNumber;

        slidesWrapper.style.transform = `translateX(-${(currentSlide - 1) * 100}vw)`;
        indicators[prevSlide - 1].classList.remove('active');
        indicators[currentSlide - 1].classList.add('active');
        progressBar.style.width = `${(currentSlide / totalSlides) * 100}%`;

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    prevBtn.addEventListener('click', () => {
        updateSlide(currentSlide === 1 ? totalSlides : currentSlide - 1);
    });
    nextBtn.addEventListener('click', () => {
        updateSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
    });

    indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            updateSlide(i + 1);
        });
    });

    // Teclas de atalho
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        if (e.key === 'ArrowLeft') updateSlide(currentSlide === 1 ? totalSlides : currentSlide - 1);
        if (e.key === 'ArrowRight') updateSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
    });

    // Swipe no celular
    let startX = 0;
    slidesWrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    slidesWrapper.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) updateSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
            else updateSlide(currentSlide === 1 ? totalSlides : currentSlide - 1);
        }
    }, { passive: true });
});