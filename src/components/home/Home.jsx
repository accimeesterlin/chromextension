import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';
import { connectWithStore } from '../../store/index';
import './home.scss';
import DisplayStudents from './DisplayStudent';

class HomeUI extends Component {
    state = {
        isFocus: false
    };

    navigate = (link) => {

        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleFocus = () => {
        this.setState({ isFocus: true });
    };



    selectStudent = (student) => {
        console.log('Student: ', student);
        this.setState({ isFocus: false });
    };


    render() {

        console.log('Students: ', this.props.students);
        const students = [
            { name: 'Accime Esterling'},
            { name: 'Patrick Simon'},
            { name: 'Sadrack Pierre'},
            { name: 'Jean Rene'},
            { name: 'Salomon Alvas'},
        ];

        return (
            <div className="home">
                <Nav navigate={this.navigate} />
                <Search
                    handleFocus={this.handleFocus}
                />
                {this.state.isFocus ? <DisplayStudents selectStudent = {this.selectStudent} students={this.props.students}/> : null}
            </div>
        );
    }
}

const Home = connectWithStore(HomeUI);
export default Home;