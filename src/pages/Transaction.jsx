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

        setBarangs(barang);
        setMembers(member);
        console.log(response.data.DATA);
      });
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const harga = barangs.harga;
    const disc = barangs.diskon_percent;
    const saldo = members.saldo;

    const newDisc = disc.replace(/%/g, "");
    const double = newDisc.replace(/,/g, ".");
    const parse = parseFloat(double);
    const diskon = harga * (parse / 100);
    const hasil = harga - diskon;
    const newSaldo = saldo - hasil;

    setNewSaldo(newSaldo.toLocaleString());
    setSaldo(saldo.toLocaleString());
    setHarga("Rp." + hasil.toLocaleString());
  };

  return (
    <div className="ts">
      <form onSubmit={handleSubmit} className="ts_form">
        <h1 className="ts_title">Transaksi</h1>
        <div className="ts_formInput">
          <label htmlFor="">Judul : </label>
          <input type="text" value={barangs.nama} />
        </div>
        <div className="ts_formInput">
          <label htmlFor="">Harga</label>
          <input type="text" value={barangs.harga} />
        </div>
        <div className="ts_formInput">
          <label htmlFor="">Diskon</label>
          <input type="text" value={barangs.diskon_percent} />
        </div>
        <button>Hitung</button>
      </form>
      <div className="cards">
        <div className="cards-top">
          <img src={barangs.thumbnail} alt="" />
        </div>
        <div className="cards-body">
          <h2>Judul : {barangs.nama}</h2>
          <h2>Harga yang harus dibayarkan : </h2>
          <h2>{harga}</h2>
        </div>
      </div>
      <Link to="/" className="button">
        Kembali
      </Link>
    </div>
  );
};

export default Transaction;
