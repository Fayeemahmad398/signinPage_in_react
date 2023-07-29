import welcome from "./Welcome.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  actionToFetchFailure,
  actionToFetchRequest,
  actionToFetchSuccess,
} from "../redux/actions/actionCreator";

const SigninPage = () => {
  const [usernameState, setUserNameState] = useState("");
  const [passwordState, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  let [fetchError, setFetchError] = useState("");

  const state = useSelector((statea) => {
    return statea;
  });

  useEffect(() => {
    fetchError = state.error;
    if (fetchError) {
      setFetchError(fetchError);
    }
    if (fetchError) {
      setTimeout(() => {
        setFetchError("");
      }, 5000);
    }
  }, [state.error]);

  function fetchData() {
    dispatch(actionToFetchRequest());

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${usernameState}`,
        password: `${passwordState}`,
      }),
    })
      .then((response) => {
        console.log(response.status);

        if (response.status == 200) {
          toast(`Welcome ${usernameState},  succesfully logged in`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            style: {
              backgroundColor: `green`,
              color: "white",
            },
          });
          setTimeout(() => {
            navigator("/ProfilePage");
          }, 2000);
          return response.json();
        } else {
          console.log(response.status);
          dispatch(
            actionToFetchFailure(
              `Error is there with status code: ${response.status}  Please use existing userId only=> choose one  of them => Username - hbingley1 , password - CQutx25i8r Username - rshawe2 , password - OWsTbMUgFc`
            )
          );
        }
      })
      .then((data) => {
        dispatch(actionToFetchSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actionToFetchFailure(error));
      });

    setUserNameState("");
    setPassword("");
  }

  function handleClick() {
    if (usernameState && passwordState) {
      fetchData();
    } else {
      setError("*All fields are mandatory");
    }
  }

  return (
    <>
      <div className="signinpage">
        {!fetchError ? (
          <div className="form-box">
            <img src={welcome} alt="" />
            <h1>Sign in to your account</h1>

            <form action="">
              <div className="box">
                <label htmlFor="">Your Username:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setUserNameState(event.target.value.trim());
                    setError("");
                  }}
                />
              </div>
              <div className="box">
                <label htmlFor="">Password:</label>
                <input
                  type="password"
                  onChange={(event) => {
                    setError("");
                    setPassword(event.target.value.trim());
                  }}
                />
              </div>
              <p id="mandatory">{error}</p>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleClick();
                }}
              >
                Continue
              </button>
              <a href="">Forget your password?</a>
            </form>
          </div>
        ) : (
          <h1 id="fetchError">{fetchError}</h1>
        )}
        <ToastContainer />
      </div>
      <div id="havingacount">
        <p>Don’t have an account? </p>
        <a href="">signup</a>
      </div>
    </>
  );
};
export default SigninPage;
