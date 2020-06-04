import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { baseService } from '../../../service/apiService';
import Alert from '@material-ui/lab/Alert';
import * as constants from '../../../constants';

import './Register.scss';

/**
 * Define constant Object for Register for initial state
 */
const initialState = {
    name: "",
    userName: "",
    password: "",
    submitted: false,
    serverError: "",
    userMsg: "",
    hideMsg: false,
    hideMsgSuccess:false,
    userLength:false,
    passwordLength:false,
    fieldLengthError:"must be 8 characters",
    
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initialState }
    }

    /**
     * Description: handleChange will call when user change any text in input control
     * @method handleChange
     * @param  {event} e
     * @return {null}
     */
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            const { userName, password} = this.state;
            const userLengthError = userName.length < 8 ? true : false;
            const passwordLengthError = password.length < 8 ? true : false;
            if(userName.length )
            this.setState({
                userLength:userLengthError,
                passwordLength:passwordLengthError
            })
            if (this.state.hideMsg) {
                if(userName.length )
                this.setState({
                    hideMsg: false
                })
            }
        })
    }

    /**
     * Description: Back to Login page
     * @method backToLogin
     * @param  {null}
     */
    backToLogin = () => {
        this.props.history.push('/');
    }

    /**
     * Description: Submit the data when user click on submit button
     * @method handleSubmit
     * @param  {event} e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, userName, password} = this.state;
        const userLengthError = userName.length < 8 ? true : false;
        const passwordLengthError = password.length < 8 ? true : false;
        this.setState({
            submitted: true,
            userLength:userLengthError,
            passwordLength:passwordLengthError
        });
        
        const data = {
            name: name,
            username: userName,
            password: password
        }
        if (name && userName && password) {
            baseService.post('/register', data).then(response => {
                if (response.status === 200) {
                    this.setState({
                        userMsg: "User Created Successfully",
                        name: "",
                        userName: "",
                        password: "",
                        submitted: false,
                        hideMsgSuccess: true,
                        hideMsg:false
                    })
                }
            }).catch(error => {
                try {
                    if(error){
                        this.setState({
                            serverError: constants.NETWORK_ERROR
                        })
                    }
                    if (error.response.status === 401) {
                        this.setState({
                            serverError: constants.duplicateUser,
                            hideMsg: true,
                            hideMsgSuccess:false
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }

    }
    render() {
        const { name, userName, password, submitted, 
            serverError, userMsg, hideMsg, hideMsgSuccess,
            passwordLength, userLength, fieldLengthError } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className="login-wrapper">
                    <Typography component="h1" variant="h5">
                        User Register
                </Typography>
                    {serverError && hideMsg && <Alert variant="outlined" severity="error">{serverError}</Alert>}
                    {userMsg && hideMsgSuccess && <Alert variant="outlined" severity="success">{userMsg}</Alert>}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoFocus
                            size="small"
                            value={name}
                            onChange={this.handleChange}
                            error={!name && submitted}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
                            size="small"
                            value={userName}
                            onChange={this.handleChange}
                            error={userLength  && submitted}
                            helperText={userLength ? `Username ${fieldLengthError}` : null}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            size="small"
                            onChange={this.handleChange}
                            error={passwordLength && submitted}
                            helperText={passwordLength ? `Password ${fieldLengthError}` : null}
                        />
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12} sm={6} >
                                <Button fullWidth type="submit" variant="contained" size="large" color="primary">
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant="outlined" onClick={this.backToLogin} size="large" color="primary">
                                    Back to Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Register;