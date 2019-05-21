import React, { Component } from 'react';

export class CreatePost extends Component {

    state = {
        image: null,
        file: null
    }

    render() {
        let contents = this.renderCreateForm();
        return (
            <div>
                {contents}
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
                    <label className=" control-label col-md-12" htmlFor="Title">Title</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="title" required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Group">Group</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="group" required>
                            <option value="">-- Select Group --</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                        </select>
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Content">Content</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="content" required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Image">Choose Image</label>
                    <div className="col-md-4">
                        <input className="form-control" type="file" name="image" onChange={(e) => this.handleImage(e)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="File">Choose File</label>
                    <div className="col-md-4">
                        <input className="form-control" type="file" name="file" onChange={(e) => this.hangleFile(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

    handleImage(e) {
        let image = e.target.files[0];
        this.setState({ image: image });
    }

    hangleFile(e) {
        let file = e.target.files[0];
        this.setState({file: file});
    }

    handleSave(event) {
        event.preventDefault();
        let image = this.state.image;
        let file = this.state.file;
        const data = new FormData(event.target);
        data.set("image", image);
        data.set("file", file);

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