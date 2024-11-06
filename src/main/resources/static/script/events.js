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
    let lastEmoji = "";

    // Reusable function to handle the wheel event
    const translateWheelScroll = (event) => {
        event.preventDefault(); // Prevent the default scroll behavior
        event.currentTarget.scrollLeft += event.deltaY; // Scroll left/right based on vertical wheel movement
    };

    // Add the wheel event listener to each bar
    emojiBar.addEventListener('wheel', translateWheelScroll);
    actionBar.addEventListener('wheel', translateWheelScroll);
    multiplierBar.addEventListener('wheel', translateWheelScroll);

    const emojis = emojiBar.querySelectorAll('label');
    emojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            messageInput.value += emoji.textContent; // Append the emoji to the input
            lastEmoji = emoji.textContent;
            messageInput.focus(); // Focus on the message input after clicking the emoji
        });
    });

    const multipliers = multiplierBar.querySelectorAll('label');
    multipliers.forEach(multiple => {
        multiple.addEventListener('click', function () {
            number = parseInt(multiple.textContent.substring(1, multiple.textContent.length));
            for (let i = 0; i < number; ++i) {
                messageInput.value += lastEmoji;
                messageInput.focus();
            }
        });
    });
});


// show action bar when "/" is typed
document.addEventListener('DOMContentLoaded', function() { 

    const messageInput = document.getElementById('message-input');
    const hiddenInputBar = document.getElementById('hidden-input-bar');
    const emojiBar = document.getElementById('hidden-input-emoji-bar');
    const multiplierBar = document.getElementById('hidden-input-multiplier-bar');
    const actionBar = document.getElementById('hidden-input-action-bar');
    
    messageInput.addEventListener('keydown', function(event) {
        if (event.key == "/") {
            hiddenInputBar.style.display = "flex";
            actionBar.style.display = "flex";
            emojiBar.style.display = "none";
            multiplierBar.style.display = "none";
        }
        if (event.key == " " || event.key == "Backspace" || event.key == "Delete") {
            hiddenInputBar.style.display = "none";
            actionBar.style.display = "none";
            emojiBar.style.display = "flex";
            multiplierBar.style.display = "flex";
        }
    });

});