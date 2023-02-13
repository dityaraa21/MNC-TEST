import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardGenres from "../components/CardGenres";

const Genres = () => {
  const [genre, setGenre] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "/list-content",
        {
          limit: limit,
          offset: offset,
        },
        {
          headers: {
            APPTOKEN: "interviewtoken",
          },
        }
      );
      console.log(response.data.DATA);
      setGenre(genre.concat(response.data.DATA));
      setOffset(offset + limit);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const handleLoadMore = () => {
    fetchData();
  };

  return (
    <>
      <h1 className="genres_title">List Content</h1>
      <div className="genres">
        <CardGenres isLoading={isLoading} genres={genre} />
      </div>
      <div className="g_foot">
        <button className="button" onClick={handleLoadMore}>
          Load More
        </button>
        <Link to="/" className="button">
          Kembali
        </Link>
      </div>
    </>
  );
};

export default Genres;
