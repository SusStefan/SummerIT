import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import type { SingleValue } from "react-select";
import {
  FaMoneyBill,
  FaBitcoin,
  FaPercent,
  FaArrowDownLong,
  FaArrowUpLong,
  FaAnglesDown,
  FaAnglesUp,
  FaBusinessTime,
  FaClock
} from "react-icons/fa6";
import { Button } from "../UI/Button";



type SelectCoin = {
  label: string; // shown in dropdown
  value: string; // coin id (e.g., "bitcoin")
  name: string;
  symbol: string;
  image: string;
};

type CryptoData = {
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  ath: number;
  atl: number;
  ath_date: string;
  atl_date: string;
  market_cap: number;
  last_updated: string;
  ath_change_percentage: number;
};

export default function Trade() {
  const [selected, setSelected] = useState<SelectCoin | null>(null);

  const [coins, setCoins] = useState<SelectCoin[]>([]);
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch top 100 coins on mount
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const resp = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
        );
        const data = await resp.json();
        const mapped: SelectCoin[] = data.map((c: any) => ({
          label: `${c.name} (${c.symbol.toUpperCase()})`,
          value: c.id,
          name: c.name,
          symbol: c.symbol,
          image: c.image
        }));
        setCoins(mapped);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    };
    fetchCoins();
  }, []);

  // Fetch selected coin market data
  useEffect(() => {
    if (!selected) return;

    const fetchCoinData = async () => {
      try {
       
        setError(null);

        const resp = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selected.value}`
        );
        const data = await resp.json();

        if (data && data.length > 0) {
          setCrypto(data[0]);
        } else {
          setError("No data found for this coin.");
          setCrypto(null);
        }
      } catch (err) {
        console.error("Error fetching coin data:", err);
        setError("Failed to load coin data.");
        setCrypto(null);
      } 
    };

    fetchCoinData();
  }, [selected]);

 

  // Filter coins for AsyncSelect
  const loadOptions = (input: string, callback: (options: SelectCoin[]) => void) => {
    const filtered = coins.filter(coin =>
      coin.label.toLowerCase().includes(input.toLowerCase())
    );
    callback(filtered);
  };

  const handleChange = (v: SingleValue<SelectCoin>) => {
    setSelected(v ?? null);
  };

  return (
    <div className="flex flex-col bg-[#161b27] min-h-screen">
      <div className="flex flex-col justify-self-start bg-[#0f0f0f]">
        <div className="flex flex-row justify-between p-4">
          <Button onClick={() => (window.location.href = "/")}>
            <h1 className="text-xl font-bold mb-4 text-center">Inapoi</h1>
          </Button>
      
          <AsyncSelect<SelectCoin, false>
            cacheOptions
            defaultOptions={coins}
            loadOptions={loadOptions}
            onChange={handleChange}
            value={selected}
            placeholder="Select the coin"
            isClearable
            classNames={{
              control: () =>
                "border border-gray-300 overflow-hidden text-sm rounded p-2 bg-white",
              input: () => "text-sm",
              menu: () =>
                "bg-white border border-gray-300 mt-1 rounded shadow-lg",
              option: ({ isFocused }) =>
                `px-4 py-2 cursor-pointer ${isFocused ? "bg-blue-100" : ""}`,
            }}
          />
          <Button onClick={() => (window.location.href = "/")}>
            <h1 className="text-2xl font-bold mb-4 text-center">Calculate</h1>
          </Button>
        </div>
      </div>

      <div className="flex flex-row text-sm p-4 gap-4">
        {/* Left big box */}
        <div className="flex flex-col items-center justify-center w-1/2 h-[calc(100vh-150px)] px-4 bg-[#E5E7EB] rounded-lg">
          {!crypto && <div className="text-gray-600">Pick a coin</div>}
          {crypto && (
            <div className="flex items-center gap-3">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
              <div className="text-xl font-semibold">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </div>
              <div className="text-lg">
                ${crypto.current_price.toLocaleString()}
              </div>
            </div>
          )}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>

        {/* Middle column */}
        <div className="flex flex-col w-1/4 gap-4">
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaBitcoin className="m-2 w-6 h-6" />
            <div>Ranking</div>
            <div>{crypto?.market_cap_rank ?? ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaPercent className="m-2 w-6 h-6" />
            <div>24h Change %</div>
            <div>{crypto ? `${crypto.price_change_percentage_24h.toFixed(2)}%` : ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaMoneyBill className="m-2 w-6 h-6" />
            <div>Current Price</div>
            <div>{crypto ? `$${crypto.current_price.toLocaleString()}` : ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaAnglesUp className="m-2 w-6 h-6" />
            <div>High / 24h</div>
            <div>{crypto ? `$${crypto.high_24h.toLocaleString()}` : ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaAnglesDown className="m-2 w-6 h-6" />
            <div>Low / 24h</div>
            <div>{crypto ? `$${crypto.low_24h.toLocaleString()}` : ""}</div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col w-1/4 gap-4">
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaArrowUpLong className="m-2 w-6 h-6" />
            <div>All Time High</div>
            <div>{crypto ? `$${crypto.ath.toLocaleString()}` : ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaBusinessTime className="m-2 w-6 h-6" />
            <div>ATH Date</div>
            <div>{crypto?.ath_date?.split("T")[0] ?? ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaArrowDownLong className="m-2 w-6 h-6" />
            <div>All Time Low</div>
            <div>{crypto ? `$${crypto.atl.toLocaleString()}` : ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaBusinessTime className="m-2 w-6 h-6" />
            <div>ATL Date</div>
            <div>{crypto?.atl_date?.split("T")[0] ?? ""}</div>
          </div>
          <div className="flex flex-col items-center justify-center h-1/5 p-4 bg-[#E5E7EB] rounded-lg">
            <FaClock className="m-2 w-6 h-6" />
            <div>Last Updated</div>
            <div>{crypto?.last_updated?.split("T")[0] ?? ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
