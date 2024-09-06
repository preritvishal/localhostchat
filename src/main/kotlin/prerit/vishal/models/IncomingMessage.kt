package prerit.vishal.models

import kotlinx.serialization.Serializable

@Serializable
data class IncomingMessage(
    val client: String,
    val query: String
)
