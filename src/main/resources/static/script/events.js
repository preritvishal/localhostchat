// this file contains event related functions

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.scrollable-message-format');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Call your function when the item is in the viewport
                messageAppearance = entry.target.textContent.trim();
            }
        });
    }, {
        root: document.querySelector('.right-side-option-divs'), // Use the scrollable container as the root
        threshold: 0.5 // Trigger when at least 50% of the item is visible
    });

    items.forEach(item => {
        observer.observe(item); // Observe each item
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if we've already stored the permission
    permission = localStorage.getItem('notificationPermission');

    // If no permission stored, request it
    if (!permission) {
        Notification.requestPermission().then(function(permission) {
            localStorage.setItem('notificationPermission', permission);
            console.log('Notification permission:', permission);
        });
    } else {
        console.log('Notification permission already stored:', permission);
    }
});

// scroll left right on scrolling up down

document.addEventListener('DOMContentLoaded', function() {

    const emojiBar = document.getElementById('hidden-input-emoji-bar');
    const multiplierBar = document.getElementById('hidden-input-multiplier-bar');
    const actionBar = document.getElementById('hidden-input-action-bar');
    const messageInput = document.getElementById('message-input');

    // Reusable function to handle the wheel event
    const handleWheelScroll = (event) => {
        event.preventDefault(); // Prevent the default scroll behavior
        event.currentTarget.scrollLeft += event.deltaY; // Scroll left/right based on vertical wheel movement
    };

    // Add the wheel event listener to each bar
    emojiBar.addEventListener('wheel', handleWheelScroll);
    actionBar.addEventListener('wheel', handleWheelScroll);
    multiplierBar.addEventListener('wheel', handleWheelScroll);

    const emojis = emojiBar.querySelectorAll('label');
    emojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            messageInput.value += emoji.textContent; // Append the emoji to the input
            messageInput.focus(); // Focus on the message input after clicking the emoji
        });
    });
});
