import React, { Component } from 'react';

export class Login extends Component {

    render() {
        let content = this.renderLoginForm();
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

        fetch('api/sampledata/login', {
            method: 'POST',
            body: data,
        });
        //.then((response) => response.json())
        //.then((responseJson) => {
        //    this.props.history.push("/fetchemployee");
        //}) 
    }  
}