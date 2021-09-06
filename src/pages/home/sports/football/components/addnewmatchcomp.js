import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import { useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'
import {getRouteData} from './appmethods'
import moment from 'moment';
import User from '../../../../../services/User';
import ScaleLoader from "react-spinners/ScaleLoader";
import {FcAddDatabase} from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';


export default function AddNewMatchCard({data}){
const  {league_name , league_id} = getRouteData(); 
const [team_a, seTeam_a] = useState("")
const [team_b, seTeam_b] = useState("")
const [team_a_name, seTeam_a_name] = useState("")
const [team_b_name, seTeam_b_name] = useState("")
const [matchDay, setMatchDay] = useState("")
const [matchDate, setMatchDate] = useState("")
const [matchStamp, setMatchStamp] = useState("")
const [isFormSubmitted, setFormSubmitted] = useState(false)
const [pitches, setPitches] = useState([])
const [teams, setTeams] = useState([])
const [selectPitch, setSelectedPitch] = useState("")
const optionsPitch = []
const optionsTeam = []
const [formDisabled, setFormDisabled] = useState(true)

useEffect(
    ()=> {
        if(team_a == "" || team_b == "" || team_a == team_b || matchDay == "" || selectPitch == ""){
            setFormDisabled(true)
        }else{
            setFormDisabled(false)
        }
    },
[team_a,team_b,matchDay,selectPitch])

        const preloader = formDisabled ? " ": <ScaleLoader height={15} color="white" /> 

        let formJson = {
            "match_type" : 1,
            "match_sub_type" :  league_id,
            "team_a" : team_a,
            "team_b" : team_b,
            "score_a" : 0,
            "score_b" : 0,
            "point_a" : 0,
            "point_b" : 0,
            "status" : 0,
            "match_half" : 0,
            "match_day" : matchDate,
            "match_time" : matchDay,
            "match_time_stamp" : matchStamp,
            "match_season" : "2018/2019",
            "pitch" : selectPitch,
            "teama_name" : team_a_name,
            "teamb_name" : team_b_name
        }


        const handleSubmit = ()=> {
            setFormDisabled(true)
            User.saveDataToServer(formJson, "/addnewmatch").then(
                (response) => {
                    toast.success("New Match Added Successfully")  
                    setFormDisabled(false)    
                }
            ).catch(
                (error) => {
                    toast.error("Error Occcur Check Inputs")
                    setFormDisabled(false)
                    
                }
            )
        }


    var [formData, setFormData] = useState({formJson});

    const options = [
        { value: 'Manchester', label: 'Manchester', id : 1},
        { value: 'Chealsea', label: 'Chealsea', id : 2},
        { value: 'Arsenal', label: 'Arsenal' ,id : 3}
    ];

    useEffect(
        () => { 
            User.getServerData("/getpitch").then(
                (response) => {
                    console.log(response.data)
                    response.data.map( (data) => {
                        optionsPitch.push(
                            {
                                'value' : data?.name,
                                'label' : data?.name,
                                'id' :  data?.id
                            }
                        )
                    }
                    )
                    setPitches(optionsPitch) 
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )


            User.getServerData("/listallclubs").then(
                (response) => {
                    console.log(response.data)
                    response.data.map( (data) => {
                        optionsTeam.push(
                            {
                                'value' : data?.team_name,
                                'label' : data?.team_name,
                                'id' :  data?.id
                            }
                        )
                    }
                    )
                    setTeams(optionsTeam) 
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
        },[])


    const handleFormInputChange = (e) => {
          const field = e.target.getAttribute("name");
          const value = e.target.value;

    }    

    const [dateValue, dateOnChange] = useState(new Date());

    const handleDateChange = (dateValue) => {
            setMatchDate(moment(dateValue).format('L'));
            setMatchDay(moment(dateValue).format('HH:mm'));
            dateOnChange(dateValue)
            setMatchStamp(moment(dateValue).unix())
    }

    return (
    <div className="card">
    <div className="card-header">
        <h2 className="card-title">Add New Match</h2>
    </div>

    <div className="card-body justify-content-">
        <div className="">
        <div class="form-group">
            <label for="exampleFormControlInput1">League Name</label>
            <input name="league_name" onInput={handleFormInputChange} type="email" value={league_name} class="form-control" id="exampleFormControlInput1" readOnly/>
        </div>
            <Select options={teams} onChange={ (option) => { 
                seTeam_a(option.id)
                seTeam_a_name(option.value) 
                } } style={{fontSize : '20px'}} />
            <h2 className="text-center">VS</h2>
            <Select options={teams} onChange={ (option) => {
                seTeam_b_name(option.value)
                seTeam_b(option.id)
            }
            }/>
            <br />
            <span>Select Pitch for Match</span>
            <Select options={pitches} onChange={ (option) => setSelectedPitch(option.value) }/>
             <br />
             <br />
             <label>Start Time</label>
            <DateTimePicker format="dd/MM/y h:mm:ss a" onChange={handleDateChange} value={dateValue} className="form-control" />
            <div className="d-flex justify-content-center">
                <button onClick={handleSubmit} className="btn btn-success mt-10 text-center d-flex" disabled={formDisabled}><i><FcAddDatabase /></i> <span className="mr-2"> ADD NEW MATCH</span> {preloader}  </button>
            </div>
        </div>
        
    </div>

</div>

    )
}