import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Show from "../../components/show/Show";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./style.scss";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const { resData, error, loading } = useFetch("/api/movie/getmovies");

  return (
    <>
      <Header />

      <div className="homeContainer">
        <div className="home">
          {loading ? (
            <div className="loadingContainer">
              <Loader />
            </div>
          ) : (
            <>
              <h1>
                Availaible <span>Movies</span>
              </h1>
              <ul className="moviesContainer">
                {resData?.data?.movies.map((i) => {
                  return <Show key={i._id} data={i} />;
                })}
              </ul>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
