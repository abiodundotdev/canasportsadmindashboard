import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FcDeleteRow } from "react-icons/fc"
import Skeleton from "react-loading-skeleton"
import User from "../../../../../services/User"
import { matchStatusToString } from "../../../../../components/appmethods"
export default function MatchTable({matchdata}){
    const [club1, setClub1] = useState({})
    const [club2, setClub2] = useState({})
    useEffect(
    ()=>{
        User.getServerData("/getoneteam/"+matchdata?.team_a).then( response => setClub1(response.data) ).catch( (err)=> console.log(err))
        User.getServerData("/getoneteam/"+matchdata?.team_b).then( response => setClub2(response.data) ).catch( (err)=> console.log(err))
    },[])

    return (
        <tr>
            <td>
                {
                typeof(club1?.team_name) == "undefined" || typeof(club2?.team_name) == "undefined" ? <Skeleton /> : club1?.team_name + " VS "+ club2?.team_name
                } 
            </td>
            <td>
                {matchdata?.match_day}
            </td>
            <td>
                {matchdata?.match_time}
            </td>
            
            <td>
                {matchdata?.score_a+  " - " +matchdata?.score_b}
            </td>
            
            <td>
                {matchdata?.point_a+  " - " +matchdata?.point_b}
            </td>

            <td>
            {
                matchStatusToString(matchdata?.status,matchdata?.match_half)
            }
            </td> 
            <td>
                <i><FaTrash /></i>
            </td> 
        </tr>
    )
}