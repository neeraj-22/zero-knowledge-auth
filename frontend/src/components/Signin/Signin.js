import React, { Fragment, useState, useEffect} from "react";
import { createHash } from "crypto";
import Footer from "../CommonComps/Footer";
import Header from "../CommonComps/Header";
import "./Signin.css";
import { signinUser } from "../../API/authAPICalls.js"
const Signin = () => {

  const [email, setEmail] = useState("testu2@xyz.com");
  const [password, setPassword] = useState("password123");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Generating prover key
  let userCredentialsConcatenatedString = email + password;

  // let nonce = 9;
  const hash = createHash('sha256');
  let prover_key = hash.update(userCredentialsConcatenatedString).digest("hex");

  const loginSubmit = (e) => {
    e.preventDefault();
    signinUser({ email, prover_key })
      .then((data) => {
        setLoading(true)
        if (data.success === false) {
          setLoading(false);
          setError(true);
        } else {
          setLoading(false);
          setSuccess(true);
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  };


  useEffect(() => { 
    if(loading){
      setMessage("Loading..")
    }
    if(success){
      setMessage("Signed In Successfully")
    }
    if(error){
      setMessage("Invalid Credentials")
    }
  }, [loading, success, error])

  return (
    <Fragment>
      <Header/>
      <div className="formContainer">
        <h3>Signin to your account</h3>
        <form onSubmit={loginSubmit}> {/* Add onSubmit={loginSubmit}*/}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <input type="submit" value={"login"} className="btn btn-dark mt-3"/>
        </form>
        <p>{`Email : ` + JSON.stringify(email)}</p>
        <p>{`Password : ` + JSON.stringify(password)}</p>
        <p>{`Key : ` + prover_key}</p>
        <p>{`Message : ` + JSON.stringify(message)}</p>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Signin;
