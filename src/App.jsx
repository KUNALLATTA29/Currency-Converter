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
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <h1>Currency Converter</h1>
      <input
        type="text"
        placeholder="Base Currency"
        value={basecurr}
        onChange={(e) => setbasecurr(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Target Currency"
        value={tarcurr}
        onChange={(e) => settarcurr(e.target.value)}
        className="input"
      />
      <button type="submit" className="btn">Convert</button>
    </form>

    {loading && <p className="loading">Hold on...</p>}

    {data && !loading && (
      <div className="result">
        <h3>Exchange Rate:</h3>
        <p>
          1 {basecurr} = {data.conversion_rate} {tarcurr}
        </p>
      </div>
    )}
  </div>
  )
}
