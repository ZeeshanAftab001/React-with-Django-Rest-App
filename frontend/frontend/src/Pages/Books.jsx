import React, { useState } from 'react'
import axios from 'axios'

export default function Books() {

  const [search,setSearch]=useState("")
  const [books,setBooks]=useState([])
  const fetch_books=async()=>{
    try {
    const response=await axios.get(`http://127.0.0.1:8000/api/books/?search=${search}`)
    if(response.status==200){
      setBooks(response.data)
    }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='p-3 flex justify-center'>
      <h1>Books</h1>
      <div className='p-4 mt-4'>
      <input type="text" className="p-2 bg-white rounded-l-3xl" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search'/>
      <button className='p-2 text-white bg-orange-600 rounded-r-3xl' onClick={fetch_books}>Search</button>
      </div>
      </div>
      
      <div>
        <div>
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  )
}
