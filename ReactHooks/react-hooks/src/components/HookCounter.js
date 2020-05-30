import React, { useState } from 'react'

function HookCounter() {
    const [count, setCount] = useState(0);
    const HookCounter = () =>{
        setCount(count + 1);
    }
    return (
        <div>
            <button onClick={HookCounter}>count {count}</button>
        </div>
    )
}

export default HookCounter
