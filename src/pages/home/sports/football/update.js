import { useState } from 'react'
import DashLayout from '../../../../components/dashlayout'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-clock/dist/Clock.css'
import Select from 'react-select'


export default function UpdateMatch(){
  const options = [
    { value: 'Manchester', label: 'Manchester', id : 1},
    { value: 'Chealsea', label: 'Chealsea', id : 2},
    { value: 'Arsenal', label: 'Arsenal' ,id : 3}
  ]
    return(
        <DashLayout title="Match Updater">
        <div className="section-body mt-3">
            <div className="container-fluid">
          <h6>Add New Update</h6>

        <div className="card">
              <div className="card-header">
                  <h5 className="card-title">Match Update</h5>
              </div>
              
            <div className="card-body">
            <h4 className="text-center"> Manchester United Vs Liverpool</h4>
            <br />
            <Select options={options} placeholder="Search an AAction Show Items"/>
            
        </div>



          </div>
            

            </div> 
        </div>
        </DashLayout>
    )
}
