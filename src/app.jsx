import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  ArticleDetail,
  CreateArticle,
  Login,
  Main,
  Navbar,
  Register,
} from "./components";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/localstorage";
import ArticleAuth from "./service/article";
import {
  getArticleFailure,
  getArticleStart,
  getArticleSuccess,
} from "./slice/article";

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
      </Routes>
    </div>
  );
};

export default App;
