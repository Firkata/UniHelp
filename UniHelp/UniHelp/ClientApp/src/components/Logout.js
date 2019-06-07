import React, { Component } from 'react';

export class Logout extends Component {

    render() {
        return (
            <h1>Logging out ...</h1>
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
        //.then(this.props.hisory.push('/login'));
    }
}