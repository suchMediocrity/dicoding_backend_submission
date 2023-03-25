# dicoding_backend_submission

## Deskripsi
Program ini merupakan submission akhir Membangun Aplikasi Back-end dengan Google Cloud Dicoding. Program merupakan API bertipe REST yang memiliki fungsionalitas layaknya bookshelf.

## Teknologi yang Digunakan
+ JavaScript-Node JS
+ HAPI
+ ESLint
+ Nodemon
+ Git
+ Postman

## Fitur dan Spesifikasi
### Spesifkasi dan Basic Command
Server program dirancang untuk berjalan pada localhost dengan port: 9000.
```node
const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  })
```
Berikut adalah command untuk menjalankan server
```node
// Running server
npm run start

// Running server melalui nodemon
npm run start-dev
```
Berikut adalah command untuk run ESLint
```node
npx eslint .
```
### Struktur Data book
Objek buku akan disimpan dalam array books pada file books.js. Berikut adalah struktur data objek buku:
```node
{
    "id": string,
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "finished": booelan, 
    "reading": booelan,
    "insertedAt": string date,
    "updatedAt": string date
}
```
Variabel name, year, author, summary, publisher, pageCount, readPage, dan reading adalah masukan pengguna melalui request.payload. Adapun variabel yang ditentukan oleh program secara otomatis antara lain.
+ id: string 16 karakter yang di-generate menggunakan nanoid
+ finished: bernilai true jika pageCount === readPage, dan false untuk kasus lain.
+ insertedAt: Objek waktu JavaScript yang di-string kan
+ updatedAt: Serupa dengan insertedAt, namun nilainya akan di re-assign ketika pengguna merequest uppdate pada objek buku tertentu.

### Menambah dan Menyimpan buku
+ Method: POST
+ Path: /books
### Melihat seluruh Buku yang Tersimpan
+ Method: GET
+ Path: /books
<p> Pengguna juga dapat memasukan request parameters sesuai dengan variabel berikut:</p>
<p> ?name: Menampilkan buku dengan nama yang mengandung string query parameters inputan.</p>
<p> ?reading: Menampilkan buku dengan status reading true jika ?reading=1 dan false jika ?reading=0.</p>
<p> ?finished: Menampilkan buku dengan status finished true jika ?finished=1 dan false jika ?finished=0.</p>

### Melihat detail Buku berdasarkan id
+ Method: GET
+ Path: /books/{bookId} 
### Mengedit Buku berdasarkan id
+ Method: PUT
+ Path: /books/{bookId}
### Menghapus Buku berdasarkan id
+ Method: DELETE
+ Path: /books/{bookId}

## Testing
Testing dilakukan menggunakan Postman dengan collection dan environment pengujian yang disediakan Dicoding. File collection dan environment Postaman dapat diakses melalui folder postman-collection-environment.

### Hasil Testing Fitur Mandatory
Hasil testing pada fitur-fitur mandatory dapat dilihat pada file mandatory-postman-test-result dalam folder postman-test-result.

### Hasil Testing Fitur Opsional
Hasil testing pada fitur-fitur mandatory dapat dilihat pada file optional-postman-test-result dalam folder postman-test-result.
