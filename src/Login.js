import './Login.css';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [apiErr, setApiErr] = useState("");

  const handleChange = (event) => {
    setApiErr("");
    if(event.target.name === "email") setEmail(event.target.value);
    if(event.target.name === "password") setPassword(event.target.value);
    verifyFields(event.target.value, event.target.name)
  }

  const verifyFields = (content, fieldName) => {
    if(fieldName === "email") {
      const emailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
      if(content.length > 0 && !emailFormat.test(content)) setEmailErr("Please enter a valid email address");
      else setEmailErr("");
    }

    if(fieldName === "password") {
      if(content.length > 0 && content.length < 4) setPasswordErr("Please enter a valid password");
      else setPasswordErr("");
    }
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmitted(true);
      const { data: response } = await axios.post("/api/login", {
        email,
        password,
      })

      if(!response) setApiErr('The server could not be reached. Please try again later');

      console.log(response);

      setEmail('');
      setPassword('');
      setSubmitted(false);
    } catch(err) {
      console.log("failed to submit form", err)
    }
  }

  return (<div className="max-width">
    <div className="center">
      <div className="login">
        <h1 className="title">Rapptr Labs</h1>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <div className="wrapper">
                <i className="fas fa-user icon"></i>
                <input className={emailErr && email && "invalid"} name="email" type="email" value={email} required placeholder="user@rapptrlabs.com" maxLength="50" onChange={handleChange}></input>
                {emailErr && <div className="err-message">{emailErr}</div>}
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="wrapper">
                <i className="fas fa-lock icon"></i>
                <input className={passwordErr && password && "invalid"} name="password" type="password" value={password} required placeholder="Must be at least 4 characters" minLength="4" maxLength="16" onChange={handleChange}></input>
                {passwordErr && <div className="err-message">{passwordErr}</div>}
              </div>
            </div>
            <button type="submit" disabled={submitted} className="button" id={(submitted && "disabledBtn") || (( emailErr|| passwordErr ) && "invalidBtn")}>{ submitted? <i className="fas fa-spinner"></i>:"Login"}</button>
            {apiErr && <div className="err-message">{apiErr}</div>}
          </form>
        </div>
      </div>
    </div>
  </div>)
}

export default Login;
