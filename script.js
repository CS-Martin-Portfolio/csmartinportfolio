document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const popupBoxes = document.querySelectorAll('.popup-box');
    
    gridItems.forEach(item => {
        // Add event listeners for click and touchstart
        item.addEventListener('click', handleItemClick);
        item.addEventListener('touchstart', handleItemClick);
    });

    function handleItemClick() {
        // Hide all other popups (only hide those that are visible)
        popupBoxes.forEach(box => {
            if (box.style.display === 'block') {
                box.style.display = 'none';
            }
        });
        
        const popupId = this.getAttribute('data-popup');
        const popup = document.getElementById(popupId);

        if (popup) {
            popup.style.display = 'block';
            
            const rect = this.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const popupHeight = popup.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Adjust popup position based on the square's location
            if (rect.right + popupWidth > windowWidth) {
                popup.style.left = `${rect.left - popupWidth - 10}px`; // Position left if at the edge
            } else {
                popup.style.left = `${rect.right + 10}px`; // Default to the right
            }

            // Adjust if the popup goes off the screen vertically
            if (rect.top + popupHeight > windowHeight) {
                popup.style.top = `${windowHeight - popupHeight - 20}px`; // Position at the bottom if too tall
            } else {
                popup.style.top = `${rect.top + window.scrollY}px`; // Default top position
            }
        } else {
            console.error('Popup not found for:', popupId);
        }
    }

    const closeButtons = document.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

    // Close popups when clicking outside of them
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.grid-item') && !event.target.closest('.popup-box')) {
            popupBoxes.forEach(box => {
                if (box.style.display === 'block') {
                    box.style.display = 'none';
                }
            });
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            popupBoxes.forEach(box => {
                if (box.style.display === 'block') {
                    box.style.display = 'none';
                }
            });
        }
    });

    // Adjust popup position when scrolling
    window.addEventListener('scroll', function() {
        const activePopup = document.querySelector('.popup-box[style*="block"]');
        if (activePopup) {
            const activeGridItem = document.querySelector(`.grid-item[data-popup="${activePopup.id}"]`);
            if (activeGridItem) {
                const rect = activeGridItem.getBoundingClientRect();
                const popupHeight = activePopup.offsetHeight;
                const windowHeight = window.innerHeight;

                // Adjust popup position on scroll
                if (rect.top + popupHeight > windowHeight) {
                    activePopup.style.top = `${windowHeight - popupHeight - 20}px`;
                } else {
                    activePopup.style.top = `${rect.top + window.scrollY}px`;
                }
            }
        }
    });
});

