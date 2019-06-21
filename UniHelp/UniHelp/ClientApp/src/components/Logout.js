import React, { Component } from 'react';

export class Logout extends Component {

    render() {
        if (window.localStorage.getItem('userRole') == "Admin"
            || window.localStorage.getItem('userRole') == "Administration"
            || window.localStorage.getItem('userRole') == "Teacher"
            || window.localStorage.getItem('userRole') == "Student") {
            this.getData();
            return (
                <p><em>Logging out...</em></p>
            );
        }

        return (
            <p><em>Please log in</em></p>
        );
    }
    
    getData() {
        fetch('api/sampledata/logout')
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem('userName', data[0]);
            window.localStorage.setItem('userRole', data[1]);
            //window.location.href = "https://unihelptu.azurewebsites.net";
            window.location.href = "https://192.168.1.3:5566";

        });
    }
}