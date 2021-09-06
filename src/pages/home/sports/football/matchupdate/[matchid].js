import DashLayout from '../../../../../components/dashlayout'
import Calendar from 'react-calendar';
import User from '../../../../../services/User'
import { useEffect, useState } from 'react';
import CustomDataCard from '../../../../../components/cardcomponent';
import {BsInfoCircle} from 'react-icons/bs'
import {useRouter} from 'next/router'
import {AiFillFileAdd} from 'react-icons/ai'
import RiseLoader from 'react-spinners/RiseLoader';
import useSWR, {mutate,trigger} from 'swr'
import Select from 'react-select'
import {SwitchUpdate} from '../components/updatecomponents'
import { ToastContainer, toast } from 'react-toastify';
import {FaLongArrowAltDown,FaLongArrowAltUp} from 'react-icons/fa'
import {IoMdFootball} from 'react-icons/io'
import moment from 'moment';

export default function MatchUpdate(){
    const [calenderValue, onCalenderChange] = useState(new Date())
    const [matchData,setMatchData] = useState({})
    const [currentUpdate, setCurrentUpdate] = useState(null)
    const [currentTeamId, setcurrentTeamId] = useState(null)
    const [players, setPlayers] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("")
    const [seletedPlayers, setTeletedplayers] = useState("")
    const [player1, setPlayer1] = useState("")
    const [player2, setPlayer2] = useState("")
    const router = useRouter();
    const [cardType, setCardType] = useState("")
    const [time, seTime] = useState([])
    const [updating, setUpdating] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
    const [currentTimeStamp, setCurrentTimeStamp] = useState(new Date()/1000) 
    const [matchUrl, setMatchUrl] = useState("")
    const [ifd, sifd] = useState(false)
    const [listAllUpdates, setlistAllUpdates] = useState([]);
    const [saved, isFormSaved] = useState(false);
    const [posessionOne, setPosessionOne] = useState(0);
    const [posessionTwo, setPosessionTwo] = useState(0);
    const [disableButton, setDisableButton] = useState(false)

    const { matchid } = router.query

    const formJson = {
        "type" : currentUpdate,
        "team" : currentTeamId,
        "player1" : player1,
        "player2" : player2,
        "time" : time,
        "info" : cardType,
        "match_id" : matchid
    }
    //const {data : listAllUpdates} = useSWR("/listallmatchupdate/"+matchid, {refreshInterval: 1000, refreshWhenHidden : true})    
    useEffect(
        ()=>{
           User.getServerData("/listallmatchupdate/"+matchid).then(
               (response)=>setlistAllUpdates(response.data)
           ).catch(()=>console.log("Error Occur"))
        },[saved])

    const handleStreamSave = () => {
        setDisableButton(true)
        User.saveDataToServer(formJson,"/savetextstream").then(
            (response) => {
              isFormSaved(true)
              setDisableButton(false)
              toast.success("Match Update Added Successfully")  
            }
        ).catch(
            (err) => {
                setDisableButton(false)
                toast.error(err.response.data.message)
                //console.log(err.response.data.message)
            }
        )
    }

    const updateoptions = [
        { value: 'card', label: 'Card' ,id : 1},
        { value: 'corner', label: 'Corner', id : 2},
        { value: 'foul', label: 'Foul' ,id : 3},
        { value: 'goal', label: 'Goal', id : 4},
        { value: 'penaltygoal', label: 'Penalty Goal', id : 5},
        { value: 'offside', label: 'OffSide' ,id : 4},
        { value: 'posession', label: 'Ball Posession' ,id : 6},
        { value: 'shotontarget', label: 'Shot On Target', id : 7},
        { value: 'substitution', label: 'Substitution', id : 8}
      ];

    useEffect(
        () => {
            //const {data : listallplayers} = useSWR("/geteamplayers/"+currentTeamId)
            let fdata = [
                { value: "", label: "-- Choose Player --" ,id : 0}
            ]
            User.getServerData("/getplayersforateam/"+currentTeamId).then(
                (response) => {
                    response.data.data.map( (data) => {
                        fdata.push(
                            {
                                'value' : data?.name,
                                'label' : data?.name,
                                'id' :  data?.id
                            }
                        )
                    }
                    )
                    setPlayers(fdata)
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
     }, [currentTeamId]);

    
    function getClubName(clubid){
        const {data : listallclubs} = useSWR("/listallclubs");
        const found = (listallclubs||[]).find(
             (eachclub) => eachclub.id == clubid
         )
         return found?.team_name
     };

     const team1 = getClubName(matchData?.team_a)
     const team2 = getClubName(matchData?.team_b)

     const teamoptions = [
        { value: team1, label: team1, teamid : matchData?.team_a},
        { value: team2, label: team2, teamid : matchData?.team_b}
    ]

    useEffect(
        () =>{
            User.getServerData("/getamatch/"+matchid)
            .then( (response)=>{
                setMatchData(response.data)
                setMatchUrl(response.data?.live_stream_url)
            })
            .catch((response)=>{
                console.log(response);
            })
            setCurrentTime(new Date().toLocaleTimeString());
            setCurrentTimeStamp(new Date()/1000)
        },[])

    function getMatchHalf(half){
        if(half == 1){
            return "First";
        }else if(half == 2){
            return "Second";
        }else{
            return "Not Started";
        }
    }

    function getTimeSpent(status,half,match_time, match_second){
        if(status == 0 && half == 0){
            return "Not Started";
        }else if(status == 1 && half == 1){
            return `${Math.ceil((currentTimeStamp - match_time)/60)}' Minutes`
        }else if(status == 1 && half == 2){
            return `${Math.ceil((currentTimeStamp - match_second)/60)}' Minutes`
        }else{
            return "Match Ended";
        }

    }

    const saveUrl = ()=> {
        sifd(true);
        const formjSON = {
            "action" : "updateliveurl",
            'matchurl' : matchUrl,
            'match_id' : matchid, 
        }
        User.saveDataToServer(formjSON,"/updatematchstatus").then(
            (response)=>{
                toast.success("Link Updated Successfully");
                sifd(false);
            }
        ).catch(
            (err)=> {
                toast.error("An Error Occur");
                sifd(false);
            }
        )
    }
    return (  
        <DashLayout title="Match Updater">
        <div className="section-body mt-2">
        <div className="alert alert-info">
            <h6 className="text-center font-weight-bold"> Live Match Update for {team1} vs {team2} </h6> 
         </div>

         <div className="alert alert-success d-flex justify-content-between p-1">
            <h6>C_H :: <b>{getMatchHalf(matchData?.match_half)}</b></h6>
            <h6>C_T :: {currentTime}</h6>
            <h6>M_S :: {moment.unix(matchData?.match_start_time).format('HH:mm:ss A')}</h6>
            <h6>M_C_T :: {getTimeSpent(matchData?.status, matchData?.match_half, matchData?.match_start_time, matchData?.match_second_start)}</h6>
         </div>
        <div className="row">

        <div className="col-lg-6" style={{height : "800px"}}>
            <div className="card">
                <div className="card-header"><h6 className="card-title">Select And Add Update</h6></div>
               
               <div className="card-body justify-content-center p-6">
            <span>-- Select Team -- </span>
            
        <Select className="w-75" placeholder="Choose Club/Team" options={teamoptions} onChange={
                 (opup) => {
                     setcurrentTeamId(opup.teamid); 
                     setSelectedTeam(opup.value); 
                 }
                } 
        />


             
            <br />
            <span>-- Select Update -- </span>
            <Select defaultValue="Choose Action" className="w-75" placeholder="Choose Action" options={updateoptions} onChange={
                   (upopt) => {
                    setCurrentUpdate(upopt.value.toLowerCase())
            }} />

            <br />
           
            {currentUpdate == "posession" ? ""
            :  <><span>-- Select Player -- </span> <Select className="w-75" placeholder={currentUpdate == "substitution" ? "Choose Player Out" :  "Choose Player"}  options={players} 
            onChange={
                (player) => {
                 setPlayer1(player.value)
                }}
            /> </>
            }

            <br />

            {currentUpdate == "substitution" ? 
            <> <span>-- Select Player -- </span><Select className="w-75" placeholder="Choose Player In"  options={players}
            onChange={
                (player) => {
                 setPlayer2(player.value)
                }}
            /> </>
            : "" 
            }

            {currentUpdate == "posession" ? 
            <> 
        <div class="row">
            <div class="col-4">
                <input type="number" value={posessionOne} onInput={ (e)=>{setPosessionOne(e.target.value); setPosessionTwo(100 - (e.target.value))  } }  class="form-control" placeholder="Team 1 Posssesion" />
            </div>
            
            <div class="col-4">
                <input type="text" value={posessionTwo} class="form-control" onInput={(e)=>setPosessionTwo(e.target.value)} placeholder="Team 2 Posssesion" />
            </div>
        </div>
            </>
            : "" 
            }

    {currentUpdate == "card" ? 
            <> 
            <span>-- Select Card Type --</span>
       <Select className="w-75" options={[ { value: " ", label: "--Select Card --"},  { value: "Yellow", label: "Yellow"}, { value: "Red", label: "Red"}]} onChange={ (cardtype)=> setCardType(cardtype.value) } />
            </>
            : "" 
            }
    <br />

        <>
        <span>--Choose Action Time</span>
    <Select options={
            Array.from(Array(90), (e, i) => {
                return {value: i, label: i+1+" minute" }
              })
        } className="w-75"
        onChange={
            (time) => {
             seTime(time.value)
        }}
        />

        </>
    
            <br />
{
matchData?.status == 0 &&  matchData?.match_half == 2 ? 
<div className="alert alert-info text-center">MATCH HAS ENEDED UPDATE CAN NO LONGER BE DONE</div>  
    : matchData?.status == 0 &&  matchData?.match_half == 0 ? 
    <div className="alert alert-info text-center">YOU NEED TO START THE MATCH BEFORE UPDATING</div>  
:
    <>
      <div className="d-flex justify-content-between">
            <button className="btn btn-primary" disabled={disableButton} onClick={() => handleStreamSave()}>SAVE UPDATE</button>
            <button className="btn btn-warning">RESET</button>
        </div>
    </>
}
                </div>

            </div>
        </div>

        
        <div className="col-lg-6">
           <div className="card">
               <div className="card-header">
                    <h6 className="card-title">Stream Display</h6>
               </div>

               <div className="card-body">
                    <div className="row">
                        <div className="col-5"><h6>{team1}</h6></div>
                        <div className="col-2"><h6>{matchData?.score_a} - {matchData?.score_b}</h6></div>
                        <div className="col-5"><h6>{team2}</h6></div>
                    </div>

                <div className="row">
                    <div className="col-5">
                        {
                             listAllUpdates?.map(
                                (update) => {
                                    if(update.team == matchData?.team_a){
                                        return (
                                            <div className="d-flex justify-content-between">
                                                <b>{update.time+"\'"}</b>
                                                <b>{update.player_1}
                                                {update.type == "substitution" ?<i style={{color : "green"}}><FaLongArrowAltUp /></i> : ""}
                                                </b>
                                                <b>
                                                    {
                                                   update.type == "card" ? update.info == "Yellow" ? <div style={{backgroundColor : "#FFD500", height : "15px", width : "10px"}}></div> :  <div style={{backgroundColor : "red", height : "15px", width : "10px"}}></div>
                                                    : update.info
                                                    }

                                                </b>
                                               
                                                <b>
                                                {update.player_2}
                                                {update.type == "substitution" ?<i style={{color : "red"}}><FaLongArrowAltDown /></i> : ""}
                                                </b>
                                            </div>
                                        )
                                    }
                                }
                            )

                        }
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5">
                    {
                            listAllUpdates?.map(
                                (update) => {
                                    if(update.team == matchData?.team_b){
                                        return (
                                            <div className="d-flex justify-content-between">
                                                <b>{update.time+"\'"}</b>
                                                <b>{update.player_1}
                                                {update.type == "substitution" ?<i style={{color : "green"}}><FaLongArrowAltUp /></i> : ""}
                                                </b>
                                                <b>
                                                    {
                                                   update.type == "card" ? update.info == "Yellow" ? <div style={{backgroundColor : "#FFD500", height : "15px", width : "10px"}}></div> :  <div style={{backgroundColor : "red", height : "15px", width : "10px"}}></div>
                                                    : update.info
                                                    }
                                                    
                                                </b>
                                                
                                                <b>
                                                {update.player_2}
                                                {update.type == "substitution" ?<i style={{color : "red"}}><FaLongArrowAltDown /></i> : ""}
                                                </b>
                                            </div>
                                        )
                                    }
                                }
                            )
                        }
                    </div>
                </div>

               </div>

           </div>

        
        <div className="card">
            <div className="card-header">
                <h6 className="card-title"> Live Stream Url </h6>
            </div>

            <div className="card-body">
            <div className="form-group">
                    <label for="formGroupExampleInput">Live Streaming Url</label>
                    <input type="text" value={matchUrl} onInput={(e)=>setMatchUrl(e.target.value)} className="form-control" id="descrption" placeholder="Description" />
                 </div>

            <div className="form-group d-flex justify-content-center">
                <button className="btn btn-success mt-10 text-center d-flex" onClick={saveUrl} disabled={ifd}>Save Url</button>
            </div>  
            </div>

        </div>


        </div>

        </div>


    
  
        </div>
        </DashLayout>
    )
}

{
    //<b>{update.type.substring(0,1).toUpperCase()}</b>
}