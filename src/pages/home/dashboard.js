import DashLayout from '../../components/dashlayout';
import React, {useContext,useEffect,useState} from 'react'
import { APP_NAME } from '../../includes/constants';
import Image from 'next/image';
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'
import MatchListCard from './sports/football/components/matchlist';
import User from '../../services/User';
//import { userContext } from '../../includes/context';
export default function Dashboard(){
    const [user, setUser] = useState({});
    const [upcoming, setUpcoming] = useState([])
    const [live, setLive] = useState([])
    const [lf, setLf] = useState([])
    const [isdataloaded, setDataloaded] = useState(false)
    const date = new Date().getHours()
    const stateUser = useSelector(state => state.user)
    
    useEffect(() => {
        const authUser =  JSON.parse(localStorage.getItem("userAuth"));
        setUser(authUser);

        User.getServerData("/getuplivejustconcluded").then(
            (response)=>{
                setDataloaded(true)
                setUpcoming(response.data.upcoming)
                setLive(response.data.live)
                setLf(response.data.fiveconcluded)
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
      },[]);

    return(
        
        <DashLayout title="Dashboard">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                        <h4 style={{fontSize : '20px', fontWeight: 'bolder'}} className="text-capitalize">Hi {date < 12 ? 'Good Morning ' : date < 18 ? 'Good Afternoon ' : 'Good Evening '} {
                            user.name
                        }</h4>
                            <i>We assume you have missed alot check out Our Amazing features below</i>
                        </div>                        
                    </div>
            </div>

            {
            //Second Menu
            }

            <div className="row clearfix row-deck">

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Leagues</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 text-center">10</h5>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Teams</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">17</h5>
                             </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Matches</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">12</h5>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Players</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">19</h5>
                             </div>
                        </div>
                    </div>
                  
                </div>

           <br />
           <br />


            <div className="row clearfix row-deck">
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={upcoming} day="Upcoming Matches"  isitemfounded={isdataloaded} />     
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={live} day = "Live Matches" isitemfounded={isdataloaded} />  
                </div>


                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={lf} day="Recently Finished" isitemfounded={isdataloaded} />
                </div>
 
            </div>

<br />
<br />
        


        
        
        </div>
        </div>
        </DashLayout>
    )
}
