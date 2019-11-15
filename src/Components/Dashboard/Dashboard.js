import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
        posts: [],
        search: '',
        userposts: true
    }
}

    // getAllPosts()
search = () => {
    axios
    .get(this.state.search)
    .then(res => {
        this.setState({posts: res.data})
    })
    .catch(err => console.log(err))
}
    // resetSearch()
reset = () => {
    axios
    .get(`/api/posts/?userposts=${this.state.myPosts}`)
    .then(res => {
        this.setState({posts: res.data, search: ""})
    })
    .catch(err => console.log(err))
}

    render() {
        return (
            <div className="dashboard">
                Dashboard
            </div>

        )
    }
}

export default Dashboard;