import {useState, useEffect} from "react"
import '../App.css';
import Axios from "axios"
import {useNavigate} from "react-router-dom";

export const MainRoute=()=>{
        const[cryptoList, setcryptoList]=useState([]);
        useEffect(() => {
            Axios.get("https://api.coinlore.net/api/tickers/?start=0&limit=20")
              .then((response) => {
                setcryptoList(response.data["data"]);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          }, []);
          const navigate = useNavigate();
        return (
            <>
            <div className='Heading'>
            <h1>CryptoLand</h1>
          </div>
          <div className="cryptoList">
            {
              cryptoList.map((coin)=>{
                return(
                    <div key={coin.id} onClick={()=>{navigate(`/currency/${coin.id}`)}}>
                    <h1>{coin.name}</h1>
                    <h1>{coin.symbol}</h1>
                  </div>
                )
              })
            }
          </div>
          </>
        );
      }