import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/fetchApi";

const useFetch = (url) => {
  const [resData, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);
  return { resData, loading, error };
};

export default useFetch;
