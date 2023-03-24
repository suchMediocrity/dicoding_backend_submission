/**
 * handler.js
 * Berisi fungsi-fungsi handler yang menunjang fitur-fitur bookshelf
 * 1.Menyimpan buku: addBookHandler
 * 2.Menampilkan seluruh buku: getAllBooksHandler
 * 3.Menampilkan detail buku: getBookDetailHandler
 * 4.Mengubah data buku: editBookHandler
 * 5.Menghapus buku: deleteBookHandler
 */

const { nanoid } = require('nanoid')
const books = require('./books')

// Handler menyimpan buku
const addBookHandler = (request, h) => {
  /**
     * Variabel input klien:
     * name (string), year (number), author (string), summary (string), publisher (string),
     * pageCount (number), readPage (number), reading (boolean).
     * Variabel yang diotomatisasi sistem:
     * id, finshed (boolean), insertedAt (date), updatedAt (date).
     *
     * Kriteria handling gagal menambahkan buku:
     * 1.Variabel nama kosong: 400
     * 2.readPage > pageCount: 400
     */

  // Deklarasi variabel inputan user
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  // Cek kriteria keagalan
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  // Deklarasi variabel id
  const id = nanoid(16)

  // Deklarasi variabel finished (boolean)
  // finished menghasilkan true jika pageCount === readPage
  let finished = false
  if (pageCount === readPage) {
    finished = true
  }

  // Deklarasi variabel insertedAt
  const insertedAt = new Date().toISOString()

  // Deklarasi variabel updatedAt
  const updatedAt = insertedAt

  // Metode membuat dan menyimpan buku baru
  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }

  // Memasukkan buku ke file books.js
  books.push(newBook)

  // Checking apakah buku sudah masuk atau belum
  // Dilakukan dengan melakukan filter pada id buku
  // Menghasilkan nilai boolean
  const isSuccess = books.filter((book) => book.id === id).length > 0

  // Handling respons jika buku berhasil ditambahkan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  // Handling respons jika buku gagal ditambahkan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(201)
  return response
}

// Handler menampilkan seluruh buku yang telah disimpan
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  let filteredBooks = books // Deklarasi variabel books terfilter berdasarkan parameter query

  // Query Parameter: name
  if (name) {
    filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  // Query parameter: reading
  if (reading !== null) {
    if (reading === '0') {
      filteredBooks = filteredBooks.filter(book => book.reading === false)
    } else if (reading === '1') {
      filteredBooks = filteredBooks.filter(book => book.reading === true)
    }
  }

  // Query parameter: finished
  if (finished !== null) {
    if (finished === '0') {
      filteredBooks = filteredBooks.filter(book => book.finished === false)
    } else if (finished === '1') {
      filteredBooks = filteredBooks.filter(book => book.finished === true)
    }
  }

  const mappedBooks = filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }))

  return {
    status: 'success',
    data: {
      books: mappedBooks
    }
  }
}

// Handler menampilkan detail buku berdasarkan id
const getBookDetailHandler = (request, h) => {
  const { bookId } = request.params

  // Filter buku berdasarkan id yang dimasukkan user
  const book = books.filter((b) => b.id === bookId)[0]

  // Jika id ditemukan (buku is exists maka id nya tidak undefined)
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }

  // Jika id tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

// Handler memperbarui data buku
const editBookHandler = (request, h) => {
  const { bookId } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  // Cek kriteria keagalan: User tidak menginput nama buku
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  // Cek kriteria keagalan: readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }

    if (pageCount === readPage) {
      books[index].finished = true
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  // Jika id buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

// Handler menghapus buku
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookHandler, getAllBooksHandler, getBookDetailHandler, editBookHandler, deleteBookHandler }
