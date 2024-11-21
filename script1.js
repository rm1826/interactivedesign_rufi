document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.text-section');
    const images = document.querySelectorAll('.bg-image');

    // Show first image by default
    if (images.length > 0) {
        images[0].classList.add('active');
    }

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionMiddle = rect.top + rect.height / 2;

            // If section is in the middle of the viewport
            if (sectionMiddle > 0 && sectionMiddle < windowHeight) {
                const imageIndex = section.getAttribute('data-image');
                
                // Remove active class from all images
                images.forEach(img => {
                    if (img.getAttribute('data-index') !== imageIndex) {
                        img.classList.remove('active');
                    }
                });

                // Add active class to the target image
                const targetImage = document.querySelector(`.bg-image[data-index="${imageIndex}"]`);
                if (targetImage && !targetImage.classList.contains('active')) {
                    targetImage.classList.add('active');
                }
            }
        });
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Check on initial load
    checkScroll();
});