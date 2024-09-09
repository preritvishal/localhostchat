package prerit.vishal.util

import java.net.InetAddress
import java.net.NetworkInterface
import java.nio.file.Files
import java.nio.file.Paths

fun getLocalIPv4Address(): String {
    // Iterate over all network interfaces
    val networkInterfaces = NetworkInterface.getNetworkInterfaces()

    for (networkInterface in networkInterfaces) {
        // Ignore loopback and inactive interfaces
        if (!networkInterface.isUp || networkInterface.isLoopback) continue

        // Iterate over the IP addresses associated with each network interface
        val inetAddresses = networkInterface.inetAddresses
        for (inetAddress in inetAddresses) {
            // Check if it is an IPv4 address and not a loopback address
            if (inetAddress is InetAddress && !inetAddress.isLoopbackAddress && inetAddress.hostAddress.indexOf(':') == -1) {
                return inetAddress.hostAddress  // Return the first valid IPv4 address found
            }
        }
    }

    return "localhost"  // Return localhost if no valid IPv4 address is found
}

fun getPortFromConfigFile(): String {

    val lines = Files.readAllLines(Paths.get("src/main/resources/application.yaml"))
    val ports = lines.filter { it.trim().matches(Regex("port: \\d\\d\\d\\d")) }

    return ports.first().toString().trim().substring(6) ?: "8080"
}

fun updateCurrentIPAndPort() {
    val ipv4Address = getLocalIPv4Address()
    val port = getPortFromConfigFile()
    println("Local IPv4 Address: ${ipv4Address ?: "No IPv4 address found"}")

    val updatedIP = "let serverURL = 'ws://$ipv4Address:$port/chat';"

    Files.write(Paths.get("src/main/resources/static/currentIP.js"), updatedIP.toByteArray())
}

//suspend fun monitorIPChanges(checkIntervalMillis: Long) {
//    var previousIP = getLocalIPv4Address()
//
//    while (isActive) {  // Use 'isActive' to make coroutine cancellable
//        val currentIP = getLocalIPv4Address()
//
//        println("Current IP while monitoring: $currentIP")
//
//        if (currentIP != previousIP) {
//            println("Local IP address has changed from $previousIP to $currentIP")
//            // Update the previousIP to the current one
//            previousIP = currentIP
//            updateCurrentIPAndPort()    // update it in the file
//            ipChanged = true
//
//        }
//
//        println("Previous IP : $previousIP")
//
//        delay(checkIntervalMillis)  // Non-blocking delay
//    }
//}
