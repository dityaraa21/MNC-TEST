import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to="/age" className="button">
        Tugas 1
      </Link>
      <Link to="/genres" className="button">
        Tugas 2
      </Link>
      <Link to="/transaction" className="button">
        Tugas 3
      </Link>
    </div>
  );
};

export default Home;
