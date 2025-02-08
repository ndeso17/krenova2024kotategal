#include <eloquent_esp32cam.h>
#include <eloquent_esp32cam/extra/esp32/wifi/sta.h>
#include <eloquent_esp32cam/viz/image_collection.h>

#define WIFI_SSID "krenova"
#define WIFI_PASS "1234567895"
#define HOSTNAME "esp32cam"

using eloq::camera;
using eloq::wifi;
using eloq::viz::collectionServer;

void setup() {
    Serial.begin(115200);
    delay(3000);

    Serial.println("___IMAGE COLLECTION SERVER___");

    // Setup kamera
    camera.pinout.aithinker();  // Gunakan AI-Thinker
    camera.brownout.disable();
    camera.resolution.face();
    camera.quality.high();

    // Inisialisasi kamera
    int camRetries = 5;
    while (!camera.begin().isOk()) {
        Serial.println(camera.exception.toString());
        delay(500);
        camRetries--;
        if (camRetries == 0) {
            Serial.println("Gagal inisialisasi kamera, restart ESP32...");
            ESP.restart();
        }
    }
    Serial.println("Camera OK");

    // Koneksi WiFi dengan debugging
    int wifiRetries = 10;
    while (!wifi.connect(WIFI_SSID, WIFI_PASS).isOk()) {
        Serial.print("Gagal konek WiFi: ");
        Serial.println(wifi.exception.toString());
        delay(1000);
        wifiRetries--;
        if (wifiRetries == 0) {
            Serial.println("Gagal terhubung ke WiFi, restart ESP32...");
            ESP.restart();
        }
    }
    Serial.println("WiFi OK");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    // Inisialisasi server
    int serverRetries = 5;
    while (!collectionServer.begin().isOk()) {
        Serial.println(collectionServer.exception.toString());
        delay(500);
        serverRetries--;
        if (serverRetries == 0) {
            Serial.println("Gagal inisialisasi server, restart ESP32...");
            ESP.restart();
        }
    }

    Serial.println("Image Collection Server OK");
    Serial.print("Image Collection Server is available at: ");
    Serial.println(collectionServer.address());
}

void loop() {
    // Biarkan loop kosong karena server berjalan di background
}
