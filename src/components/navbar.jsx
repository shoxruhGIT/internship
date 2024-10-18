import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../helpers/localstorage";
import { logOutUser } from "../slice/auth";

const Navbar = () => {
  const { loggidIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUserHandler = () => {
    dispatch(logOutUser());
    removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container py-3">
      <Link to={"/"} className="fs-4 fw-bold">
        REDUX
      </Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggidIn ? (
          <div className="d-flex gap-2 items-center">
            <p>{user.username}</p>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/create-article"}
            >
              Create article
            </Link>
            <button
              className="btn btn-outline-danger"
              onClick={logOutUserHandler}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {" "}
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
