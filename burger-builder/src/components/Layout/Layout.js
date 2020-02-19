import React from 'react';

import Aux from '../../hoc/Auxiliary';
import './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, sidebar, backdrops</div>
        <main className="MainContent">
            {props.children}
        </main>
    </Aux>
)

export default layout;