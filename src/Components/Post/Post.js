import React, {Component} from 'react'

export default class Auth extends Component {
    constructor() {
        super()
        this.state = {
        title: '',
        img: '',
        content: '',
        author: '',
        authorPicture: ''
    }
}

    // getPost()

    render() {
        return (
            <div className="post">
                Post
            </div>

        )
    }
}