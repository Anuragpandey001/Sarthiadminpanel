import React, { useState } from "react";
import travel from "../Image/travel.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../BaseUrl";

function Login() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let requestdata = {
      username: username,
      password: password,
    };
    axios.post(`${BASEURL}/login`, requestdata, { headers }).then((res) => {
      
    });
  };
  return (
    <section class="loginbg">
      <div class="container-fluid">
        <div
          class="align-items-center justify-content-center  row "
          style={{ height: "100vh" }}
        >
          <div class="col-md-8">
            <div
              class="align-items-center shadow bg-white m-3 pb-4 row"
              style={{ borderRadius: "30px", overflow: "hidden" }}
            >
              <div class="loginImg col-md-6">
                <img alt="hey" src={travel} class="img-fluid" />
              </div>
              <div class="col-md-4">
                <div class="">
                  <h3 class="outletheading text-center bg-green text-white rounded-2 p-2">
                    My Travel Sarthi
                  </h3>
                  <form class="login-form" onSubmit={(e) => handleSubmit(e)}>
                    <div class="d-flex align-items-center mt-2 mb-3 justify-content-center w-100"></div>
                    <div class="mt-3">
                      <label class="mb-1 fw-bold mb-2" for="name">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div class="mt-3">
                      <label class="mb-1 fw-bold mb-2" for="name">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <button
                      class="btn mt-3 auth_btn w-100 bg-blue text-white"
                      onClick={(e) => navigate("/country")}
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
