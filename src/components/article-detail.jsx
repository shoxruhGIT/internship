import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleAuth from "../service/article";
import {
  getArticleDetailFailur,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import moment from "moment";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);
  console.log(articleDetail);

  useEffect(() => {
    const getDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleAuth.getArticleDetail(id);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailur(error));
      }
    };

    getDetail();
  }, [id]);

  return isLoading ?  ( <Loader/>) :
    ( articleDetail !== null && 
      <div className="container py-4">
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5 d-flex flex-col gap-2">
            <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
            <p className="col-md-8 fs-4">{articleDetail.description}</p>
            <p className="text-muted">
              {" "}
              <span className="fw-bold">CreatedAt: </span>
              {moment(articleDetail.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <p>{articleDetail.body}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3 d-flex items-center justify-between" >
              <div className="">
                <strong className="d-inline-block mb-2 text-primary text-uppercase">
                  {articleDetail.author.username}
                </strong>
                <p className="card-text mb-auto">{articleDetail.author.bio}</p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img rounded-[10px]"
                  width="200"
                  height={"100%"}
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width='100%' height='100%' fill="#55595c"></rect>
                  <text x={'45%'} y={'52%'} fill={'#fff'} className="fs-2 text-uppercase p0 m-0"> {articleDetail.author.username[0]}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default ArticleDetail;
