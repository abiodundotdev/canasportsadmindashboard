import DashLayout from '../../../../components/dashlayout'
import { APP_NAME } from '../../../../includes/constants'
import Calendar from 'react-calendar';
import { useState } from 'react';
import { footbaldata } from './footballdata';
import MatchCard from './components/matchcard';
 

export default function SportHome(){
    const [calenderValue, onCalenderChange] = useState(new Date());
<style jsx>{`
            list-group-item:hover{
            background-color: grey,
            opacity : 0.9
       }
      `}</style>
    return (
        
        <DashLayout title="Football Manager">
        <div className="section-body mt-3">
           
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                           
                        </div>                        
                    </div>
                </div>
            <div className="row">
                <div className="col-8">

                <MatchCard footbaldata={footbaldata} day="Today" />

                <MatchCard footbaldata={footbaldata} day="Tommorrow" />

                <MatchCard footbaldata={footbaldata} day="Yesterday" />
               
                
                </div>

               
        <div className='col-4'>
            <div>
                    <Calendar onChange={onCalenderChange}  value={calenderValue} />
            </div>
        </div>


            </div>
        
        
        </div>
    </div>
        </DashLayout>
    )
}