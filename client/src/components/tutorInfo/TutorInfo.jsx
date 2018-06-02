import React, { Component } from 'react';
import './tutorInfo.css';

class TutorInfo extends Component {

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.getValue({ [name]: value });
    };

    submit = (event) => {
        event.preventDefault();
        const { tutor_name, google_sheet_url } = this.props;

        this.props.saveTutorInfo({
            tutor_name,
            google_sheet_url
        });
    };
    render() {
        const { tutor_name, google_sheet_url } = this.props;
        return (
            <div className='form-container tutor_info'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}>Go back</button>
                <div className="notify">
                    {this.props.displayNotification()}
                </div>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='tutor_name'>Tutor Name: </label>
                        <input
                            type='text' name='tutor_name'
                            onChange={this.handleChange}
                            placeholder='Enter your tutor name'
                            required
                            value={tutor_name} />
                    </div>

                    <div>
                        <label htmlFor='google_sheet_url'>Google Sheet URL - In Beta:  </label>
                        <input
                            type='text' name='google_sheet_url'
                            onChange={this.handleChange}
                            placeholder='Enter your student google sheet url'
                            value={google_sheet_url} />
                    </div>
                    <div className="buttons">
                        <button>Add</button>
                    </div>
                </form>
            </div>
        );
    };
};


export default TutorInfo;