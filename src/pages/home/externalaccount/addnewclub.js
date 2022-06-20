import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'
import { useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import DashLayout from '../../../components/dashlayout';
import User from '../../../services/User'


export default function AddNewClub({data}){
const [name, setName] = useState("")
const [logoUrl, setLogoUrl] = useState("")
const [sportName, setSportName] = useState("")
const [address, setAddress] = useState("")
const [state, setState] = useState("")
const [country, setCountry] = useState("")
const [formDisabled, setFormDisabled] = useState(false)

useEffect(
    ()=> {
        if(name == "" || sportName == "" || state == "" || country == "" || address == ""){
            setFormDisabled(true)
        }else{
            setFormDisabled(false)
        }
    },
[name,sportName,address,country])

        let formJson = {
            "team_name" : name,
            "logo_url" : logoUrl,
            "sport_name" : sportName,
            "address" : address,
            "state" : state,
            "country" : country,
        }


        const handleSubmit = ()=> {
            setFormDisabled(true)
            User.saveDataToServer(formJson, "/add-club").then(
                (response) => {
                    toast.success("New Club Added Successfully")  
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

       
    const handleFormInputChange = (e) => {
          const field = e.target.getAttribute("name");
          const value = e.target.value;

    }    

    const [dateValue, dateOnChange] = useState(new Date());

    const handleDateChange = (dateValue) => {
            setMatchDate(moment(dateValue).format('L'));
            setMatchDay(moment(dateValue).format('HH:mm'));
            dateOnChange(dateValue)
            setMatchStamp(moment(dateValue).format('YYYY-MM-DD hh:mm:ss'))
    }

    return (
   
<DashLayout title="Add New Club">
<div className="card">
    <div className="card-header">
        <h2 className="card-title">Add New Club</h2>
    </div>

    <div className="card-body justify-content-">
        <div className="">

        <div class="form-group">
            <input name="league_name" onInput={(e)=> setName(e.target.value) }  placeholder='Team name' class="form-control" />
        </div> 

        <div class="form-group">
            <input name="league_name"  placeholder='Logo Url' onInput={(e)=> setLogoUrl(e.target.value) } class="form-control" />
        </div>

        <div class="form-group" onChange={(e)=> setSportName(e.target.value) }>
                <select className='form-control'>
                <option value="">-- Select Sport --</option>
                    <option value="Football">Football</option>
                </select>
        </div>

        <div class="form-group">
            <input name="league_name"  placeholder='Address'  onInput={(e)=> setAddress(e.target.value) } class="form-control" />
        </div>

        <div class="form-group">
            <input name="league_name"  placeholder='State' onInput={(e)=> setState(e.target.value) } class="form-control" />
        </div>
       
        <div class="form-group">
            <input name="league_name"  placeholder='Country' onInput={(e)=> setCountry(e.target.value) } class="form-control" />
        </div>


        <div className="mt-4 text-right">
            <button className="btn btn-primary" disabled={formDisabled}  onClick={handleSubmit}> Add Team</button>
</div>
       
        </div>
        
    </div>

</div>

</DashLayout>

    )
}