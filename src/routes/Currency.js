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
    percent_change_24h: "",
    percent_change_1h: "",
    percent_change_7d: "",
    market_cap_usd: "",
    volume24: "",
    volume24a: "",
    csupply: "",
    tsupply: "",
   
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
          percent_change_24h: data.percent_change_24h,
          percent_change_1h: data.percent_change_1h,
          percent_change_7d: data.percent_change_7d,
          market_cap_usd: data.market_cap_usd,
          volume24: data.volume24,
          volume24a: data.volume24a,
          csupply: data.csupply,
          tsupply: data.tsupply,
         
        });
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, [id]);

  const changeClass =
    coin.percent_change_24h >= 0 ? "highlight" : "negative";

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
      <p className={`info ${changeClass}`}>
        <span>24h Change:</span> {coin.percent_change_24h}%
      </p>
      <p className="info">
        <span>Market Cap (USD):</span> ${coin.market_cap_usd}
      </p>
      <p className="info">
        <span>Circulating Supply:</span> {coin.csupply}
      </p>
      <p className="info">
        <span>Total Supply:</span> {coin.tsupply}
      </p>
    </div>
  );
};
