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
        let author = posts[0].author;
        let title = posts[0].title;
        let content = posts[0].content;
        let image = 'data:image/jpeg;base64,' + posts[0].image;
        //const reader = new FileReader();
        //let blob = new Blob(new Uint8Array(posts[0].file));
        //let file = reader.readAsArrayBuffer(blob);

        return (
            <Post author={author} title={title} content={content} image={image}/>
        );
    }
}