// this file contains general functions

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

// frontend related functions

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

function toggleEmojiBar() {
    const emojiBar = document.getElementById('hidden-input-bar');
    const chatForm = document.getElementById('chat-form');
    if (emojiBar.style.display === 'none' || emojiBar.style.display === '') {
        emojiBar.style.display = 'flex'; // Show the element (flex can be changed to block or any other display value as needed)
        // chatForm.classList.remove('round-corner-top');
        
    } else {
        emojiBar.style.display = 'none'; // Hide the element
        // chatForm.classList.add('round-corner-top');
    }
}