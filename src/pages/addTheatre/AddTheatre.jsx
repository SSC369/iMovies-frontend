import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 } from "uuid";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import { render } from "../../host";

const AddTheatre = () => {
  const [theatreDetails, setTheatreDetails] = useState({
    theatreName: "",
    location: "",
    balconySeatPrice: 0,
    middleSeatPrice: 0,
    lowerSeatPrice: 0,
    balconySeats: 0,
    middleSeats: 0,
    lowerSeats: 0,
  });

  const handleChange = (e) => {
    setTheatreDetails({ ...theatreDetails, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const validation = () => {
    const {
      theatreName,
      location,
      balconySeatPrice,
      middleSeatPrice,
      lowerSeatPrice,
      balconySeats,
      middleSeats,
      lowerSeats,
    } = theatreDetails;
    if (theatreName === "") {
      toast.error("Enter theatre name!", toastOptions);
      return false;
    } else if (location === "") {
      toast.error("Enter theatre location!", toastOptions);
      return false;
    } else if (balconySeatPrice === 0) {
      toast.error("Enter balcony seat price!", toastOptions);
      return false;
    } else if (middleSeatPrice === 0) {
      toast.error("Enter middle seat price!", toastOptions);
      return false;
    } else if (lowerSeatPrice === 0) {
      toast.error("Enter lower seat price!", toastOptions);
      return false;
    } else if (balconySeats === 0) {
      toast.error("Enter no.of balcony seats!", toastOptions);
      return false;
    } else if (lowerSeats === 0) {
      toast.error("Enter no.of lower seats !", toastOptions);
      return false;
    } else if (middleSeats === 0) {
      toast.error("Enter no.of middle seats!", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const host = `${render}/api/theatre/addtheatre`;
        const jwtToken = Cookies.get("adminJwtToken");
        const res = await axios.post(
          host,
          {
            theatreId: v4(),
            ...theatreDetails,
          },
          {
            headers: {
              "auth-token": jwtToken,
            },
          }
        );

        const { status, msg } = res.data;
        setTheatreDetails({
          theatreName: "",
          location: "",
          balconySeatPrice: 0,
          middleSeatPrice: 0,
          lowerSeatPrice: 0,
          balconySeats: 0,
          middleSeats: 0,
          lowerSeats: 0,
        });
        if (status === true) {
          toast.success(msg, toastOptions);
        } else {
          toast.error(msg, toastOptions);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="theatreContainer">
        <form onSubmit={handleSubmit} className="formContainer">
          <h1>Add Theatre</h1>
          <div className="inputContainer">
            <label htmlFor="name">Theatre Name</label>
            <input
              onChange={handleChange}
              value={theatreDetails.theatreName}
              id="name"
              name="theatreName"
              type="text"
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="location">Theatre Location</label>
            <input
              onChange={handleChange}
              value={theatreDetails.location}
              name="location"
              id="location"
              type="text"
            />
          </div>

          <div className="inputSeatsContainer">
            <div>
              <label htmlFor="balconyPrice">Balcony Seat Price</label>
              <input
                onChange={handleChange}
                value={theatreDetails.balconySeatPrice}
                name="balconySeatPrice"
                id="balconyPrice"
                type="number"
              />
            </div>

            <div>
              <label htmlFor="balconySeats">Balcony Seat Count</label>
              <input
                onChange={handleChange}
                value={theatreDetails.balconySeats}
                id="balconySeats"
                name="balconySeats"
                type="number"
              />
            </div>
          </div>

          <div className="inputSeatsContainer">
            <div>
              <label htmlFor="middlePrice">Middle Seat Price</label>
              <input
                onChange={handleChange}
                value={theatreDetails.middleSeatPrice}
                id="middlePrice"
                name="middleSeatPrice"
                type="number"
              />
            </div>

            <div>
              <label htmlFor="middleSeats">Middle Seat Count</label>
              <input
                onChange={handleChange}
                value={theatreDetails.middleSeats}
                name="middleSeats"
                id="middleSeats"
                type="number"
              />
            </div>
          </div>

          <div className="inputSeatsContainer">
            <div>
              <label htmlFor="lowerPrice">Lower Seat Price</label>
              <input
                onChange={handleChange}
                value={theatreDetails.lowerSeatPrice}
                name="lowerSeatPrice"
                id="lowerPrice"
                type="number"
              />
            </div>

            <div>
              <label htmlFor="lowerSeats">Lower Seat Count</label>
              <input
                onChange={handleChange}
                value={theatreDetails.lowerSeats}
                name="lowerSeats"
                id="lowerSeats"
                type="number"
              />
            </div>
          </div>

          <button>Submit</button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default AddTheatre;
