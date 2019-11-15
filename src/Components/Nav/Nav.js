import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import {updateUser, clearUser} from "../../ducks/reducer"
import axios from 'axios';

class Nav extends Component {
    // NO STATE OR METHODS

    render() { 
        console.log(this.props)
        return (
            <div className="nav">
                <Link to='Dashboard'><button>Home</button></Link>
                <Link to='/Post:postid'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
            </div>

        )
    }
}

const mapStateToProps = reduxState => {
    const { username, profile_img } = reduxState;
    return {
        username, profile_img
    }
}

export default connect(mapStateToProps)(Nav)