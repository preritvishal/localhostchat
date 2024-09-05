package prerit.vishal.models

import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class Message(var id: Int = 1,
                   var senderIP: String = "",
                   val timestamp: String = LocalDateTime.now().toString(),
                   var message: String,
                   var replies: MutableList<Message> = mutableListOf<Message>()
)
