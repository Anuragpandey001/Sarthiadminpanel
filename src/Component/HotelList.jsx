import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import TitleComp from "./TitleComp";
import { useNavigate } from "react-router-dom";

function HotelList() {
  const [countrydata, setcountrydata] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const allcountrydata = () => {
    axios.get(`${BASEURL}/allhotels`, { headers }).then((res) => {
      console.log(res.data);
      setcountrydata(res.data);
    });
  };

  const getRowId = (resident) => resident._id;

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
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <button
            onClick={() => navigate(`/countryhotel/${id}`)}
            className="btn"
          >
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

  const handleDelete = (id) => {
    axios.delete(`${BASEURL}/hotels/${id}`).then((res) => {
      alert("delete Data Succesffully");
      allcountrydata();
    });
  };

  useEffect(() => {
    allcountrydata();
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <TitleComp title="Hotels List" />
            </div>
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
        </div>
      </section>
    </>
  );
}

export default HotelList;
