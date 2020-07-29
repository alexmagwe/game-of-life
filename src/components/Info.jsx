import React,{useEffect} from 'react'

function Info(props) {
 
    const info={
        container:{
        width:'100%',
        // display:'visible',
        backgroundColor:'#1118',
        textAlign:'center',
        position:'absolute',
        top:'4em'},
        embed:{
            width:'90%',
            height:'90vh',

        },
        hidden:{
            display:'none'
        },
        close:{
            float:'right',
            color:'red',
            fontSize:'2em',
            background:'transparent',
            border:'none',
            cursor:'pointer'
        }



    }
    return (
        <>
            <div style={props.hide.show?info.container:info.hidden}>
                <button style={info.close} onClick={()=>props.hide.setshow(false)}>&times;</button>
                <embed style={info.embed}type='text/html' src='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' ></embed> 
            </div>
        </>
    )
}

export default Info
