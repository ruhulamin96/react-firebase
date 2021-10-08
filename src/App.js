import logo from "./logo.svg";
import "./App.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import initializeAuthentication from "./firebase/firebase.initialize";
import { useState } from "react";
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
function App() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [name, setName] = useState("");
  const auth = getAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password should be 8 character");
      return;
    }

    isChecked ? processLogin(email, password) : createNewUser(email, password);
  };

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        setUserName();
        alert("Registration is successfully completed");
      })
      .catch((err) => {
        setError("You Already Register With This Email");
      });
  };
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then(() => {});
  };
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        alert("Login successful");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const handleEmail = (e) => {
    e.preventDefault();
    setEamil(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckbox = (e) => {
    setisChecked(e.target.checked);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then((result) => {
      alert("Check your mail");
    });
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleGoogle=()=>{
    signInWithPopup(auth, googleProvider)
    .then((result)=>{
    }).catch((err)=>{
      setError("Google Sign In Error")
    })
  }
  const handleGitHub=(e)=>{
    e.preventDefault()
    signInWithPopup(auth, githubProvider)
    .then((result)=>{
      const user=result.user;
      alert("Successfully login")
    }).catch((err)=>{
      setError("Your Account Already Exist")
    })
  }

  return (
    <div className="w-50 mx-auto mt-3">
      <h1 className="text-primary text-center fw-bold">
        Please {isChecked ? "Log In" : "Sign Up"}
      </h1>
      <form onSubmit={handleSubmit}>
        {!isChecked && (
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label fs-3">
              Name
            </label>
            <input
              placeholder="Typer your Name"
              onBlur={handleName}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        )}
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label fs-3">
            Email address
          </label>
          <input
            onChange={handleEmail}
            placeholder="Email Address"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label fs-3">
            Password
          </label>
          <input
            onBlur={handlePassword}
            placeholder="Type Password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            onClick={handleCheckbox}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Already Sign Up ?
          </label>
        </div>
        <div className="text-danger my-3">{error}</div>
        <button type="submit" className="btn btn-primary">
          {isChecked ? "Login" : "Register"}
        </button>
        {isChecked && (
          <button
            onClick={handleForgotPassword}
            type="submit"
            className="btn btn-primary ms-5"
          >
            Forgot Password ?
          </button>
        )}
      </form>
        <div className="text-center">
        <p className="text-center fs-4 fw-bold">Or Sign Up with</p>
        <button onClick={handleGoogle} type="submit" className="btn fs-5">Google <i class="fab fa-google text-danger"></i></button>
        <button onClick={handleGitHub} type="submit" className="btn fs-5">GitHub <i class="fab fa-github text-dark"></i></button>
        </div>
    </div>
  );
}

export default App;
