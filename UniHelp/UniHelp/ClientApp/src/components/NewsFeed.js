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
            ? <p><em>Loading news feed...</em></p>
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
                    let fileName, fileUrl, image;

                    if (item.image != "null") {
                        image = 'data:image/jpeg;base64,' + item.image;
                    }
                    if (item.file != "null") {
                        let file = item.file;
                        fileName = item.fileName;
                        let arrayBuffer = NewsFeed.base64ToArrayBuffer(file);
                        fileUrl = NewsFeed.generateDownloadUrl(arrayBuffer);
                    }
                    
                    let date = item.date;
                    let dateName = item.dateName;
                    let group = item.group;
                    
                    return (
                        <div key={index}>
                            <Post author={author} title={title} content={content} image={image} file={fileUrl} fileName={fileName} date={date} dateName={dateName} group={group}/>
                        </div>
                    )
                })}
            </ul>
        );
    }
}