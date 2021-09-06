import {CgPlayListAdd} from 'react-icons/cg'
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
//import Calendar from 'react-calendar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import AddNewMatchCard from './addnewmatchcomp';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { AiFillCloseCircle, AiOutlineRollback } from 'react-icons/ai';
import Button from '@material-ui/core/Button';
import {useRouter} from 'next/router';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import User from '../../../../../services/User';
import {getRouteData} from './appmethods'
import useSWR, {mutate,trigger} from 'swr'
import {MdCancel,MdDeleteForever} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import moment from 'moment';
import "react-contexify/dist/ReactContexify.css"
import MatchListCard from './matchlist'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {DateRange } from 'react-date-range';
import { CSVLink, CSVDownload } from "react-csv"
import Link from 'next/link';
import { FaListAlt } from 'react-icons/fa';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LeagueDisplay() {
    const  {league_name, league_id} = getRouteData();
    const {data : listleagueclubs} = useSWR("/listcurrentleagueclub/"+league_id, {refreshInterval: 500, refreshWhenHidden : true});
    const {data : listmatches} = useSWR("/listleaguematches/"+league_id, {refreshInterval: 500, refreshWhenHidden : true});
    const {data : listallclubs} = useSWR("/listallclubs");
    const [calenderValue, onCalenderChange] = useState(new Date());
    const today = Date.now();
    const [selectedDay, setSelectedDay] = useState(today)
    const [ds, setDS] = useState("Today")
    const [startDate,setStartDate] = useState(today)
    const [endDate,setEndDate] = useState(today)
    const [csv_data, setCsvData] = useState([["CanaSport", "Ng"]])
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

    useEffect( 
        ()=> {
            const ds = moment(startDate).format('LL');
            const de =  moment(endDate).format('LL');
            const todayl = moment(today).format('LL');
            let df
           if(ds == de){
                df = ds
            }else if(de == "Invalid date" || de === undefined){
                df = ds
            }else if(ds == todayl && de == today){
                df = "Today"
            }else if(ds !== de){
                df = ds + " to " + de;
            }else{
                df = ds + " to " + de;
            }
            setDS(df)
        },
    [startDate,endDate])

    const sDate = moment(startDate).format('L')
    const eDate = moment(endDate).format('L')

    const matchToday = listmatches?.filter(
        (eachmatch) => {
                        var date = new Date(eachmatch?.match_day);
                        return (date >= startDate && date <= endDate);
                        //return eachmatch.match_day == sDate
                     }
    )

    const matchNotPlayed = listmatches?.filter(
        (eachmatch) => eachmatch.status == 0 && eachmatch.match_half == 0
    )

    const matchPlayed = listmatches?.filter(
        (eachmatch) => eachmatch.status == 0 && eachmatch.match_half == 2
    )

    const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
      }));
      
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
    const [showAddClubModal, setAddClubShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setAddClubShowModal(false);
    }

    const  handleDeleteClub = (id, name) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Delete "+name +" From the League",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
           User.deleteDatafromServerUsingId("/deletefromleague/"+id).then(
               (response) =>{
                    toast.success(name + " Deleted Successfully")
               }
           ).catch(
               (error)=> {
                    toast.error("Not Deleetd At All")
               }
           )
        }
    })
        
    }

    const handleCalenderClick = (value)=> {
        const day = moment(value).format('L')
        const d2s = moment(value).format('LL')
        setSelectedDay(day)
        setDS(d2s) 
    }

    function getTeamPoints(teamid){
        const foundasteamA = listmatches?.filter(
            (eachmatch) => eachmatch.team_a == teamid
        )
    
        const foundasteamB = listmatches?.filter(
            (eachmatch) => eachmatch.team_b == teamid
        )
    
        const fetchAllMatchesByClub = listmatches?.filter(
            (eachmatch) => (eachmatch.team_a == teamid || eachmatch.team_b == teamid) && eachmatch.status == 0 && eachmatch.match_half == 2
        )
        
        //console.log(foundasteamA)
        //console.log(foundasteamB)
        
        //Match Wins Calculator
        const matchWinAsTeamA = foundasteamA?.filter(
            (eachmatch) => eachmatch.score_a > eachmatch.score_b && eachmatch.status == 0 && eachmatch.match_half == 2
        )
        const matchWinAsTeamB = foundasteamB?.filter(
            (eachmatch) => eachmatch.score_b > eachmatch.score_a && eachmatch.status == 0 && eachmatch.match_half == 2
        )
        const totalwins = matchWinAsTeamA?.length + matchWinAsTeamB?.length
        
        //Match Loss Calculator
        const matchLossAsTeamA = foundasteamA?.filter(
            (eachmatch) => eachmatch.score_b > eachmatch.score_a && eachmatch.status == 0 && eachmatch.match_half == 2
        )
    
        const matchLossAsTeamB = foundasteamB?.filter(
            (eachmatch) => eachmatch.score_a > eachmatch.score_b && eachmatch.status == 0 && eachmatch.match_half == 2
        )
    
        const totalloss = matchLossAsTeamA?.length + matchLossAsTeamB?.length
    
        //Draw Calculator
       
        const totalPlayed = fetchAllMatchesByClub?.length
    
        const matchDraw = fetchAllMatchesByClub?.filter(
            (eachmatch) => eachmatch.score_a == eachmatch.score_b 
        )
        const totaldraw  = matchDraw?.length
       
        //Match POINTS CALCULATOR START
        const matchpointsatA = foundasteamA?.map(
            (eachmatch) => eachmatch.point_a
        )
        const matchpointsatB = foundasteamB?.map(
            (eachmatch) => eachmatch.point_b
        )
        //MATCH GOAL CALCULATOR STARTS
        const matchgoalsatA = foundasteamA?.map(
            (eachmatch) => eachmatch.score_a
        )
        const matchgoalsatB = foundasteamB?.map(
            (eachmatch) => eachmatch.score_b
        )
        //Match Goal Agianst
        const matchgoalsAgainstatA = foundasteamA?.map(
            (eachmatch) => eachmatch.score_b
        )
    
        const matchgoalsAgainstatB = foundasteamB?.map(
            (eachmatch) => eachmatch.score_a
        )
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        //console.log(matchpointsatA,matchgoalsatA,matchgoalsAgainstatA)
        //console.log(matchpointsatB,matchgoalsatB,matchgoalsAgainstatB)
        
        let sumpointsasa = matchpointsatA?.length == 0 ? 0 : matchpointsatA?.reduce(reducer)
        let sumpointsasb = matchpointsatB?.length == 0 ? 0 : matchpointsatB?.reduce(reducer)
        
        let sumgoalsasa = matchgoalsatA?.length == 0 ? 0 : matchgoalsatA?.reduce(reducer)
        let sumgoalsasb = matchgoalsatB?.length == 0 ? 0 : matchgoalsatB?.reduce(reducer)
        
        let sumgoalsAgainstasa = matchgoalsAgainstatA?.length == 0 ? 0 : matchgoalsAgainstatA?.reduce(reducer)
        let sumgoalsAgaisntasb = matchgoalsAgainstatB?.length == 0 ? 0 : matchgoalsAgainstatB?.reduce(reducer)
    
    
        let totalpoints = sumpointsasa + sumpointsasb
        let totalgoalsfor = sumgoalsasa + sumgoalsasb
        let totalgoalsAgainst = sumgoalsAgainstasa + sumgoalsAgaisntasb
        let goaldifference = totalgoalsfor - totalgoalsAgainst
        //console.log(totalpoints,totalgoalsfor)
        return [totalpoints,totalgoalsfor,totalgoalsAgainst,goaldifference,totalwins,totalloss,totaldraw,totalPlayed]
    }
    
    
    function getClubName(clubid){
       const found = listallclubs?.find(
            (eachclub) => eachclub.id == clubid
        )
        return found?.team_name
    }

    return (
<>
<div className="card p-2">
    <div className="d-flex justify-content-between">
        <button onClick={ ()=> setShowModal(true) } className="btn btn-primary font-medium"><i><CgPlayListAdd /></i> <span>Add Match</span></button>
        <Link href={"/home/sports/football/league/listmatches?leagueid="+league_id+"&name="+league_name}><button className="btn btn-info font-medium"><i><FaListAlt /></i> <span>List Matches</span></button></Link>
        <button onClick={
            () => {
            setShowModal(true)
            setAddClubShowModal(true)
        }
        } className="btn btn-primary d-flex font-medium"><i><CgPlayListAdd /></i> <span>Add Club(s)</span></button>
        <h6 className="tag tag-primary">Start : January, 22 2020</h6>
        <h6 className="tag tag-info">End : December 23, 2020</h6>
    </div>
</div>

    <div className="row d-flex justify-content-between">
        <div className="col-lg-7">
        
        <MatchListCard day={ds} matchdata={matchToday || []} isitemfounded={true}/>

        <MatchListCard day="Not Played" matchdata={matchNotPlayed || []} isitemfounded={true}/>

        <MatchListCard day="Played" matchdata={matchPlayed || []} isitemfounded={true}/>

        </div>

        <div className="col-lg-5">
        
        <div className="card">
            <div className="card-header">
                <h6 className="card-title">Choose Day or Range of Days</h6>
            </div>
        <div className="card-body">

        <DateRange
            editableDateInputs={true}
            onChange={item =>
                { 
                    setDateRange([item.selection])
                    setStartDate(item.selection.startDate)
                    setEndDate(item.selection.endDate)
                }
                
                }
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
        />
    
     

        </div>
        </div>

        <div className="card">
               <div className="card-header d-flex justify-content-between">
                <h6 className="card-title">Club Statistics</h6>
                <CSVLink className="btn btn-primary" filename={"CanaSportsNg.csv"} data={[[]]}>Export</CSVLink>
                    
        </div>
                    
        <div className="card-body">
            <div className="table-responsive">
               <table className="table table-hover table-md">
                    <thead>
                        <tr>
                        <th></th>
                        <th scope="col" ><small>Team</small></th>
                        
                        <th scope="col" rowSpan="1" title="Played"><small>P</small></th>
                        <th scope="col" rowSpan="1" title="Wins"><small>W</small></th>
                        <th scope="col" rowSpan="1" title="Draw"><small>D</small></th>
                        <th scope="col" rowSpan="1" title="Loss"><small>L</small></th>
                        <th scope="col" rowSpan="1" title="Goal Difference"><small>GF</small></th>
                        <th scope="col" rowSpan="1" title="Goal For"><small>GA</small></th>
                        <th scope="col" rowSpan="1" title="Goal Against"><small>GD</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Pts</small></th>
                        <th scope="col" rowSpan="1" title="Action"><small>Del</small></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listleagueclubs?.map( (club,index) => { 
                         return( 
                             <>
                            <tr>
                                <td>{index+1}</td>
                                <td>{getClubName(club.club_id)}</td>
                                <td>{getTeamPoints(club.club_id)[7]}</td>
                                <td>{getTeamPoints(club.club_id)[4]}</td>
                                <td>{getTeamPoints(club.club_id)[6]}</td>
                                <td>{getTeamPoints(club.club_id)[5]}</td>
                                <td>{getTeamPoints(club.club_id)[1]}</td>
                                <td>{getTeamPoints(club.club_id)[2]}</td>
                                <td>{getTeamPoints(club.club_id)[3]}</td>
                                <td>{getTeamPoints(club.club_id)[0]}</td>
                                <td><button onClick={ () => handleDeleteClub(club.id,club.club_id)} className="btn btn-danger text-danger"><MdDeleteForever /></button></td> 
                            </tr> 
                             </>
                                     )
                                 }
                                     )
                        }
                    </tbody>
                </table>
            </div>
               </div>

             <>
               <Dialog fullScreen open={showModal} onClose={handleClose} TransitionComponent={Transition}>      
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <AiFillCloseCircle />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        {showAddClubModal ? "Add Club Lists" : "Add New Match"} 
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                        Close
                        </Button>
                        
                    </Toolbar>
                    </AppBar>     
                   {showAddClubModal ? <AddClubCard /> : <AddNewMatchCard />} 
                </Dialog>


            </>
           </div>
        </div>
        
    </div>


