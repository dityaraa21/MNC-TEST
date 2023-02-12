import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardGenres from "../components/CardGenres";

const Genres = () => {
  const [genre, setGenre] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "/list-content",
        {
          limit: 10,
          offset: 0,
        },
        {
          headers: {
            APPTOKEN: "interviewtoken",
          },
        }
      );
      console.log(response.data.DATA);
      setGenre(response.data.DATA);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="genres">
        <CardGenres genres={genre} />
      </div>
      <div className="g_foot">
        <Link to="/" className="button">
          Kembali
        </Link>
      </div>
    </>
  );
};

export default Genres;
