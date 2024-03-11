import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import AddShow from "./pages/addShow/AddShow";
import SeatsPage from "./pages/seatsPage/SeatsPage";
import AdminLogin from "./pages/login/AdminLogin";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import AddTheatre from "./pages/addTheatre/AddTheatre";
import MovieShows from "./pages/movieShows/MovieShows";
import Admin from "./pages/admin/Admin";
import AddMovie from "./pages/addMovie/AddMovie";
import FavoriteShows from "./pages/favoriteShows/FavoriteShows";
import Checkout from "./pages/checkoutPage/Checkout";
import AdminMovies from "./pages/adminMovies/AdminMovies";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/addshow" element={<AddShow />} />
        <Route path="/showdetails/:movieId" element={<MovieDetails />} />
        <Route path="/admin/addtheatre" element={<AddTheatre />} />
        <Route path="movieshows/:movieName" element={<MovieShows />} />
        <Route path="/seats/:theatreName/:showId" element={<SeatsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addmovie" element={<AddMovie />} />
        <Route path="/savedmovies" element={<FavoriteShows />} />
        {/* <Route path="/admin/movies" element={<AdminMovies />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
