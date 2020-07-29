import React from 'react'
import Button from '@material-ui/core/Button'
function Options(props) {

    return (
        <div className='buttons-container'>
            <Button onClick={props.options.handleStart} variant="outlined" color="primary">{props.state?'pause':'run'}</Button>
             <Button variant="outlined" color="primary">reset</Button> 
             <Button variant="outlined" color="primary">randomize</Button>
              <Button variant="outlined" color="primary">speed up</Button>
               <Button variant="outlined" color="primary">slow down</Button>
            
        </div>
    )
}

export default Options
