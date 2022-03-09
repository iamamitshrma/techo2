import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './loginScreen.module.css';
const LoginScreen = () => {
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});

    const history = useHistory();

    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setItem({
            ...item,
            [name]: value,
        })
    }

    const submitHandler = async  (e) => {
        e.preventDefault();
        const items = await axios.post('http://localhost:8800/api/auth/login', item);
        setUser(items.data.user);
        localStorage.setItem('user', user);
        history.push("/")
    }
  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              onChange={inputHandler}
              value={item.email}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={inputHandler}
              value={item.password}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link to="/register">Register Here</Link>
      </div>
    </>
  );
};

export default LoginScreen;
