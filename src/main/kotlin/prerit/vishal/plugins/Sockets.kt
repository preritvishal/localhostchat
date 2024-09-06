package prerit.vishal.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.isActive
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import prerit.vishal.models.*
import java.time.Duration

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(84600)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    routing {

        val clients = mutableSetOf<DefaultWebSocketSession>()

        webSocket("/chat") {
            try {
                val ipAddress = call.request.origin.remoteHost
                clients += this
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val receivedText = frame.readText()
                        println("Received $receivedText, from $ipAddress")
                        val incomingMessage = Json.decodeFromString<IncomingMessage>(receivedText)

                        val reply = Message(senderIP = ipAddress, client = incomingMessage.client)

                        if (clients.size == 1) {
                            println("replying")
                            clients.first().send(Frame.Text(reply))
                        } else {
                            println("broadcasting")
                            reply = Message(incomingMessage, ipAddress)
                            clients.forEach { client ->
                                if (client.isActive) {    // checking this for scrolling
                                    client.send(Frame.Text(Json.encodeToString()))
                                }
                            }
                        }
                    }
                }
            } catch (ex: Exception) {
                println(ex.stackTrace)
               clients -= this
            }
        }
    }
}
