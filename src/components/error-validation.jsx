import React from "react";
import { useSelector } from "react-redux";

const ErrorValidation = () => {
  const { error } = useSelector((state) => state.auth);

  const errorMessage = () => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(", ");
      return `${name} - ${msg}`;
    });
  };

  return (
    error !== null &&
    errorMessage()?.map((error) => (
      <div className="alert alert-danger p-1 mb-0" role="alert">
        {error}
      </div>
    ))
  );
};

export default ErrorValidation;
