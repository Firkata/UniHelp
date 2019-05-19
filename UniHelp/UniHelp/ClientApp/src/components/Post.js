import React, { Component } from 'react';

export class Post extends Component {

    render() {
        return (
            <div>
                <p>{this.props.text}</p>
                <p>{this.props.link}</p>
            </div>
        );
    }
}

export default Post