package prerit.vishal.models

import kotlinx.serialization.Serializable
import java.time.LocalDateTime

object messageCounter {
    private var counter = 0;
    fun getNextNumber() = ++counter;
}

@Serializable
class Message constructor (
    var id: Int = messageCounter.getNextNumber(),
    var senderIP: String,
    var client: String,
    val timestamp: String = LocalDateTime.now().toString(),
    var message: String,
    var replies: MutableList<Message> = mutableListOf<Message>()
) {
    constructor(incomingMessage: IncomingMessage, ip: String) : this(
        messageCounter.getNextNumber(),
        ip,
        incomingMessage.client,
        LocalDateTime.now().toString(),
        incomingMessage.query,
        mutableListOf<Message>()
    )
}
