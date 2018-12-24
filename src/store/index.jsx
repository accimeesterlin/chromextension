import React, { Component } from 'react';
import * as actions from '../actions/index';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        students: [],
        tutorName: '',
        googleSheetUrl: '',
        events: [],
        rosterName: '',
        isInitial: true
    };

    componentDidMount = () => {
        const isInitial = this.state.isInitial;
        if (isInitial) {
            const data = JSON.parse(window.localStorage.getItem('state'));
            console.log('Data: ', data);
            this.setState({ ...data, isInitial: false });
        }
        
    }

    attachMethods = () => {
        let mainActions = {};

        for (let x in actions) {
            mainActions[x] = actions[x].bind(this);
        }

        return mainActions
    };

    componentDidUpdate = () => {
        const isInitial = this.state.isInitial;
        if (!isInitial) {
            window.localStorage.setItem('state', JSON.stringify(this.state));
        }
        
    };

    render() {
        console.log('Store: ', this.state);
        return (
            <Context.Provider value={{
                ...this.state,
                ...this.attachMethods()
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }

}


export function connectWithStore(Container) {

    return class extends Component {

        render() {
            return <Context.Consumer>
                {(context) => <Container {...context } {...this.props}/>}
            </Context.Consumer>
        }
    }
}