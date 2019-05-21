import React, { Component } from 'react';
import Post from './Post';

export class NewsFeed extends Component {
    displayName = NewsFeed.name;

    constructor(props) {
        super(props);
        this.state = { posts: [], loading: true };
    }

    getData() {
        fetch('api/SampleData/GetGroupPosts')
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: data, loading: false });
            });
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : NewsFeed.renderPostsTable(this.state.posts);

        return (
            <div>
                {contents}
            </div>
        );
    }

    static renderPostsTable(posts) {
        let image = 'data:image/jpeg;base64,' + posts[0].image;
        //const reader = new FileReader();
        //let blob = new Blob(new Uint8Array(posts[0].file));
        //let file = reader.readAsArrayBuffer(blob);

        return (
            <div>
                <img src={image} width="100%" height="30%" max-height="1000"></img>
            </div>
        );
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="feed" required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Group">Group</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="groupname" required>
                            <option value="">-- Select Group --</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="PublisherId" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }  

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/sampledata/createpost', {
            method: 'POST',
            body: data,
        });
            //.then((response) => response.json())
            //.then((responseJson) => {
            //    this.props.history.push("/fetchemployee");
            //}) 

    }  
}