import React, { Component } from 'react';

export class Login extends Component {

    state = {
        userName: "",
        userRole: ""
    }

    render() {
        let content = window.localStorage.getItem('userRole') == "Admin"
            || window.localStorage.getItem('userRole') == "Administration"
            || window.localStorage.getItem('userRole') == "Teacher"
            || window.localStorage.getItem('userRole') == "Student"
            ? "You are logged in as " + window.localStorage.getItem('userName')
            : this.renderLoginForm();

        return (
            <div>
                {content}
            </div>
        );
    }

    renderLoginForm() {
        return (
            <form onSubmit={this.handleLogin.bind(this)} >
                <div className="form-group row" >
                    <input type="hidden" name="postId" />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Username">Username</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="username" required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Password">Password</label>
                    <div className="col-md-4">
                        <input className="form-control" type="password" name="password" required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Login</button>
                </div >
            </form >
        )
    }

    handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        //console.log("login");
        //var response = await fetch('api/sampledata/login', {
        //    method: 'POST',
        //    body: data,
        //});
        //console.log(response.json());
        
        fetch('api/sampledata/login', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem('userName', data[0]);
            window.localStorage.setItem('userRole', data[1]);
            if (data[0] != "failed") {
                //window.location.href = "https://unihelptu.azurewebsites.net/newsfeed";
                window.location.href = "https://192.168.1.3:5566/newsfeed";
            }
            else {
                alert("Wrong username or password !");
            }
        });
    }  
}