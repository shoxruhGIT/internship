import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../slice/auth";
import { removeItem } from "../helpers/localstorage";
import { useNavigate, useParams } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=> {
    const getDetail = async ()=> {
      
    }
  })

  const logOutHandler = () => {
    dispatch(logOutUser());
    removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={logOutHandler} className="bg-black text-white">
        LogOut
      </button>
    </div>
  );
};

export default Users;
