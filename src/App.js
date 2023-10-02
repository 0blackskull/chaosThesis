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

  const url = "http://localhost:5000";

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
    setMsg(msg.trim())
    fetchLogisticCipherText()
    setDataLoaded(true)
  }

  return (
    <div className="App">
        <form>
          <div className='input'>
            X_min : 
            <input 
              type = "number" 
              step = "any"
              value = {Xmin}
              onChange={(e) => setXmin(e.target.value)} 
            />
          
          </div>
          <div className='input'>
          <label>
            X__max :
            <input 
              type = "number" 
              step = "any"
              value = {Xmax}
              onChange={(e) => setXmax(e.target.value)} 
            />
          </label>
          </div>
          <div className='input'>
          <label>
            Message :
            <input 
              type = "text" 
              value = {msg}
              onChange={(e) => setMsg(e.target.value)} 
            />
          </label>
          </div>
          <div className='input'>
          <label>
            Iteration Limit :
            <input 
              type = "number" 
              value = {iterationLimit}
              onChange={(e) => setIterationLimit(e.target.value)} 
            />
          </label>
          </div>
          <div className='input'>
          <label>
            X_initial : 
            <input 
              type = "number" 
              step = "any"
              value = {Xinit}
              onChange={(e) => setXinit(e.target.value)} 
            />
          </label>
          </div>
          <div className='input'>
          <label>
            η : 
            <input 
              type = "number" 
              step = "any"
              value = {ita}
              onChange={(e) => setIta(e.target.value)} 
            />
          </label>
          </div>
          <div className='input'>
          <label>
            Control Parameter b :
            <input 
              type = "number" 
              step = "any"
              value = {parameterb}
              onChange={(e) => setParameterb(e.target.value)} 
            />
          </label>
          </div>
          <button onClick = {(e) => handleGeneration(e)}>
            Generate Cipher
          </button>
          {dataLoaded && (<div className = 'input'>
            {data}
          </div>)}    
        </form>
    </div>
  );
}

export default App;
