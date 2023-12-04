import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { BASEURL } from "../BaseUrl";
import TitleComp from "../Component/TitleComp";
import Sidebaar from "../Component/Sidebaar";

function Booking() {
  const [countrydata, setcountrydata] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const allcountrydata = () => {
    axios.get(`${BASEURL}/bookings`, { headers }).then((res) => {
      console.log(res.data);
      setcountrydata(res.data?.reverse());
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
      field: "comes",
      headerName: "Comes",
      flex: 1,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
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
    axios.delete(`${BASEURL}/bookings/${id}`).then((res) => {
      alert("delete Data Succesffully");
      allcountrydata();
    });
  };

  useEffect(() => {
    allcountrydata();
  }, []);
  return (
    <Sidebaar
      content={
        <>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <TitleComp title="Booking List" />
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
      }
    />
  );
}

export default Booking;
