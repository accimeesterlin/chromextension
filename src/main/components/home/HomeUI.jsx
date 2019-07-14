import React, { Component } from 'react';

import './home.scss';

import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import Sidebar from '../common/sidebar/Sidebar';

export default class HomeUI extends Component {


    render() {

        // JSX
        return(
            <div className="home">
                <Header />

                <div className="home-content">
                    <Sidebar />
                    <MainContent />
                </div>

                <Footer />
            </div>
        );
    }
}

const MainContent = () => {
    return (
        <div className="home-content_main">
            <h2>I am the Main Content</h2>
        </div>
    );
};
