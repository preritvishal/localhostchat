package prerit.vishal.models

import kotlinx.serialization.EncodeDefault
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.time.LocalDateTime

object messageCounter {
    private var counter = 0;
    fun getNextNumber() = ++counter;
}

@Serializable
@OptIn(ExperimentalSerializationApi::class)     // to change the default behaviour of serializer
data class Message (
    var id: Int = messageCounter.getNextNumber(),
    var senderIP: String,
    var client: String,
    val timestamp: String = LocalDateTime.now().toString(),
    var message: String,
    @EncodeDefault(EncodeDefault.Mode.ALWAYS)       // to show the empty variables
    var replies: MutableList<Message> = mutableListOf<Message>()
) {
    fun toJsonString(): String {
        return Json.encodeToString(this)
    }
}