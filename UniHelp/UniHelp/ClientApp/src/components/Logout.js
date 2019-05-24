import React, { Component } from 'react';

export class Logout extends Component {

    render() {
        return (
            <h1>Login</h1>
        );
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('api/sampledata/logout', {
            method: 'POST',
            body: "createuser",
        });
    }
}