import React from "react";
import { Link } from "react-router-dom";

const CardMember = ({ member, visibleItems }) => {
  return (
    <>
      {member.slice(0, visibleItems).map((item, index) => {
        return (
          <>
            <div className="card" key={index}>
              <h2>{index + 1}</h2>
              <h2>{item.first_name}</h2>
              <h2>{item.lastname}</h2>
            </div>
          </>
        );
      })}
      <Link to="/" className="button">
        Kembali
      </Link>
    </>
  );
};

export default CardMember;
