import axios from "axios";

export const coingecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const getMarket = async () => {
  const { data } = await coingecko.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 8,
      page: 1,
      sparkline: true,
    },
  });
  return data;
};

export const getCoin = async (id: string) => {
  const { data } = await coingecko.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: true,
      developer_data: true,
      sparkline: true,
    },
  });
  console.log(data);
  return data;
};
