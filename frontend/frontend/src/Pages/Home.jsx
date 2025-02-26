import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

  const [books, setBooks] = useState([])
  const fetch_books = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/books/")
    if (response.status == 200) {
      setBooks(response.data)
    }
  }
  useEffect(() => {
    fetch_books()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900">{book.name}</h2>
              <p className="text-gray-700">
                Author: <b>{book.author?.name || "Unknown"}</b>
              </p>
              <p className="text-gray-600">Price: ${book.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No books available.
          </p>
        )}
      </div>
    </div>
  )
}
