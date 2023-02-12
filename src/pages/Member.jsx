import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMember from "../components/CardMember";

const Member = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(20); //set berapa data yang ingin ditampilkan

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(`/data-member`, {
        headers: {
          APPTOKEN: "interviewtoken",
        },
      })
      .then((response) => {
        setItems(response.data.DATA);
      });
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 20); // tambah data after scrolling
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="member">
      <h1 className="m__title">Data Member</h1>
      <CardMember member={items} visibleItems={visibleItems} />
    </div>
  );
};

export default Member;
