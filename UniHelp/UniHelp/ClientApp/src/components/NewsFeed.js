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
}