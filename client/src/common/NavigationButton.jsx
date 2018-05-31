import React from 'react';


const NavigationButton = (props) => {
    const { navigate, url } = props;
    return (
        <div className='navigation-buttons'>
            <button onClick={() => navigate({ url })}>Back</button>
            {props.children}
        </div>
    );
};

export default NavigationButton;