// this file contains event related functions

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.scrollable-message-format');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Call your function when the item is in the viewport
                itemInView(entry.target);
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

// Function to call when an item is in view
function itemInView(item) {
    console.log('In view:', item.textContent.trim());
    messageAppearance = item.textContent.trim();
}

// for later advancements
function rePopulateScreenWithMessage() {
    const previousTextDiv = document.getElementById('previous-text-div');
    const allPre = previousTextDiv.getElementsByTagName('pre');

    let existingMessages = [];

    for (let i = 0; i < allPre.length; ++i) {
        let jsonText = allPre[i].textContent;
        try {
            existingMessages.push(JSON.parse(jsonText));
        } catch (e) {
            console.error(e);
        }
    }

    document.getElementById('previous-text-div').innerHTML = "";
    existingMessages.forEach(data => {
        appendMessage(data.message);
    })
}

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