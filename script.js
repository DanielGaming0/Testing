// Modern Slider Application
class ModernSlider {
    constructor() {
        // Configuration
        this.currentSlide = 1;
        this.totalSlides = 5;
        this.isTransitioning = false;
        
        // DOM Elements
        this.slidesWrapper = document.getElementById('slidesWrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressBar = document.getElementById('progressBar');
        
        // Initialize the slider
        this.init();
    }
    
    init() {
        // Initialize Feather icons
        feather.replace();
        
        // Bind event listeners
        this.bindEvents();
        
        // Set initial state
        this.updateProgressBar();
        
        // Preload images
        this.preloadImages();
        
        // Auto-start animations for the first slide
        setTimeout(() => {
            this.animateProgressBars();
        }, 1000);
        
        console.log('Modern Slider initialized successfully');
    }
    
    bindEvents() {
        // Navigation button events
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index + 1);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // CTA and action button events
        this.bindActionButtons();
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;
        
        this.slidesWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.slidesWrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const swipeDistance = startX - endX;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }
    
    bindActionButtons() {
        // CTA Button (Slide 1)
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.handleCTAClick();
            });
        }
        
        // Contact Action Buttons (Slide 5)
        const actionButtons = document.querySelectorAll('.action-button');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleActionClick(e.target.closest('.action-button'));
            });
        });
        
        // Social Links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(link);
            });
        });
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextSlide = this.currentSlide === this.totalSlides ? 1 : this.currentSlide + 1;
        this.goToSlide(nextSlide);
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        const prevSlide = this.currentSlide === 1 ? this.totalSlides : this.currentSlide - 1;
        this.goToSlide(prevSlide);
    }
    
    goToSlide(slideNumber) {
        if (this.isTransitioning || slideNumber === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        // Update current slide
        const previousSlide = this.currentSlide;
        this.currentSlide = slideNumber;
        
        // Calculate transform value
        const translateX = -(slideNumber - 1) * 100;
        
        // Apply transform
        this.slidesWrapper.style.transform = `translateX(${translateX}vw)`;
        
        // Update active states
        this.updateActiveStates(previousSlide);
        
        // Update progress bar
        this.updateProgressBar();
        
        // Handle slide-specific animations
        setTimeout(() => {
            this.handleSlideSpecificAnimations();
            this.isTransitioning = false;
        }, 800);
        
        // Update browser URL (optional)
        this.updateURL();
        
        console.log(`Navigated to slide ${slideNumber}`);
    }
    
    updateActiveStates(previousSlide) {
        // Update slide active class
        const slides = document.querySelectorAll('.slide');
        slides[previousSlide - 1].classList.remove('active');
        slides[this.currentSlide - 1].classList.add('active');
        
        // Update indicator active class
        this.indicators[previousSlide - 1].classList.remove('active');
        this.indicators[this.currentSlide - 1].classList.add('active');
    }
    
    updateProgressBar() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    handleSlideSpecificAnimations() {
        switch(this.currentSlide) {
            case 4: // Performance slide
                this.animateProgressBars();
                break;
            case 3: // Stats slide
                this.animateStats();
                break;
        }
    }
    
    animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach((fill, index) => {
            setTimeout(() => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            }, index * 200);
        });
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 300);
            }, index * 150);
        });
    }
    
    preloadImages() {
        for (let i = 1; i <= this.totalSlides; i++) {
            const img = new Image();
            img.src = `assets/slide${i}.jpg`;
            
            img.onload = () => {
                console.log(`Image slide${i}.jpg loaded successfully`);
            };
            
            img.onerror = () => {
                console.warn(`Failed to load image slide${i}.jpg`);
                // Use a fallback or placeholder
                this.handleImageError(i);
            };
        }
    }
    
    handleImageError(slideNumber) {
        // Create a fallback gradient background
        const slide = document.querySelector(`[data-slide="${slideNumber}"] .slide-image`);
        if (slide) {
            slide.style.display = 'none';
            const overlay = document.querySelector(`[data-slide="${slideNumber}"] .slide-overlay`);
            if (overlay) {
                overlay.style.opacity = '0.9';
            }
        }
    }
    
    handleCTAClick() {
        // Animate to next slide or perform custom action
        this.nextSlide();
        
        // Add custom analytics or tracking here
        console.log('CTA button clicked');
    }
    
    handleActionClick(button) {
        const buttonText = button.textContent.trim().toLowerCase();
        
        if (buttonText.includes('mensagem') || buttonText.includes('mail')) {
            // Handle email action
            this.showNotification('Abrindo cliente de email...', 'success');
            // In a real application, you might open mailto: or a contact form
        } else if (buttonText.includes('ligar') || buttonText.includes('phone')) {
            // Handle phone action
            this.showNotification('Redirecionando para telefone...', 'success');
            // In a real application, you might open tel: link
        }
        
        console.log(`Action button clicked: ${buttonText}`);
    }
    
    handleSocialClick(link) {
        const icon = link.querySelector('i');
        const platform = icon.getAttribute('data-feather');
        
        this.showNotification(`Abrindo ${platform}...`, 'info');
        
        // In a real application, you would navigate to actual social media profiles
        console.log(`Social link clicked: ${platform}`);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            padding: '1rem 2rem',
            borderRadius: '25px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        });
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'rgba(76, 175, 80, 0.9)';
                break;
            case 'info':
                notification.style.background = 'rgba(33, 150, 243, 0.9)';
                break;
            case 'warning':
                notification.style.background = 'rgba(255, 152, 0, 0.9)';
                break;
            case 'error':
                notification.style.background = 'rgba(244, 67, 54, 0.9)';
                break;
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    handleResize() {
        // Ensure proper positioning after resize
        const translateX = -(this.currentSlide - 1) * 100;
        this.slidesWrapper.style.transform = `translateX(${translateX}vw)`;
    }
    
    updateURL() {
        // Update URL without page reload (optional)
        if (history.pushState) {
            const newUrl = `${window.location.pathname}#slide-${this.currentSlide}`;
            history.pushState({ slide: this.currentSlide }, '', newUrl);
        }
    }
    
    // Public methods for external control
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    isSliderTransitioning() {
        return this.isTransitioning;
    }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if required elements exist
    const requiredElements = [
        'slidesWrapper',
        'prevBtn', 
        'nextBtn',
        'slideIndicators',
        'progressBar'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.error('Missing required DOM elements:', missingElements);
        return;
    }
    
    // Initialize the slider
    window.modernSlider = new ModernSlider();
    
    // Handle initial URL hash
    const hash = window.location.hash;
    const slideMatch = hash.match(/#slide-(\d+)/);
    if (slideMatch) {
        const slideNumber = parseInt(slideMatch[1]);
        if (slideNumber >= 1 && slideNumber <= 5) {
            setTimeout(() => {
                window.modernSlider.goToSlide(slideNumber);
            }, 100);
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.slide && window.modernSlider) {
        window.modernSlider.goToSlide(e.state.slide);
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernSlider;
}
