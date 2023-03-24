/**
 * routes.js
 * File penampung book dalam bentuk array of objects Json.
 * Routes:
 * 1.Menyimpan buku: POST - /books
 * 2.Menampilkan seluruh buku: GET - /books
 * 3.Menampilkan detail buku: GET - /books/{bookId}
 * 4.Mengubah data buku: PUT - /books/{bookId}
 * 5.Menghapus buku: DELETE - /books/{bookId}
 */

const { addBookHandler, getAllBooksHandler, getBookDetailHandler, editBookHandler, deleteBookHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetailHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler
  }
]

module.exports = routes
