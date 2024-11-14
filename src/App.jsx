import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [data,setData] = useState(null);
  const [basecurr,setbasecurr] = useState('')
  const [tarcurr,settarcurr] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      let response = await axios.get(`https://v6.exchangerate-api.com/v6/c2a5d04b15243698d333fd17/pair/${basecurr}/${tarcurr}`)
      setData(response.data)
      setLoading(false)
    }catch{
      setLoading(false)
      alert('there is a error in fetching data')
    }
    
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600">Currency Converter</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Base Currency"
              value={basecurr}
              onChange={(e) => setbasecurr(e.target.value)}
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Target Currency"
              value={tarcurr}
              onChange={(e) => settarcurr(e.target.value)}
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Convert
          </button>
        </form>

        {loading && <p className="text-center text-indigo-500">Loading...</p>}

        {data && !loading && (
          <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600">Exchange Rate:</h3>
            <p className="text-lg text-gray-700">
              1 {basecurr.toUpperCase()} = {data.conversion_rate} {tarcurr.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
