import React,{useState,useCallback,useRef} from 'react'
import produce from 'immer'
import Button from '@material-ui/core/Button'
import Info from './Info'
function Main(props) {

     const setgridState=(val)=>{
                let trows=[];
        switch (val){
            case 'random':
                for (let i=0;i<rows;i++){
                    trows.push(Array.from(Array(columns),()=>(Math.random()>density?0:1)))
                };
         
            break;
            case 1:
               
                 for (let i=0;i<rows;i++){
                trows.push(Array.from(Array(columns),()=>1));};
            break;

            default:
            
                for (let i=0;i<rows;i++){
                trows.push(Array.from(Array(columns),()=>0));
                }
            break;
        
    
        }
    return trows
    
}
    const [density, setdensity] = useState(0.5)
    const [running,setrunning]=useState(false)
    const [speed, setspeed] = useState(10)
    const [generations, setgenerations] = useState(0)
    const [show, setshow] = useState(false);
    const [rows,setrows]=useState(50)
    const [columns, setcolumns] = useState(60)
    const [grid, setgrid] = useState(setgridState(0)) 
    
       // neighbour position vector
    const npv=[[1,0],[1,1],[0,1],[-1,1],[0,-1],[1,-1],[-1,-1],[-1,0]]
    const runningRef=useRef(running)
    runningRef.current=running
    const columnRef=useRef(columns)
    const rowRef=useRef(rows)
    columnRef.current=columns
    rowRef.current=rows
    const speedRef=useRef(speed)
    speedRef.current=speed

    const styles={
        grid:{
            display:'grid',
            width:'100%',
            gridTemplateColumns:`repeat(${columns},20px)`,
            justifyContent:'center',
            
            // gridTemplateRows:'repeat(auto-fit,20px)'
            
        }
    }
 
    const handleClick=(i,k)=>{
        let gridCopy=produce(grid,gridCopy=>{gridCopy[i][k]?gridCopy[i][k]=0:gridCopy[i][k]=1;});
        setgrid(gridCopy)
    }
 
    const runSimulation=useCallback(()=>{
        if (!runningRef.current)return 
        setgrid(grid=>{
            return produce(grid,(copy)=>{
                let count=0
              for (let row=0;row<rowRef.current;row++){
                for(let col=0;col<columnRef.current;col++){
                    if (grid[row][col])
                        {count+=1}
                    let neighbors=0
                        npv.forEach(([i,j])=>{
                        const newI=row+i;
                        const newJ=col+j;
                     
                        if (newI>=0 && newI<rowRef.current && newJ>=0 && newJ<columnRef.current){
                            neighbors+=grid[newI][newJ];
                        }
                });
                
                if (grid[row][col] && (neighbors>3 || neighbors<2)){
                   copy[row][col]=0
                }
                else if (grid[row][col]===0 && neighbors===3){
                   copy[row][col]=1 
                 }
                                                }   

                                            }   
            if (count===0){
                setrunning(false)
            }
            setgenerations(generations=>generations+=1)
    }
    )}
    );
    setTimeout(runSimulation,speedRef.current*100);
},[rows])

    const handleStart=()=>{
        runningRef.current=running
        setrunning(!running)
        runningRef.current=true
        runSimulation()

    }
    const handleReset=()=>{
        setgrid(setgridState(0))
        setrunning(false)
        setgenerations(0)
        setdensity(0.5)
    }
    const handleRandomize=()=>{
        setgrid(setgridState('random'))
    }
    const saturated=()=>{
        setgrid(setgridState(1))
    }
    const handleSpeedup=()=>{
        setspeed(speed=>speed===0?2:speed-=2)

    }
   const handleSlowdown=()=>{
        setspeed(speed=>speed+=2)
    }
    const decreaseDensity=()=>{
        setdensity(density=>density===0?0.1:density-0.1)
        setgrid(setgridState('random'))


    }
      const increaseDensity=()=>{
        setdensity(density=>density===0?0.1:density+0.1)
                setgrid(setgridState('random'))


    }
    
    return (<>
       <div className='buttons-container'>

            <Button onClick={handleStart} variant="contained" color="primary">{running?'pause':'simulate'}</Button>
            <Button onClick={handleRandomize} variant="outlined" color="primary">random</Button>
            <Button onClick={handleReset}variant="outlined" color="primary">reset</Button> 

            <Button onClick={()=>{setcolumns(columns=>columns>=70?columns=70:columns+=5);setrows(rows=>rows>=70?rows=70:rows+=5);setgrid(setgridState)}} variant="outlined" color="primary">size +</Button>
            <Button onClick={()=>{setcolumns(columns=>columns<=50?columns=50:columns-=5);setrows(rows=>rows<=30?rows=30:rows-=5);setgrid(setgridState)}} variant="outlined" color="primary">size -</Button>
            <Button onClick={handleSpeedup}variant="outlined" color="primary">speed +</Button>
            <Button onClick={handleSlowdown} variant="outlined" color="primary">speed -</Button>
            <Button onClick={saturated} variant="outlined" color="primary">overpopulation</Button>
            <Button onClick={increaseDensity} variant="outlined" color="primary">density +</Button>
            <Button onClick={decreaseDensity} variant="outlined" color="primary">density -</Button>
            <Button onClick={()=>setshow(!show)} variant="outlined" color="primary">About</Button>
             <h2 className='generations'>Generation {generations}</h2>
        </div>
            <Info hide={{show,setshow}}/>

            <div className='grid-container'>
            <div  style={styles.grid}>
            {
                grid.map((row,i)=>
                row.map((col,k)=>
               <div style={{backgroundColor:grid[i][k]?'green':'white',
                   border:'1px solid black',width:20,height:20}} onClick={()=>handleClick(i,k)} key={`${i}-${k}`}>

               </div>
           ))

        }

        </div>
    </div> 
       </>
    )
}

export default Main

 