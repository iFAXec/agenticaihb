function initApp() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu navigation opened.');
            // In a real implementation, this would toggle a mobile menu class
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ROI Calculator
    const hoursSlider = document.getElementById('hoursSlider');
    const costSlider = document.getElementById('costSlider');
    const hoursVal = document.getElementById('hoursVal');
    const costVal = document.getElementById('costVal');
    const monthlySavings = document.getElementById('monthlySavings');
    const annualRecovery = document.getElementById('annualRecovery');

    if (hoursSlider && costSlider) {
        function formatCurrency(num) {
            return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }

        function updateSliderBackground(sliderEl) {
            const val = (sliderEl.value - sliderEl.min) / (sliderEl.max - sliderEl.min) * 100;
            sliderEl.style.background = `linear-gradient(to right, var(--secondary) ${val}%, var(--border-color) ${val}%)`;
        }

        function calculateROI() {
            const hours = parseFloat(hoursSlider.value);
            const cost = parseFloat(costSlider.value);

            hoursVal.textContent = hours;
            costVal.textContent = '$' + cost;

            const monthly = (hours * cost) * 4.33;
            const annual = (hours * cost) * 52;

            if (monthlySavings) monthlySavings.textContent = formatCurrency(monthly);
            
            if (annualRecovery) {
                // Animation trick
                annualRecovery.classList.remove('counter-animate');
                void annualRecovery.offsetWidth; // trigger reflow
                annualRecovery.classList.add('counter-animate');
                annualRecovery.textContent = formatCurrency(annual);
            }

            // Update slider background fills
            updateSliderBackground(hoursSlider);
            updateSliderBackground(costSlider);
        }

        hoursSlider.addEventListener('input', calculateROI);
        costSlider.addEventListener('input', calculateROI);
        
        // Initial calc
        calculateROI();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
