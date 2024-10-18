import React, { useEffect, useState } from "react";
import {
  getArticleDetailFailur,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import { useDispatch } from "react-redux";
import ArticleAuth from "../service/article";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "./article-form";

const EditArticle = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleAuth.getArticleDetail(id);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailur(error));
      }
    };

    getDetail();
  }, []);

  const createArticle = async (e) => {
    e.preventDefault();
    const newArticle = { title, description, body };
    dispatch(postArticleStart());
    try {
      await ArticleAuth.editArticle(id, newArticle);
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

export default EditArticle;
