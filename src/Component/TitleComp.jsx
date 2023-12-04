import React from "react";

function TitleComp(props) {
  return (
    <div className="my-4 d-flex justify-content-center">
      <h3 className="tileclass">{props.title}</h3>
    </div>
  );
}

export default TitleComp;
