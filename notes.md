##### _Alat Sortir Ikan Otomatis Berbasis IoT untuk Optimalisasi Pendataan Hasil Tangkapan Nelayan_

Inovasi teknologi Internet of Things (IoT) terus membuka peluang untuk meningkatkan efisiensi di berbagai sektor, termasuk perikanan. Proyek alat sortir ikan otomatis berbasis IoT ini bertujuan untuk mendukung nelayan dalam pendataan hasil tangkapan ikan di laut lepas tanpa perlu berlabuh ke dermaga. Solusi ini dirancang untuk mempermudah proses dokumentasi dan pengiriman data hasil tangkapan kepada pihak pengepul.

Alat ini memiliki mekanisme berupa track berjalan, di mana ikan hasil tangkapan melewati sistem otomatis. Ketika ikan melewati scanner, alat akan mengambil gambar menggunakan modul ESP32-CAM untuk mengidentifikasi jenis ikan dan mengukur beratnya melalui integrasi sensor. Data ini kemudian diproses oleh dua microcontroller utama, yaitu ESP32-CAM untuk pemrosesan gambar dan ESP12/ESP8266 (NodeMCU) untuk pengelolaan komunikasi data. Informasi yang diperoleh akan langsung dikirimkan secara real-time ke pihak pengepul menggunakan koneksi nirkabel.

Sistem ini mengoptimalkan proses kerja nelayan dengan memungkinkan kapal logistik menjemput hasil tangkapan berdasarkan data yang dikirimkan. Selain itu, kapal logistik juga dapat membawa suplai bahan bakar dan kebutuhan lain untuk kapal induk. Dengan demikian, kapal nelayan tidak perlu berlabuh ke dermaga hanya untuk mendata dan menyetok ikan.

Keputusan menggunakan ESP32-CAM dan ESP12/ESP8266 (NodeMCU) didasarkan pada keunggulan keduanya dalam pemrosesan data, pengambilan gambar, dan komunikasi nirkabel. Kombinasi ini memberikan fleksibilitas tinggi serta efisiensi dalam membangun sistem IoT yang terintegrasi.

Proyek ini diharapkan mampu memberikan dampak signifikan dalam meningkatkan produktivitas nelayan, mengurangi biaya operasional, dan mendorong modernisasi sektor perikanan. Selain itu, sistem ini juga membantu menciptakan pengelolaan sumber daya laut yang lebih efisien dan berkelanjutan melalui data yang akurat dan transparan.
