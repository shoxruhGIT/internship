import React, { useEffect, useState } from "react";
import { Input } from "../ui";
import { useSelector, useDispatch } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ErrorValidation } from "./";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, loggidIn } = useSelector((state) => state.auth);

  const logInHandler = async (e) => {
    e.preventDefault();

    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  useEffect(()=> {
    if(loggidIn){
      navigate('/')
    }
  }, [loggidIn])

  return (
    <div className="flex w-[300px] mt-[170px]">
      <main className="form-signin w-100 m-auto">
        <form className="text-center flex flex-column gap-[15px]">
          <h1 className="h3 fw-normal">Please login</h1>
          <ErrorValidation />

          <Input label={"Email"} state={email} setState={setEmail} />
          <Input label={"Password"} state={password} setState={setPassword} />
          <button
            className="btn btn-primary w-100 py-2"
            disabled={isLoading}
            onClick={logInHandler}
            type="submit"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
