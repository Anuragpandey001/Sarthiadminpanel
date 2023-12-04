import React, { useEffect, useState } from "react";
import Sidebaar from "../Component/Sidebaar";
import TitleComp from "../Component/TitleComp";
import { BASEURL } from "../BaseUrl";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Component/Loader";

function Visa() {
  const [visas, setVisas] = useState([]);
  const [open, setopen] = useState(false);
  const [id, setid] = useState("");
  const [formData, setFormData] = useState({
    country: "",
  });

  const headers = {
    "Content-Type": "application/json",
  };
  useEffect(() => {
    // Fetch all Visas when the component mounts
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const response = await axios.get(`${BASEURL}/visas`);
      setVisas(response.data);
    } catch (error) {
      console.error("Error fetching Visas:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setopen(true);

    try {
      // Conditionally choose between PUT and POST based on the presence of id
      const response = await axios({
        method: id ? "put" : "post",
        url: id ? `${BASEURL}/visas/${id}` : `${BASEURL}/visas`,
        data: formData,
        headers: headers,
      });

      fetchVisas();

      // Check if the response is not null (assuming you want to check for success)
      if (response.data != null) {
        setopen(false);
      }
    } catch (error) {
      console.error("Error submitting Visa form:", error);
    }
  };

  const columns = [
    {
      field: "country",
      headerName: "Country",
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

  const handleShow = (id) => {
    setid(id);
  };
  const handleEdit = () => {
    axios
      .get(`${BASEURL}/visas/${id}`, { headers })
      .then((res) => {
        const editedData = res.data;
        setFormData({
          ...formData,
          country: editedData.country,
          // Add other fields as needed
        });
      })
      .catch((error) => {
        console.error("Error fetching Visa data for edit:", error);
      });
  };
  const handleDelete = (id) => {
    axios.delete(`${BASEURL}/visas/${id}`).then((res) => {
      alert("delete Data Succesffully");
      fetchVisas();
    });
  };

  useEffect(() => {
    if (id) {
      handleEdit();
    }
  }, [id]);

  const getRowId = (resident) => resident._id;

  return (
    <>
      <Loader open={open} />
      <Sidebaar
        content={
          <>
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <TitleComp title="Visa" />
                  </div>
                  <div className="col-md-12">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Country:</label>
                            <input
                              type="text"
                              name="country"
                              className="form-control"
                              value={formData.country}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <button
                              type="submit"
                              className="btn bg-blue text-white mt-4"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="col-md-12 mt-3">
                      {visas.length > 0 ? (
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={visas}
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
              </div>
            </section>
          </>
        }
      />
    </>
  );
}

export default Visa;
