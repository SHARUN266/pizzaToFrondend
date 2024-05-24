import axios from "axios";

export async function setTrendingAllData(setTrending) {
  try {
    let { data } = await axios.get(`${process.env.REACT_APP_RENDER_SERVER}/getTrendPizza`);
    setTrending(data);
  } catch (err) {
    console.log(err);
  }
}
