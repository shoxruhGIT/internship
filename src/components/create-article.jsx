import React, { useState } from "react";
import { ArticleForm } from "./";
import ArticleAuth from "../service/article";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";

const CreateArticle = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createArticle = async (e) => {
    e.preventDefault();
    const newArticle = { title, description, body };
    dispatch(postArticleStart());
    try {
      await ArticleAuth.postArticle(newArticle);

      navigate("/");
      dispatch(postArticleSuccess());
    } catch (error) {
      console.log(error);
      dispatch(postArticleFailure());
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    createArticle,
  };

  return (
    <div className="w-[600px] text-center">
      <h1 className="fw-bold text-4xl">Create Article</h1>
      <ArticleForm {...formProps} />
    </div>
  );
};

export default CreateArticle;
