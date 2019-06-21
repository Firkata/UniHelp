import React, { Component } from 'react';
import './styles.css'

export class Post extends Component {

    render() {
        let image, file, group, groupPrefix = "група";
        group = this.props.group;
        if (group == "0") {
            group = "Всички";
            groupPrefix = "";
        }
            
        if (this.props.image) {
            image = <img src={this.props.image} className="imageStyle"></img>;
        }
        if (this.props.fileName) {
            file = <a href={this.props.file} download={this.props.fileName} className="btn btn-info btn-lg downloadButton">
                <span className="glyphicon glyphicon-download-alt downloadLink"></span>
                {this.props.fileName}
            </a>;
        }

        return (
            <div width="100%" height="30%" max-height="100" className="postDiv">
                <p className="authorStyle">{this.props.author}</p>
                <p className="dateStyle">публикува преди {this.props.date} {this.props.dateName} до <strong>{groupPrefix} {group}</strong></p>
                <hr className="lineStyle" />
                <p className="titleStyle">{this.props.title} </p>
                <p className="contentStyle">{this.props.content}</p>
                {image}
                {file}
            </div>
        );
    }
}

export default Post