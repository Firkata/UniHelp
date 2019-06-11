import React, { Component } from 'react';
import './styles.css'

export class Post extends Component {

    render() {
        return (
            <div width="100%" height="30%" max-height="100" className="postDiv">
                <p className="authorStyle">{this.props.author}</p>
                <p className="dateStyle">posted {this.props.date} {this.props.dateName} ago</p>
                <hr className="lineStyle" />
                <p className="titleStyle">{this.props.title} </p>
                <p className="contentStyle">{this.props.content}</p>
                <img src={this.props.image} className="imageStyle"></img>
                <a href={this.props.file} download={this.props.fileName} className="btn btn-info btn-lg downloadButton">
                    <span className="glyphicon glyphicon-download-alt downloadLink"></span>
                    {this.props.fileName}
                </a>
            </div>
        );
    }
}

export default Post