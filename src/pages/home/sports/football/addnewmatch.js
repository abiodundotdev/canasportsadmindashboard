import { useState } from 'react'
import DashLayout from '../../../../components/dashlayout'
import {footbaldata} from './footballdata'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'

export default function Dashbaord(props){
    const options = [
        { value: 'Manchester', label: 'Manchester', id : 1},
        { value: 'Chealsea', label: 'Chealsea', id : 2},
        { value: 'Arsenal', label: 'Arsenal' ,id : 3}
      ]
    const [dateValue, dateOnChange] = useState(new Date());
    return(
        <DashLayout title="Football Match">
        <div className="section-body mt-3">
            <div className="container-fluid">

                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h6>Football</h6>
                            </div>                        
                    </div>
                </div>



<div className="card">
    <div className="card-header">
        <h2 className="card-title">Add New Match</h2>
    </div>

    <div className="card-body">
        <div className="">
            <Select options={options} onChange={(option) => alert(option.id) } style={{fontSize : '20px'}} />
            <h2 className="text-center">VS</h2>
            <Select options={options}  />
             <br />
             <br />
             <label>Start Time</label>
            <DateTimePicker onChange={dateOnChange} value={dateValue} className="form-control" />
            <label>End Time</label>
            <DateTimePicker onChange={dateOnChange} value={dateValue} className="form-control" />
            <div className="d-flex justify-content-center"><button className="btn btn-success mt-10 text-center">ADD NEW MATCH</button></div>
        </div>
        
    </div>

</div>


        </div> 
        </div>
        </DashLayout>
    )
}
