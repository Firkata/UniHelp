import React, { Component } from 'react';

export class CreateUser extends Component {

    render() {
        return (
            <h1>Create user</h1>
        );
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('api/sampledata/createuser', {
            method: 'POST',
            body: "ok",
        });
    }
}