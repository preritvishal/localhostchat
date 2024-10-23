package prerit.vishal

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.defaultheaders.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import prerit.vishal.models.Message
import prerit.vishal.plugins.*

fun main(args: Array<String>) {
    io.ktor.server.jetty.jakarta.EngineMain.main(args)
}

fun Application.module() {

    install(DefaultHeaders) {
        header("ngrok-skip-browser-warning", "true") // Optional if you want to set it here too
        header(HttpHeaders.UserAgent, "CustomBrowser/1.0")
    }

    configureSerialization()
//    configureTemplating()
    configureSockets()
    configureRouting()

}
