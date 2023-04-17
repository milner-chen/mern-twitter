import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";

// email, password


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // retreiving errors from errors reducer
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            // cleanup -> clear errors on dismount (leaving the page)
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    // on change, update specified field
    const update = (field) => {
        // set local state depending on input of type
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    // upon submission, login
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log In Form</h2>
            <div>{errors?.email}</div>
            <label>
                <span>Email</span>
                <input
                    type="text"
                    value={email}
                    onChange={update('email')}
                    placeholder="Email"
                />
            </label>
            <div className="errors">{errors?.password}</div>
            <label>
                <span>Password</span>
                <input
                    type="password"
                    value={password}
                    onChange={update('password')}
                    placeholder="Password"
                />
            </label>
            <input
                type="submit"
                value="Log In"
                disabled={!email || !password}
            />
        </form>
    );
}

export default LoginForm;