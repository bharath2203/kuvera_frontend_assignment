import axios from "axios";

const GET_LIST_URL = "https://api.kuvera.in/api/v3/funds.json";

function fetchData() {
  return axios.get(GET_LIST_URL);
}

export default fetchData;
