
import { useState } from 'react'
import './App.css'

function App() {

  const [code, setCode] = useState('')
  const [addressResponse, setAddressResponse] = useState({
    address: '',
    district: '',
    city: '',
    state: ''
  })

  function resertInputs() {

    setAddressResponse({
      address: '',
      district: '',
      city: '',
      state: ''
    })
    setCode('')
  }

  async function getDataCep(e) {
    e.preventDefault()

    if (code == '' || code.length < 6) {
      alert('Necessário preencher os dados')
      return
    }


    const codeResponse = await fetch(`https://cdn.apicep.com/file/apicep/${code}.json`)
      .then((res) => res.json())
      .then((data) => {
        setAddressResponse(data)
      })
      .catch((err) => {
        resertInputs()
        alert("Cep não encontrado")
        console.log(err)
      })

  }



  return (
    <div className="App">
      <h1>Consultando CEP</h1>
      <form onSubmit={getDataCep}>
        <label htmlFor="code">Digite seu cep
          <input
            id="code"
            type="text"
            placeholder='99999-999'
            value={code}
            maxLength='9'
            onChange={(e) => { setCode(e.target.value) }} />
        </label>

        <button type='submit' disabled={code.length < 9 ? true:false}>Consultar</button>
      </form>

      <div className='addressResult'>
        <h3>Resultado</h3>
        <div>
          <div>
            <label htmlFor="address">Logradoro</label>
            <input type="text" value={addressResponse?.address} />
          </div>
          <div>
            <label htmlFor="district" >Bairro</label>
            <input type="text" value={addressResponse?.district} />
          </div>
          <div>
            <label htmlFor="city" >Cidade</label>
            <input type="text" value={addressResponse?.city} />
          </div>
          <div>
            <label htmlFor="state" >Estado</label>
            <input type="text" value={addressResponse?.state} />
          </div>

        </div>
      </div>
      <button onClick={resertInputs} >Limpar</button>

    </div>
  )
}

export default App
