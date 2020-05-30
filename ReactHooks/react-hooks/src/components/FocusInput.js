import React, { useEffect, useRef } from 'react'
//useRef hook
function FocusInput() {
    const inputRef = useRef(null); //creating inputRef as constant using useRef hook
    useEffect(() => {
        //focus input on page load using useRef hook.
        inputRef.current.focus();
    }, [])
    return (
        <div>
            <input ref={inputRef} type="text" /> 
        </div>
    )
}

export default FocusInput
