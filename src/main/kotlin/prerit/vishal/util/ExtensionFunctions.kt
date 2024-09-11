package prerit.vishal.util

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun String.isCommand(): Boolean {   // extentsion function to check if the string is command
    return this.startsWith("/")
}

fun String.toJsonString(): String {     // extension function to convert String to json string
    return Json.encodeToString(this)
}