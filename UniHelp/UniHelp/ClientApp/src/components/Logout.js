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
        fetch('api/sampledata/logout')
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem('userName', data[0]);
            window.localStorage.setItem('userRole', data[1]);
            window.location.href = "https://192.168.1.3:5566/";
        });
        //.then(this.props.hisory.push('/login'));
    }
}