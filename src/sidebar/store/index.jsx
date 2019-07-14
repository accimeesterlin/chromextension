/*eslint-disable */
import React, { Component } from 'react';
import * as actions from '../actions/index';

import { getLegacyStudents, getLegacyTutorInfo, clearLegacyStorage } from '../utils/legacySupport';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        students: [],
        tutorName: '',
        googleSheetUrl: '',
        events: [],
        rosterName: '',
        isInitial: true,
        message: 'Not able to fetch data',
        isLegacyTutorComplete: false,
        isLegacyStudentComplete: false
    };

    componentDidMount = () => {
        const { isInitial, isLegacyStudentComplete, isLegacyTutorComplete } = this.state;

        if (isInitial) {
            const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {};
            this.setState({ ...data, isInitial: false });
        }

        // Adding support for legacy app
        try {

            if (isLegacyStudentComplete && isLegacyTutorComplete) {
                clearLegacyStorage();
            }
            
            chrome.storage.sync.get(['students'], getLegacyStudents.bind(this));
            chrome.storage.sync.get(['tutor_name', 'google_sheet_url'], getLegacyTutorInfo.bind(this));
        } catch (error) {
            console.log('Development Environment!');
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
                {(context) => <Container {...context} {...this.props} />}
            </Context.Consumer>
        }
    }
}