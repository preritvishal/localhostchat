package prerit.vishal.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.isActive
import java.time.Duration

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(84600)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    routing {
//        webSocket("/ws") { // websocketSession
//            for (frame in incoming) {
//                if (frame is Frame.Text) {
//                    val text = frame.readText()
//                    outgoing.send(Frame.Text("YOU SAID: $text"))
//                    if (text.equals("bye", ignoreCase = true)) {
//                        close(CloseReason(CloseReason.Codes.NORMAL, "Client said BYE"))
//                    }
//                }
//            }
//        }

        val clients = mutableListOf<DefaultWebSocketServerSession>()

        webSocket("/chat") {
            try {
                clients += this
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val receivedText = frame.readText()

                        println(receivedText)

                        if (clients.size == 1) {
                            clients.first().send(Frame.Text("{\"server response\": \"Client not connected!\"}"))
                        } else {
                            clients.forEach { client ->
                                if (client.isActive && client != this) {    // checking this for scrolling
                                    client.send(Frame.Text("{\"server response\": \"$receivedText\"}"))
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
