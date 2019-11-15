import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import './Auth.css';

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    // handleChange()
    handleUsernameInput(value) {
        this.setState({ username: value })
    }

    // handleChange()
    handlePasswordInput(value) {
        this.setState({ password: value })
    }

    // login()
    login() {
        const { username, password } = this.state;
        axios
            .post('/auth/login', { 
                username: this.state.username, 
                password: this.state.password
            })
            .then(res => {
                const {username, profile_img} = res.data;
                updateUser(username, profile_img);
                this.props.history.push("/dashboard");
            })
            .catch(err => console.log(err.response.request.response))
    }

    // register()
    register = () => {
        const { username, password } = this.state;
        axios
            .post('/api/auth/register', { username, password })
            .then(user => {
                this.setState({ username: '', password: '' });
                this.props.updateUser(user.data);
            })
            .catch(err => {
                this.setState({ username: '', password: '' });
                alert(err.response.request.response)
            })
    }

    render() {
        const { username, password } = this.state;
        // maybe?  const {user} = this.props;
        return (
            <div className="authBox">
                <div className="inputBox">
                    {/* <img src={index} /> */}
                    <h1 id="authHeader">Helo</h1>
                    <div className="authInput">
                        <span className="authInputText">Username:</span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={e => this.handleUsernameInput(e.target.value)}
                        />
                    </div>
                    <div className="authInput">
                        <span className="authInputText">Password:</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={e => this.handlePasswordInput(e.target.value)}
                        />
                    </div>
                    <div className="buttonBox">
                        <button className="button" onClick={this.login}>
                            Login
                </button>
                        <button className="button" onClick={this.register}>
                            Register
                </button>
                    </div>
                </div>
            </div>

            // <Link to='/Dashboard'><button onClick={this.handleRegister}>Register</button></Link>
            // <Link to='/Dashboard'><button onClick={this.handleLogin}>login</button></Link>

        )
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, updateUser)(Auth)