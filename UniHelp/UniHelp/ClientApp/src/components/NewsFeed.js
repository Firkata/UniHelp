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

    static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        return bytes.map(function (byte, i) { return binaryString.charCodeAt(i); });
    }

    static generateDownloadUrl(arrayBuffer) {
        const blob = new Blob([arrayBuffer]);
        return URL.createObjectURL(blob);
    }

    static renderPostsTable(posts) {
        return (
            <ul className="postList">
                {posts.map(function (item, index) {
                    let author = item.author;
                    let title = item.title;
                    let content = item.content;
                    let image = 'data:image/jpeg;base64,' + item.image;
                    let file = item.file;
                    let fileName = item.fileName;
                    let date = item.date;
                    let dateName = item.dateName;

                    let arrayBuffer = NewsFeed.base64ToArrayBuffer(file);
                    let fileUrl = NewsFeed.generateDownloadUrl(arrayBuffer);

                    return (
                        <div key={index}>
                            <Post author={author} title={title} content={content} image={image} file={fileUrl} fileName={fileName} date={date} dateName={dateName} />
                        </div>
                    )
                })}
            </ul>
        );
    }
}