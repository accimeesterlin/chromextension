import React, { Component } from 'react'
import Nav from '../organisms/Nav';

export default function withNav(WrappedComponent, containerClass) {

    return class extends Component {


        navigate = (link) => {
            console.log('Link: ', link);
            return this.props.history.push(link);
        }

        render() {

            return (
                <div className={containerClass}>
                    <Nav navigate={this.navigate} />
                    
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }








    }
 
}
