import React, { Component } from 'react';
import './styles.css'

export class Post extends Component {

    render() {
        return (
            <div width="100%" height="30%" max-height="100" className="postDiv">
                <p className="authorStyle">{this.props.author}</p>
                <hr className="lineStyle" />
                <p className="titleStyle">{this.props.title} </p>
                <p classname="contentStyle">{this.props.content}</p>
                <img src={this.props.image} className="imageStyle"></img>
            </div>
        );
    }
}

export default Post