import React from "react";

const CardGenres = ({ genres, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="load">Loading....</div>
      ) : (
        <>
          {genres.map((item, index) => (
            <div className="cards" key={index}>
              <div className="cards-top">
                <img src={item.images_novel} alt="" />
              </div>
              <div className="cards-body">
                <p>{item.genres[0].name}</p>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default CardGenres;
