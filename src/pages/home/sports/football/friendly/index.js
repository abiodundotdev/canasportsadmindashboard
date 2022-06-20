import DashLayout from '../../../../../components/dashlayout'
import User from '../../../../../services/User'
import { useEffect, useState } from 'react';
import LeagueDisplay from '../components/leaguepagedisplay'
import {getRouteData} from '../../../../../components/appmethods';
import swal from 'sweetalert';
import {toast} from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import MatchListCard from '../components/matchlist';
import { CgPlayListAdd } from 'react-icons/cg';
import { FaListAlt } from 'react-icons/fa';
import Link from 'next/link';
import AddNewFriendlyCard from '../components/addnewfriendly';


export default function SportHome(){
    const [fetchedData, setFetchedData] = useState({})
    const today = moment().format()
    const [founditem, setfounditem] = useState(false)
    const [selectedDay, setSelectedDay] = useState(today)
    const [ds, setDS] = useState("Today")
    const [startDate,setStartDate] = useState(today)
    const [endDate,setEndDate] = useState(today)

    useEffect(
        ()=>{
            User.getServerData("/listfriendlymatches").then(
                (response)=>{
                    setFetchedData(response.data)
                    setfounditem(true)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
        },[])
    return (
<DashLayout title="Friendly Matches">
    <div className="section-body mt-2">

<div className="card p-2">
    <div className="d-flex justify-content-between">
        <button className="btn btn-primary font-medium"><i><CgPlayListAdd /></i> <span>Add Match</span></button>
        <Link href={"/home/sports/football/friendly/listmatches"}><button className="btn btn-info font-medium"><i><FaListAlt /></i> <span>List Matches</span></button></Link> 
    </div>
</div>

        <div className="row">
            <div className="col-lg-7">
                <MatchListCard day="Today" matchdata={fetchedData.today} isitemfounded={founditem} />

                <MatchListCard day="Not Played" matchdata={fetchedData.not_played} isitemfounded={founditem} />

                <MatchListCard day="Played/Active" matchdata={fetchedData.played} isitemfounded={founditem} />
            </div>

            <div className="col-lg-5">
            <AddNewFriendlyCard />
            </div>
        </div>   
        
    </div>
</DashLayout>
    )
}