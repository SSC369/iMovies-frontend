import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import "./style.scss";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { v4 } from "uuid";
import { render } from "../../host";
const Profile = () => {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  const [loading, setLoading] = useState(true);

  const getBookingsData = async () => {
    try {
      const host = `${render}/api/bookings/getbookings`;
      const jwtToken = Cookies.get("jwtToken");
      const { data } = await axios.get(host, {
        headers: {
          "auth-token": jwtToken,
        },
      });
      if (data.status) {
        setBookings(data.bookings);
        setLoading(false);
      } else {
        alert("Something went Wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookingsData();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="profileContainer">
          <h1>Your Bookings</h1>
          <ul className="bookings">
            {bookings?.map((b) => {
              const {
                bookingId,
                media,
                movieName,
                showdate,
                showtime,
                theatreName,
                ticketsData,
              } = b;
              let price = 0;
              let { balcony, middle, lower } = ticketsData;
              price += balcony.total + middle.total + lower.total;
              balcony = Object.keys(balcony);
              middle = Object.keys(middle);
              lower = Object.keys(lower);
              function isNumber(str) {
                // Using regular expression to check if the string consists only of digits or is a valid float
                return /^\d+(\.\d+)?$/.test(str);
              }

              return (
                <li className="booking" key={bookingId}>
                  <div className="mediaImage">
                    <img src={media} />
                  </div>

                  <div className="col">
                    <div className="row">
                      <span>Movie:</span>
                      <p>{movieName}</p>
                    </div>
                    <div className="row">
                      <span>Theatre:</span>
                      <p>{theatreName}</p>
                    </div>
                    <div className="row">
                      <span>Showdate:</span>
                      <p>{dayjs(showdate).format("MMM D, YYYY")}</p>
                    </div>

                    <div className="row">
                      <span>showtime:</span>
                      <p>{showtime}</p>
                    </div>

                    <div className="ticketsContainer">
                      {balcony.length > 0 && isNumber(balcony[0]) && (
                        <div className="tickets">
                          <span>Balcony Seats:</span>
                          <ul>
                            {balcony.map((e) => {
                              return <li key={v4()}>{isNumber(e) && e}</li>;
                            })}
                          </ul>
                        </div>
                      )}

                      {middle.length && isNumber(middle[0]) > 0 && (
                        <div className="tickets">
                          <span>Middle Seats:</span>
                          <ul>
                            {middle.map((e) => {
                              return <li key={v4()}>{isNumber(e) && e}</li>;
                            })}
                          </ul>
                        </div>
                      )}

                      {lower.length > 0 && isNumber(lower[0]) && (
                        <div className="tickets">
                          <span>Lower Seats:</span>
                          <ul>
                            {lower.map((e) => {
                              return <li key={v4()}>{isNumber(e) && e}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <span>Total Price:</span>
                      <p>{price}₹</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
