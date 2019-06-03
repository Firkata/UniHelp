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
        //return bytes.map((byte, i) => binaryString.charCodeAt(i));
        return bytes.map(function (byte, i) { return binaryString.charCodeAt(i); });
    }

    static generateDownloadUrl(arrayBuffer) {
        const blob = new Blob([arrayBuffer]);
        return URL.createObjectURL(blob);

        //const reader = new FileReader();
        //let blob = new Blob(new Uint8Array(posts[0].file));
        //let file = reader.readAsArrayBuffer(blob);
        //let uriContent = "data:application/octet-stream," + encodeURIComponent(file);
        //window.open(uriContent, "document");
    }

    static renderPostsTable(posts) {
        let author = posts[0].author;
        let title = posts[0].title;
        let content = posts[0].content;
        let image = 'data:image/jpeg;base64,' + posts[0].image;
        let file = posts[0].file;
        let fileName = posts[0].fileName;
        let date = posts[0].date;

        console.log(author);
        let arrayBuffer = NewsFeed.base64ToArrayBuffer(file);
        let fileUrl = NewsFeed.generateDownloadUrl(arrayBuffer);

        return (
            <Post author={author} title={title} content={content} image={image} file={fileUrl} fileName={fileName} date={date}/>
        );
    }
}