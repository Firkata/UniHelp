import React, { Component } from 'react';

export class Login extends Component {

    render() {
        return (
            <h1>Login</h1>
        );
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('api/sampledata/login', {
            method: 'POST',
            body: "createuser",
        });
    }
}