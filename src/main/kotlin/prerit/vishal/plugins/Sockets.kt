package prerit.vishal.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.isActive
import prerit.vishal.service.processIncomingText
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
                        val reply = processIncomingText(frame.readText(), ipAddress)
                        clients.forEach { client ->
                            if (client.isActive) {
                                client.send(Frame.Text(reply))
                            }
                        }
                    }
                }
            } catch (ex: Exception) {
                println(ex.message)
                println(ex.stackTrace)
                clients -= this
            }
        }
    }
}
