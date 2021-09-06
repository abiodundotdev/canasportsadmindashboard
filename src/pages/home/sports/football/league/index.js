import DashLayout from '../../../../../components/dashlayout'
import User from '../../../../../services/User'
import { useEffect, useState } from 'react';
import CustomDataCard from '../../../../../components/cardcomponent';
import {BsInfoCircle} from 'react-icons/bs'
import {useRouter} from 'next/router'
import {AiFillFileAdd} from 'react-icons/ai'
import RiseLoader from 'react-spinners/RiseLoader';
import Link from 'next/link';

export default function SportHome(){
    const [leagues,setLeagues] = useState(null)

    useEffect(
        () =>{
            User.getServerData("/getleaguelist")
            .then( (response)=>{
                console.log(response.data);
                setLeagues(response.data)
            })
            .catch((response)=>{
                console.log(response);
            })
        },[])

    return (
        
        <DashLayout title="League Manager">
        <div className="section-body mt-3">
           
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                           <div className="alert alert-info d-flex">
                             <h6> <i className="mr-10"><BsInfoCircle /></i>  Please Note The League Data Below corresponds to the Current Season !!  </h6>
                           </div>
                        </div>                        
                    </div>
                </div>
           
                <div className="container">
                    <div className="d-flex justify-content-end mb-2"> 
                        <Link href="/home/sports/football/addnewleague"><button className="btn btn-primary"><i><AiFillFileAdd /></i> Add New League</button></Link>
                    </div>


                    <div className="row clearfix row-deck d-flex justify-content-around">

                    
                    {
                        
                       !leagues ? <div className="d-flex justify-content-center"> <RiseLoader /> </div> : leagues.map( 
                            (league) => {
                              return (
                                  <CustomDataCard data={league} />
                              )
                            }
                         )
                         
                    }

                    </div>
                
                </div>
               
        
        </div>
    </div>
        </DashLayout>
    )
}