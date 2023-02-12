import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaction = () => {
  const [harga, setHarga] = useState();
  const [saldo, setSaldo] = useState();
  const [newSaldo, setNewSaldo] = useState();
  const [barangs, setBarangs] = useState([]);
  const [members, setMembers] = useState([]);

  const loadTransaction = async () => {
    await axios
      .get(`/transaksi-user`, {
        headers: {
          APPTOKEN: "interviewtoken",
        },
      })
      .then((response) => {
        const barang = response.data.DATA.barang_detail;
        const member = response.data.DATA.member;
        const harga = barang.harga;
        const disc = barang.diskon_percent;
        const saldo = member.saldo;

        const newDisc = disc.replace(/%/g, "");
        const double = newDisc.replace(/,/g, ".");
        const parse = parseFloat(double);
        const diskon = harga * (parse / 100);
        const hasil = harga - diskon;
        const newSaldo = saldo - hasil;

        setNewSaldo(newSaldo.toLocaleString());
        setSaldo(saldo.toLocaleString());
        setHarga(hasil.toLocaleString());
        setBarangs(barang);
        setMembers(member);
        console.log(barang);
      });
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <div className="ts">
      <div className="cards">
        <div className="cards-top">
          <img src={barangs.thumbnail} alt="" />
        </div>
        <div className="cards-body">
          <h2>{barangs.nama}</h2>
          <h4>
            Harga : Rp.<del>{barangs.harga}</del> {harga}
          </h4>
          <h4>Saldo : Rp. {saldo}</h4>
        </div>
      </div>
      <br />
      <h1>Sisa Saldo Anda : Rp. {newSaldo}</h1>
      <br />
      <Link to="/" className="button">
        Kembali
      </Link>
    </div>
  );
};

export default Transaction;
