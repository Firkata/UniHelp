import React, { Component } from 'react';

export class CreateUser extends Component {

    render() {
        let content = this.renderCreateForm();
        return (
            <div>
                {content}
            </div>
        );
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave.bind(this)} >
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
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="UserRole">User role</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="role" required>
                            <option value="">-- Select Role --</option>
                            <option value="Administration">Administration</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Group">Group</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="group" required>
                            <option value="">-- Select Group --</option>
                            <option value="0">0</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                </div >
            </form >
        )
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/sampledata/createuser', {
            method: 'POST',
            body: data,
        });
        //.then((response) => response.json())
        //.then((responseJson) => {
        //    this.props.history.push("/fetchemployee");
        //}) 
    }  
}