import React from "react";
import { Container, Row } from "react-bootstrap";
import Sidebaar from "../Component/Sidebaar";
import Blogelem from "../Component/Blogelem";

function Blog() {
  return (
    <>
      <Sidebaar content={<Blogelem />} />
    </>
  );
}

export default Blog;
