import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';
import { connectWithStore } from '../../store/index';
import './home.scss';
import DisplayStudents from './DisplayStudent';

class HomeUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            value: ''
        };
    }

    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleFocus = () => {
        this.setState({
            isFocus: true,
            students: this.props.students
        });
    };

    handleChange = ({ target }) => {
        console.log('Checking in HandleChange');
        const value = target.value;

        const students = this.state.students.filter((el, i) => {
            if (el.name.includes(value)) {
                return el;
            }
        });

        if (value === '') {
            return this.setState({ students: this.props.students, value });
        }
        this.setState({ students, value });
    };



    selectStudent = (student) => {
        console.log('Student: ', student);
        this.setState({ isFocus: false });
    };


    render() {

        console.log('Students: ', this.props.students);

        return (
            <div className="home">
                <Nav navigate={this.navigate} />
                <Search
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                    value={this.state.value}
                />
                {this.state.isFocus ? <DisplayStudents selectStudent={this.selectStudent} students={this.state.students} /> : null}
            </div>
        );
    }
}

const Home = connectWithStore(HomeUI);
export default Home;