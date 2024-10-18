import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  ArticleDetail,
  CreateArticle,
  EditArticle,
  Login,
  Main,
  Navbar,
  Register,
} from "./components";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/localstorage";
const App = () => {
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await AuthService.userGet();
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUsers();
    }
  }, []);

  return (
    <div className="container flex flex-column items-center gap-[20px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
      </Routes>
    </div>
  );
};

export default App;
