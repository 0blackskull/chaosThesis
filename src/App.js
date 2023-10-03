import './App.css';
import { useState } from 'react';

function App() {

  const [Xmin, setXmin] = useState(0.2)
  const [Xmax, setXmax] = useState(0.8)
  const [msg, setMsg] = useState("hi")
  const [iterationLimit, setIterationLimit] = useState(65532)
  const [Xinit, setXinit] = useState(0.232323)
  const [parameterb, setParameterb] = useState(3.8)
  const [ita, setIta] = useState(0)

  const [dataLoaded, setDataLoaded] = useState(false)
  const [data, setData] = useState([])
  const [displayMessage, setDisplaymessage] = useState(msg)

  // const url = "http://localhost:5000";
  const url = "http://bajpaiutk.pythonanywhere.com"

  const fetchLogisticCipherText = async () => {

    const queryString = url + `/logistic?xmin=${Xmin}\
    &xmax=${Xmax}\
    &msg=${msg}\
    &iterationLimit=${iterationLimit}\
    &xinit=${Xinit}\
    &b=${parameterb}\
    &ita=${ita}`
    console.log("clicked")

      try {
        const response = await fetch(queryString) 
        const json = await response.json()
        console.log(json)
        setData(json)
      } catch (error) {
        console.error(error)
      }

  }

  const handleGeneration = (e) => {
    e.preventDefault()
    setDataLoaded(false)
    setMsg(msg.trim())
    setDisplaymessage(msg)
    fetchLogisticCipherText()
    setDataLoaded(true)
  }

  return (
    <div className="App">
      <h2>Logistic Encryptor</h2>
      <div className='form'>
        <h3>Input Fields</h3>
        <form>
          <div className='input'>
            <label>X_min :</label>
            <input 
              type = "number" 
              step = "any"
              value = {Xmin}
              onChange={(e) => setXmin(e.target.value)} 
            />
          </div>
          <div className='input'>
            <label>X_max :</label>
            <input 
              type = "number" 
              step = "any"
              value = {Xmax}
              onChange={(e) => setXmax(e.target.value)} 
            />
          </div>
          <div className='input'>
            <label>Message :</label>
            <input 
              type = "text" 
              value = {msg}
              onChange={(e) => setMsg(e.target.value)} 
            />
          </div>
          <div className='input'>
          <label>Iteration Limit :</label>
            <input 
              type = "number" 
              value = {iterationLimit}
              onChange={(e) => setIterationLimit(e.target.value)} 
            />
          
          </div>
          <div className='input'>
            <label>X_initial :</label>
            <input 
              type = "number" 
              step = "any"
              value = {Xinit}
              onChange={(e) => setXinit(e.target.value)} 
            />
          </div>
          <div className='input'>
          <label>η :</label> 
            <input 
              type = "number" 
              step = "any"
              value = {ita}
              onChange={(e) => setIta(e.target.value)} 
            />
          </div>
          <div className='input'>
            <label> Control Parameter b :</label>
            <input 
              type = "number" 
              step = "any"
              value = {parameterb}
              onChange={(e) => setParameterb(e.target.value)} 
            />
   
          </div>
          <button onClick = {(e) => handleGeneration(e)}>
            Generate Cipher
          </button>
        </form>
      </div>
        <div className = 'cipherColumn'>
        <h3>Cipher Text</h3>
          {dataLoaded && (
            <ul>
              {data.map((cipher, index) => (
                <li key = {index}><span className='letter'>{displayMessage[index]}</span>: {cipher}</li>
              ))}
            </ul>)}
          </div>
    </div>
  );
}

export default App;
