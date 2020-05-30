import React, { useState } from 'react'

function HookCounter2() {
    const initialCount = 0;
    const [count, setCount] = useState(initialCount);

    const incrementCount = () => {
        setCount(count + 1);
    }

    const decrementCount = () => {
        setCount(count - 1);
    }

    const resetCount = () => {
        setCount(initialCount);
    }
    //Recommended way to use state update: update using previous value
    const incrementCountFive = () => {
        for(let i = 0; i < 5; i++) {
            setCount((prevCount) => (prevCount + 1));
        }
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={resetCount}>Reset</button>
            <button onClick={decrementCount}>Decrement</button>
            <button onClick={incrementCountFive}>Increment By 5</button>
        </div>
    )
}

export default HookCounter2
