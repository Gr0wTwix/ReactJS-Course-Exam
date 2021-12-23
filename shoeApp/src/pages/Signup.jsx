import classes from './Signup.module.css';
import { Grid, TextField } from '@material-ui/core';

import { GiRunningShoe } from 'react-icons/gi';
import SignLogic from '../components/SignLogic';
import Footer from "../components/Footer";


const Signup = () => {
    const { 
        onRegisterMode, 
        onLoginMode, 
        onAuthInputChangeHandler, 
        authFormData,
        isLoginMode, 
        handleAuthSubmitHandler 
    } = SignLogic();
    
    return (
        <section className={classes['form-wrapper']}>
            <div className={classes.form}>
                <div className={classes.background}>
                    <h1 className={classes.title}>Shoes</h1>
                    <GiRunningShoe fontSize={100} color="white" />
                </div>
                <form className={classes['inputs-wrapper']} onSubmit={handleAuthSubmitHandler}>
                    <div className={classes.tabs}>
                        <button type="button" onClick={onRegisterMode} className={`${classes.tab} ${!isLoginMode && classes.underline}`}>SIGN UP</button>
                        <button type="button" onClick={onLoginMode} className={`${classes.tab} ${isLoginMode && classes.underline}`}>SIGN IN</button>
                    </div>
                    <Grid container direction="column" spacing={2}>
                        {
                            !isLoginMode
                            && (
                                <Grid item>
                                    <TextField
                                        className={classes.input} 
                                        fullWidth 
                                        label="Username" 
                                        variant="standard"
                                        name="username"
                                        onChange={onAuthInputChangeHandler}
                                        error={!authFormData.username.isValid}
                                        value={authFormData.username.value}
                                        required
                                    />
                                </Grid>
                            )
                        }
                        <Grid item>
                            <TextField
                                className={classes.input} 
                                fullWidth 
                                label="E-mail" 
                                variant="standard"
                                name="email"
                                onChange={onAuthInputChangeHandler}
                                error={!authFormData.email.isValid}
                                value={authFormData.email.value}
                                required 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                type="password" 
                                fullWidth 
                                className={classes.input} 
                                label="Password" 
                                variant="standard" 
                                name="password"
                                onChange={onAuthInputChangeHandler}
                                error={!authFormData.password.isValid}
                                value={authFormData.password.value}
                                required 
                            />
                        </Grid>
                        <Grid item>
                            <button 
                                type="submit" 
                                className={`${classes.sign} ${classes.input}`}
                            >
                                {isLoginMode ? 'LOGIN' : 'REGISTER'}
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </section>
    );
}

export default Signup;

