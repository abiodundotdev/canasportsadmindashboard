// import 'react-datetime-picker/dist/DateTimePicker.css'
// import 'react-clock/dist/Clock.css'
// import Select from 'react-select'
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
// import { useState, useEffect} from 'react'
// import {useRouter} from 'next/router'
// import 'react-datetime-picker/dist/DateTimePicker.css'
// import 'react-clock/dist/Clock.css'
// import moment from 'moment';
// import User from '../../../../../services/User';
// import ScaleLoader from "react-spinners/ScaleLoader";
// import {FcAddDatabase} from 'react-icons/fc'
// import { ToastContainer, toast } from 'react-toastify';
// import DashLayout from '../../../components/dashlayout';


// export default function AddNewClub({data}){
// const [team_a, seTeam_a] = useState("")
// const [team_b, seTeam_b] = useState("")
// const [matchDay, setMatchDay] = useState("")
// const [matchDate, setMatchDate] = useState("")
// const [matchStamp, setMatchStamp] = useState("")
// const [isFormSubmitted, setFormSubmitted] = useState(false)
// const [pitches, setPitches] = useState([])
// const [teams, setTeams] = useState([])
// const [selectPitch, setSelectedPitch] = useState("")
// const optionsPitch = []
// const optionsTeam = []
// const [formDisabled, setFormDisabled] = useState(true)

// useEffect(
//     ()=> {
//         if(team_a == "" || team_b == "" || team_a == team_b || matchDay == "" || selectPitch == ""){
//             setFormDisabled(true)
//         }else{
//             setFormDisabled(false)
//         }
//     },
// [team_a,team_b,matchDay,selectPitch])

//         const preloader = formDisabled ? <ScaleLoader height={15} color="white" />  : " " 

//         let formJson = {
//             "match_type" : "234",
//             "match_sub_type" :  "",
//             "team_a" : team_a,
//             "team_b" : team_b,
//             "score_a" : 0,
//             "score_b" : 0,
//             "point_a" : 0,
//             "point_b" : 0,
//             "status" : 0,
//             "match_half" : 0,
//             "match_day" : matchDate,
//             "match_time" : matchDay,
//             "match_time_stamp" : matchStamp,
//             "match_season" : "2018/2019",
//             "pitch" : selectPitch
//         }


//         const handleSubmit = ()=> {
//             setFormDisabled(true)
//             User.saveDataToServer(formJson, "/addnewmatch").then(
//                 (response) => {
//                     toast.success("New Match Added Successfully")  
//                     setFormDisabled(false)    
//                 }
//             ).catch(
//                 (error) => {
//                     toast.error("Error Occcur Check Inputs")
//                     setFormDisabled(false)
                    
//                 }
//             )
//         }


//     var [formData, setFormData] = useState({formJson});

//     useEffect(
//         () => { 
//             User.getServerData("/getpitch").then(
//                 (response) => {
//                     console.log(response.data)
//                     response.data.map( (data) => {
//                         optionsPitch.push(
//                             {
//                                 'value' : data?.name,
//                                 'label' : data?.name,
//                                 'id' :  data?.id
//                             }
//                         )
//                     }
//                     )
//                     setPitches(optionsPitch) 
//                 }
//             ).catch(
//                 (err) => {
//                     console.log(err)
//                 }
//             )
//         },[])

//         useEffect(
//             () => { 
//                 User.getServerData("/listallclubs").then(
//                     (response) => {
//                         console.log(response.data)
//                         response.data.map( (data) => {
//                             optionsTeam.push(
//                                 {
//                                     'value' : data?.team_name,
//                                     'label' : data?.team_name,
//                                     'id' :  data?.id
//                                 }
//                             )
//                         }
//                         )
//                         setTeams(optionsTeam) 
//                     }
//                 ).catch(
//                     (err) => {
//                         console.log(err)
//                     }
//                 )
//             },[])

//     const handleFormInputChange = (e) => {
//           const field = e.target.getAttribute("name");
//           const value = e.target.value;

//     }    

//     const [dateValue, dateOnChange] = useState(new Date());

//     const handleDateChange = (dateValue) => {
//             setMatchDate(moment(dateValue).format('L'));
//             setMatchDay(moment(dateValue).format('HH:mm'));
//             dateOnChange(dateValue)
//             setMatchStamp(moment(dateValue).format('YYYY-MM-DD hh:mm:ss'))
//     }

//     return (
   
// <DashLayout title="Add New Club">
// <div className="card">
//     <div className="card-header">
//         <h2 className="card-title">Add New Club</h2>
//     </div>

//     <div className="card-body justify-content-">
//         <div className="">

//         <div class="form-group">
//             <input name="league_name"   placeholder='Team name' class="form-control" />
//         </div>

//         <div class="form-group">
//             <input name="league_name"  placeholder='Logo Url' class="form-control" />
//         </div>

//         <div class="form-group">
//                 <select className='form-control'>
//                     <option>Football</option>
//                     <option>Football</option>
//                 </select>
//         </div>

//         <div class="form-group">
//             <input name="league_name"  value="Friendly Match" class="form-control"/>
//         </div>
       
       
//         </div>
        
//     </div>

// </div>

// </DashLayout>

//     )
// }