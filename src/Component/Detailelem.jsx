import React, { useEffect, useState } from "react";
import TitleComp from "./TitleComp";
import { Form, FormGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "./Loader";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function Detailelem() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [hoteldata, sethoteldata] = useState([]);
  const [detaildata, setdetaildata] = useState([]);

  const [hotel, sethotel] = useState("");
  const [amenities, setAmenities] = useState([
    { name: "" }, // Initial row
  ]);

  const headers = {
    "Content-Type": "application/json",
  };

  const [id, setid] = useState("");

  const [show, setShow] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files);

    setSelectedImages([...selectedImages, ...imageArray]);
  };

  const handleClose = () => {
    // setShow(false);
    // setid("");
    // setTitle("");
    // setDescription("");
    // setdiningdata([]);
  };
  const handleShow = (id) => {
    // setShow(true);
    setid(id);
  };

  const addAmenityRow = (e) => {
    e.preventDefault();
    const newAmenity = { name: "", description: "", image: "" };
    setAmenities([...amenities, newAmenity]);
  };

  const handleAmenityChange = (index, field, value) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index][field] = value;
    setAmenities(updatedAmenities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    let formdata = new FormData();
    formdata.append("name", title);
    formdata.append("description", description);
    formdata.append("hotels", hotel);

    diningdata.forEach((dining, index) => {
      formdata.append(`amenities[${index}][name]`, dining.name);
    });
    titledata.forEach((title, index) => {
      formdata.append(`amenities[${index}][title]`, title.title);
    });
    notesdata.forEach((note, index) => {
      formdata.append(`amenities[${index}][notes]`, note.notes);
    });

    axios
      .post(`${BASEURL}/hoteldetail`, formdata, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 200 || res.statusText == "OK") {
          alert("Data Submit Successfully");
          setOpen(false);
          detaildata();
        }
      })
      .catch((err) => {
        setOpen(false);
        console.log(setOpen(false));
      });
  };

  const allcountrydata = () => {
    axios.get(`${BASEURL}/allhotels`, { headers }).then((res) => {
      console.log(res.data);
      sethoteldata(res.data);
    });
  };
  const alldetdata = () => {
    axios.get(`${BASEURL}/allhotelsdetail`, { headers }).then((res) => {
      console.log(res.data);
      setdetaildata(res.data);
    });
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "description",
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

  const getRowId = (resident) => resident._id;

  useEffect(() => {
    allcountrydata();
    alldetdata();
  }, []);

  useEffect(() => {
    if (id) {
      handleEdit();
    }
  }, [id]);

  const handleEdit = () => {
    axios.get(`${BASEURL}/hotelsdetail/${id}`, { headers }).then((res) => {
      setTitle(res.data.name);
      setDescription(res.data.description);
      setdiningdata(
        res.data.amenities.map((item) => {
          return item;
        })
      );
      settitledata(
        res.data.amenities.map((item) => {
          return item;
        })
      );
      setnotesdata(
        res.data.amenities.map((item) => {
          return item;
        })
      );

      // console.log(res.data.name);
    });
  };
  const handleDelete = (id) => {
    axios.delete(`${BASEURL}/hotelsdetail/${id}`).then((res) => {
      alert("delete Data Succesffully");
      alldetdata();
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setOpen(true);
    let formdata = new FormData();
    formdata.append("name", title);
    formdata.append("description", description);

    diningdata.forEach((dining, index) => {
      formdata.append(`amenities[${index}][name]`, dining.name);
    });
    titledata.forEach((title, index) => {
      formdata.append(`amenities[${index}][title]`, title.title);
    });
    notesdata.forEach((note, index) => {
      formdata.append(`amenities[${index}][notes]`, note.notes);
    });

    axios
      .put(`${BASEURL}/updatehoteldetail/${id}`, formdata, { headers })
      .then((res) => {
        console.log(res);
        alldetdata();
        handleClose();
        if (res.status == 200 || res.statusText == "OK") {
          alert("Data Submit Successfully");
          setOpen(false);
          detaildata();
        }
      })
      .catch((err) => {
        setOpen(false);
        console.log(setOpen(false));
      });
  };

  const [diningdata, setdiningdata] = useState([]);
  const [videodata, setvideodata] = useState([]);
  const [titledata, settitledata] = useState([]);
  const [notesdata, setnotesdata] = useState([]);

  const addDiningDetailField = () => {
    setdiningdata([...diningdata, { name: "" }]);
  };

  const handleDiningDetailChange = (index, value) => {
    const updatedData = [...diningdata];
    updatedData[index].name = value;
    setdiningdata(updatedData);
  };

  const removeDiningDetailField = (index) => {
    const updatedData = [...diningdata];
    updatedData.splice(index, 1);
    setdiningdata(updatedData);
  };

  const addtitleField = () => {
    settitledata([...titledata, { title: "" }]);
  };

  const hanndeltitlechange = (index, value) => {
    const updatedData = [...titledata];
    updatedData[index].title = value;
    settitledata(updatedData);
  };

  const removetitlechange = (index) => {
    const updatedData = [...titledata];
    updatedData.splice(index, 1);
    settitledata(updatedData);
  };

  const addnotesField = () => {
    setnotesdata([...notesdata, { notes: "" }]);
  };

  const hanndelnoteschange = (index, value) => {
    const updatedData = [...notesdata];
    updatedData[index].notes = value;
    setnotesdata(updatedData);
  };

  const removenoteschange = (index) => {
    const updatedData = [...notesdata];
    updatedData.splice(index, 1);
    setnotesdata(updatedData);
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Loader open={open} />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <TitleComp title="Hotels Details" />
            </div>
          </div>
          <Form
            className="bg-white shadow p-3 rounded-3"
            onSubmit={id ? handleUpdate : handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <FormGroup>
                  <label htmlFor="">Select Hotel For Detail</label>
                  <select
                    name=""
                    value={hotel}
                    onChange={(e) => sethotel(e.target.value)}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" className="d-none">
                      Select Hotel
                    </option>
                    {hoteldata.map((item) => {
                      return (
                        <>
                          <option value={item._id}>{item.name}</option>
                        </>
                      );
                    })}
                  </select>
                </FormGroup>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div> */}

              <div className="col-md-12">
                <label htmlFor="description">Description:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data); // Change here, pass the string directly
                  }}
                  className="custom-ckeditor"
                />
              </div>

              <div className="row my-3">
                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="">Heading ?</label>
                    {titledata.map((item, index) => (
                      <div key={index} className="input-group mb-3">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            hanndeltitlechange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => removetitlechange(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={addtitleField}
                    >
                      Add Title
                    </button>
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="">Whats Included in this ?</label>
                    {diningdata.map((dining, index) => (
                      <div key={index} className="input-group mb-3">
                        <input
                          type="text"
                          value={dining.name}
                          onChange={(e) =>
                            handleDiningDetailChange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => removeDiningDetailField(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={addDiningDetailField}
                    >
                      Add DiningDetail Field
                    </button>
                  </FormGroup>
                </div>

                <div className="col-md-4">
                  <FormGroup>
                    <label htmlFor="">Notes ?</label>
                    {notesdata.map((item, index) => (
                      <div key={index} className="input-group mb-3">
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) =>
                            hanndelnoteschange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => removenoteschange(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={addnotesField}
                    >
                      Add Notes
                    </button>
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12">
                <button className="btn bg-blue text-white">Submit</button>
              </div>
            </div>
          </Form>

          <div className="col-md-12 mt-3">
            {detaildata.length > 0 ? (
              <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={detaildata}
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
                    Country Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                  />
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="">Upload</label>
                  <textarea
                    name=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id=""
                    className="w-100 form-control"
                    rows="5"
                  ></textarea>
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <label htmlFor="">Whats Included in this ?</label>
                  {diningdata.map((dining, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        value={dining.name}
                        onChange={(e) =>
                          handleDiningDetailChange(index, e.target.value)
                        }
                        className="form-control"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => removeDiningDetailField(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={addDiningDetailField}
                  >
                    Add DiningDetail Field
                  </button>
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

export default Detailelem;
