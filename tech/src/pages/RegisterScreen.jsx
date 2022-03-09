import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from './registerScreen.module.css';
const RegisterScreen = () => {
    const [item, setItem] = useState({});
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const history = useHistory();

    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let isAdmin = !e.target.checked;
        setItem({
            ...item,
            [name]: value,
            isAdmin
        })
        console.log(item);
    }

    useEffect(() => {
      if(item.password !== item.confirmPassword) {
        setIsPasswordMatch(false);
      }else {
        setIsPasswordMatch(true);
      }
    }, [item.confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isPasswordMatch) {
          const user = await axios.post('http://localhost:8800/api/auth/register', item);
          console.log(user);
          history.push("/login")
        }

    }
  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="firstName"
              onChange={inputHandler}
              value={item.firstName}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="lastName"
              placeholder="Last Name"
              onChange={inputHandler}
              value={item.lastName}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              placeholder="Email Address"
              aria-describedby="emailHelp"
              onChange={inputHandler}
              value={item.email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              onChange={inputHandler}
              value={item.password}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={isPasswordMatch ? "form-control" : "form-control passwordMatch"}
              id="exampleInputPassword1"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={inputHandler}
              value={item.confirmPassword}
            />
            {
              isPasswordMatch ? '' : <span className={styles.passwordMatch}>Your Password is mismatch....</span>
            }
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              name="phone"
              placeholder="Mobile"
              onChange={inputHandler}
              value={item.phone}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              onChange={inputHandler}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              IS ADMIN
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link to="/login">Login here</Link>
      </div>
    </>
  );
};

export default RegisterScreen;
