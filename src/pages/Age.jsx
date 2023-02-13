import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Age = () => {
  const [members, setMembers] = useState([]);

  //function untuk menghitung umur saat ini
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const fetchData = async () => {
    await axios
      .get(`/data-member`, {
        headers: {
          APPTOKEN: "interviewtoken",
        },
      })
      .then((response) => {
        //function untuk menambahkan perhitungan umur saat ini pada api data members
        const newMembers = response.data.DATA;
        newMembers.forEach((item) => {
          item.umur = getAge(item.dob);
        });
        setMembers(newMembers);
      });
    console.log(members);
  };

  const remaja = members.filter((data) => {
    return data.umur >= 1 && data.umur <= 20;
  });

  const dewasa = members.filter((data) => {
    return data.umur >= 21 && data.umur <= 40;
  });

  const lansia = members.filter((data) => {
    return data.umur >= 41 && data.umur <= 60;
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="ages">
        <div className="a__card">
          <h2>Jumlah Rata-Rata Range Umur</h2>
          <h3>Usia 1-20 : {remaja.length}</h3>
          <h3>Usia 21-40 : {dewasa.length}</h3>
          <h3>Usia 41-60 : {lansia.length}</h3>
          <h3>Total : {members.length} Members</h3>
        </div>
        <Link to="/" className="button">
          Kembali
        </Link>
      </div>
    </>
  );
};

export default Age;
