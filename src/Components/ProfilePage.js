import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionToFetchFailure,
  actionToFetchRequest,
  actionToFetchSuccess,
} from "../redux/actions/actionCreator";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  console.log("working");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  console.log(state, " State of profile page");
  const profileDetails = state.data ? state.data : {};

  useEffect(() => {
    if (state.data.id) {
      dispatch(actionToFetchRequest());

      fetch(`https://dummyjson.com/users/${state.data.id}`)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            return response.json();
          } else {
            dispatch(
              actionToFetchFailure("Error is there with " + response.status)
            );
          }
        })
        .then((data) => {
          console.log(data);
          dispatch(actionToFetchSuccess(data));
        })

        .catch((error) => {
          console.log(error);
          dispatch(actionToFetchFailure(error));
        });
    } else {
      navigator("/");
    }
  }, []);
  return (
    <>
      {Object.keys(profileDetails).length > 0 ? (
        <div id="profile_box">
          <h1 id="profileheading">Profile</h1>

          <div id="img">
            <img className="img" src={profileDetails.image} alt="" />
          </div>
          <p>
            <strong>ID:</strong> <span>{profileDetails.id}</span>
          </p>
          <p>
            <strong>FirstName:</strong> <span>{profileDetails.firstName}</span>
          </p>
          <p>
            <strong>LastName:</strong> <span>{profileDetails.lastName}</span>
          </p>
          <p>
            <strong>UserName:</strong> <span>{profileDetails.username}</span>
          </p>
          <p>
            <strong>Password:</strong> <span>{profileDetails.password}</span>
          </p>
          <p>
            <strong>Height:</strong> <span>{profileDetails.height}cms</span>
          </p>
          <p>
            <strong>I.P Adress:</strong> <span>{profileDetails.ip}</span>
          </p>
          <p>
            <strong>Gender:</strong> <span>{profileDetails.gender}</span>
          </p>
          <p>
            <strong>Email:</strong> <span>{profileDetails.email}</span>
          </p>
          <p>
            <strong>Phone No:</strong> <span>{profileDetails.phone}</span>
          </p>
        </div>
      ) : (
        <NavLink to="/"></NavLink>
      )}
    </>
  );
};
export default ProfilePage;
