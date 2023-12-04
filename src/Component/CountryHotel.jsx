import React, { useEffect, useState } from "react";
import TitleComp from "./TitleComp";
import { Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import { useLocation, useParams } from "react-router-dom";
import Loader from "./Loader";

function CountryHotel() {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [country, setCountry] = useState("");
  const [nightstay, setNightstay] = useState(0);
  const [review, setReview] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [allcountry, setallcountry] = useState([]);
  const [file, setFile] = useState(null);
  const [countrydata, setcountrydata] = useState([]);

  const location = useLocation();

  const getallcountries = () => {
    axios.get(`${BASEURL}/allcountry`, { headers }).then((res) => {
      setallcountry(res.data);
    });
  };

  const edit = location.pathname == `/countryhotel/${id}`;

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const handleSubmit = (e) => {
    setOpen(true);
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", name);

    // formdata.append("file", file);

    formdata.append("rating", review);

    // formdata.append("country", country);

    formdata.append("night_stay", nightstay);
    formdata.append("price", price);

    if (file) {
      formdata.append("image", file);
    }
    

    if (country) {
      formdata.append("country", country);
    }

    hoteldata.forEach((hotel, index) => {
      formdata.append(`hotelabout[${index}][name]`, hotel.name);
    });

    // Append diningdata to formdata
    diningdata.forEach((dining, index) => {
      formdata.append(`dining[${index}][name]`, dining.name);
    });

    if (edit) {
      axios
        .put(`${BASEURL}/updatehotels/${id}`, formdata, { headers })
        .then((res) => {
          console.log(res);
          if (res.status == 200 || res.statusText == "OK") {
            alert("Data Submit Successfully");
            setOpen(false);
          }
        })
        .catch((err) => {
          setOpen(false);
          console.log(setOpen(false));
        });
    } else {
      axios
        .post(`${BASEURL}/hotels`, formdata, { headers })
        .then((res) => {
          console.log(res);
          if (res.status == 200 || res.statusText == "OK") {
            alert("Data Submit Successfully");
            setOpen(false);
          }
        })
        .catch((err) => {
          setOpen(false);
          console.log(setOpen(false));
        });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    getallcountries();
    if (id) {
      getdataid();
    }
  }, [id]);

  const getdataid = () => {
    axios.get(`${BASEURL}/hotels/${id}`, { headers }).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
      setCountry(res.data?.hoteldetail?._id);
      setPrice(res.data.price);
      setNightstay(res.data.night_stay);
      sethoteldata(
        res.data.hotelabout.map((item) => {
          return item;
        })
      );
      setReview(res.data.rating);

      // Append diningdata to formdata
      setdiningdata(
        res.data.dining.map((item) => {
          return item;
        })
      );
    });
  };

  const [hoteldata, sethoteldata] = useState([]);
  const [diningdata, setdiningdata] = useState([]);

  const addHotelAboutField = () => {
    sethoteldata([...hoteldata, { name: "" }]);
  };

  const handleHotelAboutChange = (index, value) => {
    const updatedData = [...hoteldata]; // Change 'countrydata' to 'hoteldata'
    updatedData[index].name = value;
    sethoteldata(updatedData);
  };

  const removeHotelAboutField = (index) => {
    const updatedData = [...hoteldata]; // Change 'countrydata' to 'hoteldata'
    updatedData.splice(index, 1);
    sethoteldata(updatedData);
  };

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

  return (
    <>
      <Loader open={open} />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <TitleComp title="Country Hotels" />
            </div>
          </div>
          <Form
            className="bg-white shadow p-3 rounded-3"
            onSubmit={handleSubmit}
          >
            <div className="row ">
              <div className="col-md-4 mb-3">
                <FormGroup>
                  <label htmlFor="">Select Country</label>
                  <select
                    name=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control form-select"
                    id=""
                  >
                    <option className="d-none">Select Country</option>
                    {allcountry.map((item) => {
                      return (
                        <>
                          <option value={item._id}>{item.name}</option>
                        </>
                      );
                    })}
                  </select>
                </FormGroup>
              </div>
              <div className="col-md-12">
                <div className="row gy-3">
                  {/* <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        className="form-control"
                      />
                    </FormGroup>
                  </div> */}
                  <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Name</label>
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
                      <label htmlFor="">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Nightstay</label>
                      <input
                        type="number"
                        value={nightstay}
                        onChange={(e) => setNightstay(e.target.value)}
                        className="form-control"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Review</label>
                      <input
                        type="number"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="form-control"
                      />
                    </FormGroup>
                  </div>
                  {/* <div className="col-md-4">
                    <FormGroup>
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      />
                    </FormGroup>
                  </div> */}
                  {/* HotelAbout Fields */}

                  <div className="col-md-6">
                    <FormGroup>
                      <label htmlFor="">HotelAbout</label>
                      {hoteldata.map((hotel, index) => (
                        <div key={index} className="input-group mb-3">
                          <input
                            type="text"
                            value={hotel.name}
                            onChange={(e) =>
                              handleHotelAboutChange(index, e.target.value)
                            }
                            className="form-control"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => removeHotelAboutField(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={addHotelAboutField}
                      >
                        Add HotelAbout Field
                      </button>
                    </FormGroup>
                  </div>
                  {/* DiningDetail Fields */}
                  <div className="col-md-6">
                    <FormGroup>
                      <label htmlFor="">Extra Activity</label>
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
                  <div className="col-md-">
                    <button className="btn bg-success mt-3 text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default CountryHotel;
