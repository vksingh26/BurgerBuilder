import React, { useState, useRef, useEffect } from 'react'

function HookTimer() {
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(); //here useRef will maintain the mutable state which we can use outside the useEffect function.
    useEffect(() =>{
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
    }, [])
    return (
        <div>
            Hook Timer- {timer}
            <button onClick={() => clearInterval(intervalRef.current)} >Clear Hook Timer</button>
        </div>
    )
}

export default HookTimer
