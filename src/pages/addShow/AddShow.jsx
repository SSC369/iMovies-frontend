import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import { IoIosAddCircleOutline } from "react-icons/io";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import "./style.scss";
const AddShow = () => {
  const [showDetails, setShowDetails] = useState({
    movieId: "",
    theatre: "",
    showtime: "",
    showdate: "",
  });
  const moviesData = useFetch(`/api/movie/getmovies`);
  const theatreData = useFetch(`/api/theatre/gettheatres`);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookie.get("adminJwtToken");
    if (!jwtToken) {
      navigate("/admin/login");
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    console.log(e.target.name);
    setShowDetails({ ...showDetails, [e.target.name]: val });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleValidation = () => {
    const { theatre, showtime, showdate, movieId } = showDetails;
    if (theatre === "") {
      toast.error("select theatre !", toastOptions);
      return false;
    } else if (showtime === "") {
      toast.error("Enter showtime of movie!", toastOptions);
      return false;
    } else if (showdate === "") {
      toast.error("Enter showdate of movie!", toastOptions);
      return false;
    } else if (movieId === "") {
      toast.error("Select Movie !", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(showDetails);
      try {
        const base = render;
        const host = `${base}/api/shows/addshow`;
        const jwtToken = Cookies.get("adminJwtToken");
        const res = await axios.post(
          host,
          {
            showId: v4(),
            ...showDetails,
          },
          {
            headers: {
              "auth-token": jwtToken,
            },
          }
        );

        const { status, msg } = res.data;
        // setShowDetails({
        //   theatre: "",
        //   showtime: "",
        //   showdate: "",
        //   movieId: "",
        // });

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

      {theatreData?.loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="addShow">
          <h1>Add Show</h1>
          <form onSubmit={handleSubmit} className="showDetailsForm">
            <h3>Show Details</h3>
            <div className="inputContainer">
              {theatreData?.resData?.data?.theatres.length > 0 ? (
                <>
                  <label htmlFor="theatre">Theatres</label>
                  <select
                    defaultValue=""
                    name="theatre"
                    onChange={handleChange}
                    id="theatre"
                  >
                    {theatreData?.resData?.data?.theatres.map((t) => {
                      const theatreName =
                        t.theatreName[0].toUpperCase() + t.theatreName.slice(1);
                      return (
                        <option value={t.theatreName} key={t.theatreId}>
                          {theatreName}
                        </option>
                      );
                    })}
                    <option value="">Select Theatre</option>
                  </select>
                </>
              ) : (
                <div onClick={() => navigate("/admin/addtheatre")}>
                  <p>Add Theatre</p>
                  <span>
                    <IoIosAddCircleOutline />
                  </span>
                </div>
              )}
            </div>

            <div className="inputContainer">
              {moviesData?.resData?.data?.movies.length > 0 ? (
                <>
                  <label htmlFor="movies">Movies</label>
                  <select
                    defaultValue=""
                    name="movieId"
                    onChange={handleChange}
                    id="movies"
                  >
                    {moviesData?.resData?.data?.movies.map((m) => {
                      const movieName =
                        m.movieName[0].toUpperCase() + m.movieName.slice(1);
                      return (
                        <option value={m.movieId} key={m.movieId}>
                          {movieName}
                        </option>
                      );
                    })}
                    <option value="">Select Movie</option>
                  </select>
                </>
              ) : (
                <div onClick={() => navigate("/admin/addmovie")}>
                  <p>Add Movie</p>
                  <span>
                    <IoIosAddCircleOutline />
                  </span>
                </div>
              )}
            </div>

            <div className="inputContainer">
              <label htmlFor="showdate">Show Date</label>
              <input
                onChange={handleChange}
                name="showdate"
                type="date"
                id="showdate"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="showtime">Showtime</label>
              <input
                onChange={handleChange}
                name="showtime"
                type="time"
                id="showtime"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default AddShow;
