// this file contains websocket related functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tryReconnecting(once = false) {
    document.getElementById('prompt-input-symbol').style.color = '#e49835';

    if (once) {
        setupSocket();
    }
    else {
        sleep(reConnectDelay).then(() => {
            setupSocket();
        });
    }
}

function setupSocket() {
    socket = new WebSocket(serverURL);

    socket.onopen = logOpenToConsole;
    socket.onclose = logCloseToConsole;
    socket.onmessage = showMessageToUser;
}

function logOpenToConsole() {
    console.log("Web socket connection opened");
    document.getElementById('prompt-input-symbol').style.color = '#47f547';
}

function logCloseToConsole() {
    console.log("Web socket connection closed");
    document.getElementById('prompt-input-symbol').style.color = 'red';
    tryReconnecting();
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
    return false;
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
    if (messageAppearance == "json") {
        appendMessage(receivedText);
    } else if (messageAppearance == "text") {
        appendMessage(receivedText.client + ": " + receivedText.message);
    }


    if (receivedText.client == "me") {
        scrollToBottom();
    }
}
