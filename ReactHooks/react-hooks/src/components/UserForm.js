import React, { useState } from 'react'

//mutating the object concept: we should mutate the original object instead create a copy and merge the mutated value to it. Please follow the code for the same
function UserForm() {
    const [name, setName] = useState({firstName: '', lastName:''});

    return (
        <div>
            <form>
                {/* in the below onchange method remove rest operator ...name and then try to add new name. It will remove one of the property from the object on change */}
                <input type="text" value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})}/>
                <input type="text" value={name.lastName} onChange={e => setName({...name, lastName: e.target.value})}/>
                
                <h1>My FirstName: {name.firstName}</h1>
                <h1>My lastName: {name.lastName}</h1>
                <h1>{JSON.stringify(name)}</h1>
            </form>
        </div>
    )
}

export default UserForm