</>
    )
}

function AddClubCard(){
    const  {league_name , league_id} = getRouteData();    
    const [clublist, SetClubList] = useState([])
    const [dbClub, setDbClub] = useState([])
    const animatedComponents = makeAnimated();
    const optionsdb = []
    
    const formJson = {
        'club_id' : clublist,
        'match_type' : 1,
        'match_sub_type' : league_id,
        'season' : '2018/2019'
    }
   
     useEffect(
        () => { 
            User.getServerData("/clublistingforleague/"+league_id).then(
                (response) => {
                    console.log(response.data)
                    response.data.map( (data) => {
                        optionsdb.push(
                            {
                                'value' : data.team_name,
                                'label' : data.team_name,
                                'id' :  data.club_id
                            }
                        )
                    }
                    )
                    //alert(optionsdb[0].value)
                    setDbClub(optionsdb) 
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
        }
    )

    const handleSubmit = () => {
         User.saveDataToServer(formJson, "/addclublisting").then(
            (response) => {
               toast.success("Clubs Added Successfully")      
                }
        ).catch(
            (error) => {
               toast.error("Error Occcur Check Inputs") 
            }
        )
        //trigger(baseURL+"/listcurrentleagueclub/"+league_id)
    }
     

    return(
        <>
        <div className="card">
            <div className="card-body">
                <Select options={dbClub} isMulti onChange={ 
                    (value, response) => {
                        const action = response.action
                        switch(action){
                            case  "select-option":
                                SetClubList(oldArray => [...oldArray, response.option.value])
                                break;
                            case "remove-value":
                                const arr = clublist.filter(item => item !== response.removedValue.value)
                                SetClubList(arr)
                                break;
                            case "clear":
                                SetClubList([])
                        }
                    }

                 } components={animatedComponents} />

</div>
        </div>
<ToastContainer autoClose={2000}/>
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h2 className="card-title">Selected Clubs</h2>
                <h2 className="card-title">{clublist.length} item(s) Selected</h2>
            </div>

            <div className="card-body d-flex">
               {clublist.length <= 0 ? <h5>Clubs Not Selected Yet</h5> : 
               clublist.map( 
                   (value) => {
                       return <Button  className="mr-2" variant="outlined" style={{backgroundColor : 'teal', color : 'white'}}>{value}</Button>
                   }
               )}
            </div> 
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
    </>
    )
}
