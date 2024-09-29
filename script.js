document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const popupBoxes = document.querySelectorAll('.popup-box');
    
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            // Hide all other popups
            popupBoxes.forEach(box => {
                box.style.display = 'none';
            });
            
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            popup.style.display = 'block';
            
            const rect = this.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const windowWidth = window.innerWidth;
            
            // Adjust popup position based on the square's location
            if (rect.right + popupWidth > windowWidth) {
                popup.style.left = `${rect.left - popupWidth - 10}px`; // Position left if at the edge
            } else {
                popup.style.left = `${rect.right + 10}px`; // Default to the right
            }
            popup.style.top = `${rect.top + window.scrollY}px`;
        });
    });
    
    const closeButtons = document.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.grid-item') && !event.target.closest('.popup-box')) {
            popupBoxes.forEach(box => {
                box.style.display = 'none';
            });
        }
    });

    document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        popupBoxes.forEach(box => {
            if (box.style.display === 'block') {
                box.style.display = 'none';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const titleImage = document.querySelector('.title-block img'); // Target the title image
    const gridSection = document.getElementById('grid-section');   // Target the grid section


    if (titleImage && gridSection) {
        const scrollToGrid = (event) => {
            event.preventDefault(); // Prevent any default action
            gridSection.scrollIntoView({ behavior: 'smooth' });
        };

        titleImage.addEventListener('click', scrollToGrid);
        titleImage.addEventListener('touchstart', scrollToGrid);
    }
});

        });
