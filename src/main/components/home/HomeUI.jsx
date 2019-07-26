/*eslint-disable */
import React, { Component } from "react";
import { Container } from '@material-ui/core';

import { loadToken } from '../../../utils/authUtils';
import "./home.scss";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Sidebar from "../common/sidebar/Sidebar";

// Components
import { Tutor, Student, Profile, Calendar, Email, Template } from "../";

export default class HomeUI extends Component {
  componentDidMount() {
    if (chrome) {
      loadToken();
    }
  }
  loadMainContent() {
    const { match } = this.props;
    const name = match.params.content;

    const componentsToRender = {
        tutor: <Tutor />,
        student: <Student />,
        profile: <Profile />,
        calendar: <Calendar />,
        email: <Email />,
        template: <Template />,
    };

    if (componentsToRender.hasOwnProperty(name)) {
        return componentsToRender[name];
    }

    return 'No content found!!!';
  }

  navigateToContent = (event) => {
    const name = event.target.getAttribute('data-name');
    this.props.history.push(`/new/${name}`);
  }

  render() {
    // JSX
    return (
      <Container className="home">
        <Header />

        <div className="home-content">
          <Sidebar navigateToContent={this.navigateToContent}/>
          <div className="home-content_main">{this.loadMainContent()}</div>
        </div>

        <Footer />
      </Container>
    );
  }
}