import axios from "axios";

const getChampionList = async (setChampions) => {
    const data = await axios.get('http://localhost:8080/champions/list', {headers: {"Access-Control-Allow-Origin": "*"}});
    setChampions(data.data);
}
export default {getChampionList};