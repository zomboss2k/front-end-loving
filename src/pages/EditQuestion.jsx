import React, { useEffect, useState } from "react";
import "./admin/pages/new/new.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { updateRoute, getProfileUser } from "../utils/APIRoutes";
import styled from "styled-components";

const EditQuestion = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (
        !localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "dating")
      ) {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const { fullName, ques1, ques2, ques3, ques4, ques5, ques6 } = userProfile;

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const getAllUser = async () => {
      const data = await axios.get(`${getProfileUser}/` + id);
      setUserProfile(data.data.users);
    };
    getAllUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userProfile) {
      const { data } = await axios.post(`${updateRoute}/` + id, userProfile);
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY || "dating",
        JSON.stringify(data.user)
      );
      window.location.href = "/";
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      <Container>
        <div className="container">
          <div className="new" style={{ backgroundColor: "#0d0d30" }}>
            <div className="newContainer">
              <div className="top">
                <h1 style={{ color: "#fff" }}>
                  {title}
                  {fullName}
                </h1>
              </div>
              <div className="bottom" style={{ height: "27rem", zIndex: 10 }}>
                <div
                  className="right"
                  style={{ overflow: "auto", marginTop: "8vh" }}
                >
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="formInput">
                      <label>
                        Trong l??c y??u nhau, anh/em th??ch ???????c khen ng???i v?? ??i???u
                        g???
                      </label>
                      <input
                        type="text"
                        name="ques1"
                        placeholder="C??u h???i 1"
                        value={ques1 || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Nh???ng ??i???m x???u n??o m?? anh/em mu???n ???????c th??ng c???m?
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="ques2"
                        placeholder="C??u h???i 2"
                        required={true}
                        style={{ color: "#fff" }}
                        value={ques2 || ""}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Nh???ng ??i???m x???u n??o m?? anh/em kh??ng th??? ch???p nh???n ???????c?
                      </label>
                      <input
                        type="text"
                        name="ques3"
                        placeholder="C??u h???i 3"
                        value={ques3 || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        ???N???u ???????c g???p l???i ch??nh m??nh tr?????c l??c quen nhau, anh/em
                        s??? n??i g?? v??? m???i quan h??? n??y?
                      </label>
                      <input
                        type="text"
                        name="ques4"
                        placeholder="C??u h???i 4"
                        value={ques4 || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        ??i???u g?? v??? anh m?? anh ngh?? em ???? hi???u sai r???i?
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="ques5"
                        placeholder="C??u h???i 5"
                        required={true}
                        style={{ color: "#fff" }}
                        value={ques5 || ""}
                      />
                    </div>

                    <div className="formInput">
                      <label>
                        Em ngh?? anh n??n thay ?????i ??i???u g?? ????? m???i quan h??? n??y t???t
                        h??n?
                      </label>
                      <input
                        type="text"
                        name="ques6"
                        placeholder="C??u h???i 6"
                        value={ques6 || ""}
                        required={true}
                        style={{ color: "#fff" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <button color="info" type="back">
                      Home
                    </button>
                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  color: #fff;
  .container {
    width: 85vw;
    background-color: #00000076;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default EditQuestion;
