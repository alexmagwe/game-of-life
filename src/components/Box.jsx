import React from 'react'
import produce from 'immer'
function Box(props) {
    const {i,k}=props.state
    
    // const [isalive, setisalive] = useState(initialState);
    const styles={
        border:'1px solid black',
        backgroundColor:props.env[i][k]?'pink':'white'
    }
    return (
        <div onClick={()=>{let gridCopy=produce(props.env.grid);
            gridCopy[i][k]=1;
        props.env.setgrid(gridCopy)
        }} style={styles}>
            {props.env.grid[i][k]}
        </div>
    )
}

export default Box
