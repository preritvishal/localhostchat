package prerit.vishal

import io.ktor.server.application.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import prerit.vishal.models.Message
import prerit.vishal.plugins.*
import prerit.vishal.util.monitorIPChanges
import prerit.vishal.util.updateCurrentIPAndPort

fun main(args: Array<String>) = runBlocking {   // using coroutines to constantly monitor the IP changes

    // finds and updates current IP from device settings and port from config file
    updateCurrentIPAndPort()

    // run a job to keep monitoring for changes
    val monitoringJob = GlobalScope.launch {
        monitorIPChanges(3000)
    }
    delay(2000) // 2 sec delay to ensure the monitoring is running
    io.ktor.server.jetty.jakarta.EngineMain.main(args)
}

fun Application.module() {
    configureSerialization()
    configureTemplating()
    configureSockets()
    configureRouting()
}
