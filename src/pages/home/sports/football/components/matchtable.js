import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FcDeleteRow } from "react-icons/fc"
import Skeleton from "react-loading-skeleton"
import User from "../../../../../services/User"
import { matchStatusToString } from "../../../../../components/appmethods"
export default function MatchTable({matchdata}){
    return (
        <tr>
            <td>
                {
                matchdata?.club_one.team_name + " VS "+ matchdata?.club_two.team_name
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
             
        </tr>
    )
}