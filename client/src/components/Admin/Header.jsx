import React from 'react';

const Header = (props) => {
    const category = props.category
 
    return ( 
        <div>
            {category !== []? <h1>{category}</h1> : <h1>Welcome to the administrative tools</h1> }
        </div>
        
     );
}
 
export default Header;