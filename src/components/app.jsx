import React,{useState} from 'react'
import Main from './Main'
import Button from '@material-ui/core/Button'

import Options from './Options'
function App() {
    const [rows, setrows] = useState(20)
    const [columns, setcols] = useState(20)
    return (
    <>           
    <h2 style={{textAlign:'center'}}>Conway's Game of Life</h2>
        <Main size={{rows,columns}}/>
    </>
    )
  
}

export default App
