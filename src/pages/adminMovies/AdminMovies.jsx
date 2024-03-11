import React, { useState } from "react";
import "./style.scss";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Loader from "../../components/loader/Loader";

const AdminMovies = () => {
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <AdminHeader />
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="moviesContainer"></div>
      )}
    </>
  );
};

export default AdminMovies;
