import React from 'react';

import './NavigationItem.css';
const navigationItem = (props) => (
    <li className="NavigationItem">
        <a className="active" href={props.link}>{props.children}</a>
    </li>
);

export default navigationItem;