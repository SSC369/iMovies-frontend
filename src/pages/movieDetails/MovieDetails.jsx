import React, { useEffect, useState } from "react";
import "./style.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import Genres from "../../components/genres/Genres";
import axios from "axios";
import { render } from "../../host";

const MovieDetails = () => {
  const [liked, setLiked] = useState(false);

  const { movieId } = useParams();
  const { resData, loading, error } = useFetch(
    `/api/movie/getmoviedetails/${movieId}`
  );

  const getSavedMovies = async () => {
    const host = `${render}/api/favorite/getsavedmovies`;
    try {
      const jwtToken = Cookies.get("jwtToken");
      const { data } = await axios.get(host, {
        headers: {
          "auth-token": jwtToken,
        },
      });
      if (data?.status) {
        data?.favoriteMoviesData.forEach((m) => {
          if (m.movieId === movieId) {
            setLiked(true);
          }
        });
      } else {
        toast.error(data?.msg, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedMovies();
  }, []);

  const movieDetails = resData?.data?.movie;

  const genres = movieDetails?.genres.split(",");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleDislike = async (movieId) => {
    setLiked(false);
    try {
      const host = `${render}/api/favorite/unsavemovie/${movieId}`;
      const jwtToken = Cookies.get("jwtToken");
      const { data } = await axios.delete(host, {
        headers: {
          "auth-token": jwtToken,
        },
      });
      console.log(data);
      if (data?.status) {
        toast.success(data.msg, toastOptions);
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (movieId) => {
    setLiked(true);
    try {
      const host = `${render}/api/favorite/savemovie`;
      const jwtToken = Cookies.get("jwtToken");
      const { data } = await axios.post(
        host,
        { movieId },
        {
          headers: {
            "auth-token": jwtToken,
          },
        }
      );
      console.log(data);
      if (data?.status) {
        toast.success(data.msg, toastOptions);
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {!loading ? (
        <div className="movieDetailsContainer">
          <div className="detailsContainer">
            <div className="left">
              <img src={movieDetails?.media} />
            </div>
            <div className="right">
              <h4>{`${
                movieDetails?.movieName[0].toUpperCase() +
                movieDetails?.movieName.slice(1)
              } (${dayjs(movieDetails?.releaseDate).format("YYYY")})`}</h4>
              {!liked && (
                <button className="likeButton">
                  <MdOutlineFavoriteBorder
                    onClick={() => handleLike(movieDetails?.movieId)}
                  />
                </button>
              )}
              {liked && (
                <button className="likeButton">
                  <MdOutlineFavorite
                    color="crimson"
                    onClick={() => handleDislike(movieDetails?.movieId)}
                  />
                </button>
              )}

              <p>{movieDetails?.description}</p>
              <Genres data={genres} />

              <div className="runtimeContainer">
                <div>
                  <p className="releaseDate">Release Date:</p>
                  <span>
                    {dayjs(movieDetails?.releaseDate).format("MMM D, YYYY")}
                  </span>
                </div>
                <div>
                  <p className="releaseDate">Runtime:</p>
                  <span>{`${movieDetails?.runtime} Min`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`bookButtonContainer`}>
            <button type="button">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/movieshows/${movieDetails?.movieId}`}
              >
                Book Tickets
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="loadingContainer">
          <Loader />
        </div>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MovieDetails;
