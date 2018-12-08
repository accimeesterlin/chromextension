import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';

import './home.scss';

export default class Home extends Component {


    render() {
        
        return(
            <div className="home">
                <Nav />
                <Search />
            </div>
        );
    }
}