val kotlin_version: String by project
val logback_version: String by project

plugins {
    kotlin("jvm") version "2.0.20"
    id("io.ktor.plugin") version "2.3.12"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.0.20"
}

group = "prerit.vishal"
version = "0.0.1"

application {
    mainClass.set("io.ktor.server.jetty.jakarta.EngineMain")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=true")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-host-common-jvm")
    implementation("io.ktor:ktor-server-content-negotiation-jvm")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
    implementation("io.ktor:ktor-server-thymeleaf-jvm")
    implementation("io.ktor:ktor-server-websockets-jvm")
    implementation("io.ktor:ktor-server-jetty-jakarta-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-config-yaml")
    testImplementation("io.ktor:ktor-server-test-host-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")

//    implementation ("org.jetbrains.kotlinx:kotlinx-datetime:0.3.2")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    implementation("io.ktor:ktor-server-default-headers:2.0.20")
}
