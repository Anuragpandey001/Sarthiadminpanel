import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, FormGroup, Row, Button } from "react-bootstrap";
import { BASEURL } from "../BaseUrl";
import TitleComp from "./TitleComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Blogelem() {
  // State to manage form data

  const [countrydata, setcountrydata] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const allcountrydata = () => {
    axios.get(`${BASEURL}/blog`, { headers }).then((res) => {
      console.log(res.data);
      setcountrydata(res.data);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${BASEURL}/blog/${id}`).then((res) => {
      alert("delete Data Succesffully");
      allcountrydata();
    });
  };

  useEffect(() => {
    allcountrydata();
  }, []);

  const getRowId = (resident) => resident._id;

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },

    {
      field: "image",
      headerName: "image",
      flex: 1,
      renderCell: (params) => {
        const { value } = params;
        return (
          <img
            src={`${BASEURL}/${value}`}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
            }}
            className="img-fluid tableimgmui"
          ></img>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <button className="btn" onClick={() => handleEdit(id)}>
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <button onClick={() => handleDelete(id)} className="btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        );
      },
    },
  ];

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    subheading: "",
    title: "",
    image: null, // For file input
    description: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a file input, use the files property
    const inputValue = type === "file" ? e.target.files[0] : value;

    setFormData({ ...formData, [name]: inputValue });
  };

  // Function to handle form submission
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     // Create FormData object
  //     const formDataObject = new FormData();
  //     formDataObject.append("subheading", formData.subheading);
  //     formDataObject.append("title", formData.title);
  //     formDataObject.append("image", formData.image);
  //     formDataObject.append("description", formData.description);

  //     // Make API call (replace with your API endpoint)
  //     fetch(`${BASEURL}/blog`, {
  //       method: "POST",
  //       body: formDataObject,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Success:", data);
  //         alert("data Submitted successfully");
  //         // Handle success, e.g., show a success message to the user
  //         setFormData({
  //           subheading: "",
  //           title: "",
  //           image: null,
  //           description: "",
  //         });
  //         // Reset the file input
  //         if (fileInputRef.current) {
  //           fileInputRef.current.value = "";
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         // Handle error, e.g., show an error message to the user
  //       });
  //   };

  const [selectedBlog, setSelectedBlog] = useState(null);

  // Function to handle edit button click
  const handleEdit = (id) => {
    // Fetch the data for the selected blog entry
    axios.get(`${BASEURL}/blog/${id}`, { headers }).then((res) => {
      const blogData = res.data.data;
      // Update the form with the data of the selected blog entry
      setFormData({
        subheading: blogData.subheading,
        title: blogData.title,
        image: blogData.image, // Note: You may want to handle image editing separately
        description: blogData.description,
      });
      console.log(formData);
      console.log(blogData);
      // Store the selected blog entry for later use in form submission
      setSelectedBlog(blogData);
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formDataObject = new FormData();
    formDataObject.append("subheading", formData.subheading);
    formDataObject.append("title", formData.title);
    formDataObject.append("image", formData.image);
    formDataObject.append("description", formData.description);

    // Determine whether to create a new entry or update an existing one
    const apiUrl = selectedBlog
      ? `${BASEURL}/updateblog/${selectedBlog._id}`
      : `${BASEURL}/blog`;

    // Make API call
    fetch(apiUrl, {
      method: selectedBlog ? "put" : "post",
      body: formDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data submitted successfully");
        // Reset the form data to clear the values
        setFormData({
          subheading: "",
          title: "",
          image: null,
          description: "",
        });
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Clear the selected blog entry state
        setSelectedBlog(null);
        // Refresh the blog list
        allcountrydata();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <>
      <section>
        <Container fluid>
          <div className="row">
            <Col md="12">
              <TitleComp title="Blogs" />
            </Col>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow p-3 rounded-3"
            >
              <div className="row gy-3">
                <div className="col-md-4">
                  <label htmlFor="subheading">Subheading:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subheading"
                    name="subheading"
                    value={formData.subheading}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    name="image"
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className="col-md-12">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="form-control w-100"
                    id="description"
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    ref={fileInputRef}
                  />
                </div> */}
                <div className="col-md-12">
                  <label htmlFor="description">Description:</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData({ ...formData, description: data });
                    }}
                    className="custom-ckeditor"
                  />
                </div>
              </div>
              <button className="btn bg-success mt-3 text-white">Submit</button>
            </form>

            <div className="col-md-12 mt-3">
              {countrydata.length > 0 ? (
                <Box sx={{ height: 500, width: "100%" }}>
                  <DataGrid
                    rows={countrydata}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                  />
                </Box>
              ) : (
                <div>Loading or no data available</div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Blogelem;
