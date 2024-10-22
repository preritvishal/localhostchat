let socket;
let serverURL = 'wss://bold-snake-amusing.ngrok-free.app/chat';
let permission;
let messageAppearance = "json";

function generateClientID() {
    let clientID = localStorage.getItem('clientID');
    if (!clientID) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        clientID = 'client-' + array[0].toString(36);
        localStorage.setItem('clientID', clientID);
    }
    return clientID;
}

function scrollToBottom() {
    const messageList = document.getElementById("previous-text-div");
    messageList.scrollTop = messageList.scrollHeight;
}

// socket related functions

function setupSocket() {
    socket = new WebSocket(serverURL);

    socket.onopen = logOpenToConsole;
    socket.onclose = logCloseToConsole;
    socket.onmessage = showMessageToUser;
}

function logCloseToConsole() {
    console.log("Web socket connection closed");
    document.getElementById('prompt-input-symbol').style.color = 'red';
}

function logOpenToConsole() {
    console.log("Web socket connection opened");
    document.getElementById('prompt-input-symbol').style.color = '#47f547';
}

function sendMessageToServer() {
    var message_input = document.getElementById("message-input").value;
    document.getElementById("message-input").value = "";
    let messageObject = {
        "client": generateClientID(),
        "query": message_input
    };
    console.log(messageObject);
    socket.send(JSON.stringify(messageObject));
    // appendMessage(messageObject);
    // scrollToBottom();
    return false;
}

// frontend realted functions

function appendMessage(message) {
    const messageList = document.getElementById("previous-text-div");
    const messageElement = document.createElement("pre");

    messageElement.textContent = JSON.stringify(message, null, 4);
    messageList.appendChild(messageElement);
}

function showNotification() {

    if (permission === "granted") {
        const notification = new Notification("New Updates", {
            message: "Updated!"
        });

        notification.onclick = () => {
            window.focus(); // Focus the tab when the user clicks on the notification
        };
    }
}

function changeMessageFormat() {
    messageAppearance = "json";
}

function showMessageToUser(event) {
    let receivedText = JSON.parse(event.data);
    if (receivedText == "") {
        return
    }

    if (receivedText.client == generateClientID()) {
        receivedText.client = "me";
    }

    if (receivedText.client != "me") {
        showNotification();
    }

    console.log(receivedText);
    appendMessage(receivedText);

    if (receivedText.client == "me") {
        scrollToBottom();
    }
}

// event related functions

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
    console.log('In view:', item.textContent);
    messageAppearance = item.textContent;
    rePopulateScreenWithMessage();
}

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
}


// visual customization

