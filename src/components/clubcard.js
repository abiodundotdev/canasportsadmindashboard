import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { CLUB_LOGO_URL } from "../includes/constants";

import User from "../services/User";
export default function ClubCard({data}){
    const [allmatches, setAllMatches] = useState(0)
    useEffect(
        ()=>{
        User.getServerData("/getmatchesforclub/"+data?.id).then(
        (response)=>{
            setAllMatches(response.data.length);
        }).catch(
            ()=>{
        })
        },[])

    return (
<div class="col-xl-3 col-lg-3 col-md-3">
    <div class="card">
        <div class="card-body text-center ribbon">
            <img src={data?.logo_url} className="rounded-circle img-thumbnail" alt={CLUB_LOGO_URL.concat(data.logo_url)} style={{width : '150px', height : '150px'}} />
            <h6 class="mt-3 mb-0">{data?.team_name}</h6>      
            <div>
            <br />
    <Link href={"clubmatches?teamid="+data?.id+"&name="+data?.team_name}><button className="btn btn-primary font-medium"><i><FaListAlt /></i> <span>List Matches</span></button></Link>
       </div>

            <div class="row text-center mt-4">
                <div class="col-6 border-right">
                    <label class="mb-0">Time Added</label>
                    <h6 class="font-12">{moment(data?.created_at).format("LL")}</h6>
                </div>
                <div class="col-6">
                    <label class="mb-0">Matches</label>
                    <h6 class="font-12">{allmatches}</h6>
                </div>
            </div>
        </div>
    </div>
</div>

    )
}