import List from "@mui/material/List";
import {useEffect, useState} from "react";
import axios from "axios";
import RankingItem from "./rankingItem";

function RankingList() {
    let [ranking, setRanking] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.post('http://localhost:8080/ranking/list', {
                headers: {"Access-Control-Allow-Origin": "*"}
            });
            setRanking(data.data);
        }
        fetchData()
            .catch(console.error);
    }, [])
    return (<div>
        {ranking !== undefined && (
            <List>
                {ranking.map((rank) => {
                    <RankingItem item={rank}/>
                })}
            </List>
        )}
    </div>)
}

export default RankingList;