import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Modal } from "react-bootstrap";
import { BASEURL } from "../BaseUrl";
import { DataGrid } from "@mui/x-data-grid";
import TitleComp from "./TitleComp";
import Loader from "./Loader";

function Review() {
  const getRowId = (resident) => resident._id;
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [job, setjob] = useState("");
  const [desc, setdesc] = useState("");
  const [countrydata, setcountrydata] = useState([]);
  const [id, setid] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setid("");
    setName("");
    setjob("");
    setdesc("");
    setFile("");
  };
  const handleShow = (id) => {
    setShow(true);
    setid(id);
  };

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("desc", desc);
    formdata.append("job", job);
    formdata.append("image", file);
    axios
      .post(`${BASEURL}/reviews`, formdata, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 200 || res.statusText == "OK") {
          alert("Data Submit Successfully");
          setOpen(false);
          allcountrydata();
          handleClose();
        }
      })
      .catch((err) => {
        setOpen(false);
        console.log(setOpen(false));
      });
  };

  const allcountrydata = () => {
    axios.get(`${BASEURL}/allreviews`).then((res) => {
      console.log(res.data.data);
      setcountrydata(res.data.data);
    });
  };

  const handleEdit = () => {
    axios.get(`${BASEURL}/reviews/${id}`, { headers }).then((res) => {
      setName(res.data.data.name);
      setjob(res.data.data.job);
      setdesc(res.data.data.desc);
      // console.log(res.data.name);
    });
  };
  const handleDelete = (id) => {
    axios.delete(`${BASEURL}/reviews/${id}`).then((res) => {
      alert("delete Data Succesffully");
      allcountrydata();
    });
  };

  useEffect(() => {
    if (id) {
      handleEdit();
    }
  }, [id]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
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
      field: "job",
      headerName: "Proffestion",
      flex: 1,
    },

    {
      field: "desc",
      headerName: "description",
      flex: 1,
    },

    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <button onClick={() => handleShow(id)} className="btn">
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

  useEffect(() => {
    allcountrydata();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setOpen(true);
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("desc", desc);
    formdata.append("job", job);
    formdata.append("image", file);

    axios
      .put(`${BASEURL}/updatereviews/${id}`, formdata, { headers })
      .then((res) => {
        console.log(res);
        allcountrydata();
        handleClose();
        if (res.status == 200 || res.statusText == "OK") {
          alert("Data Submit Successfully");
          setOpen(false);
        }
      })

      .catch((err) => {
        setOpen(false);
        console.log(setOpen(false));
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  return (
    <>
      <Loader open={open} />
      <section className="">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <TitleComp title="Review" />
            </div>
            <Form
              className="bg-white shadow my-3 p-3 rounded-3"
              onSubmit={handleSubmit}
            >
              <div className="row align-items-center">
                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="" className="fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="">Upload</label>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="" className="fw-bold">
                      Profession
                    </label>
                    <input
                      type="text"
                      value={job}
                      onChange={(e) => setjob(e.target.value)}
                      className="form-control"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-12">
                  <FormGroup>
                    <label htmlFor="" className="fw-bold">
                      Description
                    </label>
                    <textarea
                      type="text"
                      value={desc}
                      rows={3}
                      onChange={(e) => setdesc(e.target.value)}
                      className="form-control w-100"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <button className="btn bg-success mt-3 text-white">
                    Submit
                  </button>
                </div>
              </div>
            </Form>

            <div className="col-md-12">
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
        </div>
      </section>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form className="" onSubmit={handleUpdate}>
            <div className="row align-items-center gy-3">
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="" className="fw-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="">Upload</label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="" className="fw-bold">
                    Profession
                  </label>
                  <input
                    type="text"
                    value={job}
                    onChange={(e) => setjob(e.target.value)}
                    className="form-control"
                  />
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="" className="fw-bold">
                    Description
                  </label>
                  <textarea
                    type="text"
                    value={desc}
                    rows={3}
                    onChange={(e) => setdesc(e.target.value)}
                    className="form-control w-100"
                  />
                </FormGroup>
              </div>
              <div className="col-md-12">
                <button className="btn bg-success mt-3 text-white">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Review;
