package prerit.vishal.service

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import prerit.vishal.models.IncomingMessage
import prerit.vishal.models.Message
import prerit.vishal.models.MessageStore
import prerit.vishal.util.isCommand
import prerit.vishal.util.toJsonString

fun processIncomingText(receivedText: String, ipAddress: String): String {
    val incomingMessage = Json.decodeFromString<IncomingMessage>(receivedText)
    val message = Message(
        senderIP = ipAddress,
        client = incomingMessage.client,
        message = incomingMessage.query,
    )

    if (incomingMessage.query.isCommand()) {
        val returnedValue = commandProcessor(incomingMessage.query, message)
        when (returnedValue) {
            is Message -> return returnedValue.toJsonString()
            is String -> return returnedValue.toJsonString()
        }
    }
    return MessageStore.addMessage(message).toJsonString()
}

private fun commandProcessor(commandLine: String, message: Message): Any {

    val commandList = commandLine.split(" ")

    when (commandList.size) {
        1 -> when (commandList.get(0)) {
            "/test" -> println("testing confirmed!")
            "/last" -> println("removing the last message by given client!")
            "/clear" -> {}
        }

        2 -> when (commandList.get(0)) {
            "/last" -> println("the second arg is ${commandList.get(1)}")
        }

        3 -> when (commandList.get(0)) {
            "/reply" -> {
                try {
                    val subStrIndx = "/reply ".length + commandList.get(1).length + 1
                    message.message = message.message.substring(subStrIndx) // just the reply text
                    return MessageStore.addReply(commandList.get(1).toInt(), message)
                } catch (ex: Exception) {
                    println(ex.message)
                    println(ex.stackTrace)
                }
            }
        }
    }
    return ""
}