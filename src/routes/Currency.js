import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Currency.css";

export const Currency = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({
    name: "",
    symbol: "",
    rank: "",
    price_usd: "",
    price_btc: "",
   
  });

  useEffect(() => {
    Axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`)
      .then((response) => {
        const data = response.data[0];
        setCoin({
          name: data.name,
          symbol: data.symbol,
          rank: data.rank,
          price_usd: data.price_usd,
          price_btc: data.price_btc,
     
         
        });
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, [id]);

  return (
    <div className="container">
      <h1 className="title">Currency Information</h1>
      <p className="info">
        <span>Name:</span> {coin.name}
      </p>
      <p className="info">
        <span>Symbol:</span> {coin.symbol}
      </p>
      <p className="info">
        <span>Rank:</span> {coin.rank}
      </p>
      <p className="info">
        <span>Price (USD):</span> ${coin.price_usd}
      </p>
      <p className="info">
        <span>Price (BTC):</span> {coin.price_btc}
      </p>
    </div>
  );
};
