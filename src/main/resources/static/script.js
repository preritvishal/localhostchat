let socket;
let serverURL = 'wss://bold-snake-amusing.ngrok-free.app/chat';
let permission;

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

function setupSocket() {
    socket = new WebSocket(serverURL);

    socket.onopen = logOpenToConsole;
    socket.onclose = logCloseToConsole;
    socket.onmessage = showMessageToUser;
}

function logCloseToConsole() {
    console.log("Web socket connection closed");
}

function logOpenToConsole() {
    console.log("Web socket connection opened");
}

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

function showMessageToUser(event) {
    let receivedText = JSON.parse(event.data);
    showNotification();

    if (receivedText == "") {
        return
    }

    if (receivedText.client == generateClientID()) {
        receivedText.client = "me";
    }
    console.log(receivedText)
    appendMessage(receivedText)

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
    scrollToBottom();
    return false;
}

// events

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