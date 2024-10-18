import React, { useEffect, useState } from "react";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ErrorValidation } from "./";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, loggidIn } = useSelector((state) => state.auth);

  const logInHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());

    const user = { username, email, password };

    try {
      const response = await AuthService.userRegister(user);
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
          <h1 className="h3 fw-normal">Please register</h1>
          <ErrorValidation />
          <Input label={"Username"} state={username} setState={setUsername} />
          <Input label={"Email address"} state={email} setState={setEmail} />
          <Input label={"Password"} state={password} setState={setPassword} />

          <button
            disabled={isLoading}
            onClick={logInHandler}
            className="btn btn-primary w-100 py-2"
            type="submit"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
