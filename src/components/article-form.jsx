import React from "react";
import { Input, Textarea } from "../ui";

const ArticleForm = (props) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    createArticle,
  } = props;

  return (
    <form onSubmit={createArticle} className="d-flex flex-col gap-2">
      <Input label={"Title"} state={title} setState={setTitle} />
      <Textarea
        label={"Desription"}
        state={description}
        setState={setDescription}
      />
      <Textarea
        label={"Body"}
        height={"300px"}
        state={body}
        setState={setBody}
      />
      <button className="btn btn-primary w-100 py-2" type="submit">
        Create
      </button>
    </form>
  );
};

export default ArticleForm;
