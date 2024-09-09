let socket;

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

function showMessageToUser(event) {
    let receivedText = JSON.parse(event.data);

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