import React, { Component } from 'react';

export class Post extends Component {

    render() {
        return (
            <div width="100%" height="30%" max-height="100" style={divStyle}>
                <p style={authorStyle}>{this.props.author}</p>
                <hr style={lineStyle} />
                <p style={titleStyle}>{this.props.title}</p>
                <p>{this.props.content}</p>
                <img src={this.props.image} style={imageStyle} ></img>
            </div>
        );
    }
}

const divStyle = {
    border: '1px solid lightgray',
    borderRadius: '10px',
    padding: '5px',
    marginTop: '5px'
};

const imageStyle = {
    height: '60%',
    width: '100%',
    borderRadius: '5px',
    objectFit: 'cover'
};

const titleStyle = {
    fontWeight: 'bold'
};

const contentStyle = {

};

const authorStyle = {
    fontWeight: 'bold',
    marginTop: '5px',
    marginLeft: '5px'
};

const lineStyle = {
    marginTop: '0px'
}

export default Post