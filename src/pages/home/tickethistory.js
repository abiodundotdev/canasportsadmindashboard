import { useEffect, useState } from 'react';
import DashLayout from '../../components/dashlayout';
import User from '../../services/User';
export default function TicketHistory(props){
    const [fetchedData, savefetchedData] = useState([])
    useEffect(
        () => {
           User.getServerData("/getallgenticket").then(
               (response) => {
                    savefetchedData(response.data)
               }
           ).catch(
               (err)=> {
                    console.log(err)
               }
           )
        },[])

    return(
        <DashLayout title="Ticket History">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h6>Match Ticket History</h6>
                        </div>                        
                    </div>
                </div>
        
        <div class="row clearfix contanier-fluid">
                
                <div class="col-xl-10 col-lg-10 col-md-10">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Ticket History</h3>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped text-nowrap table-vcenter mb-0">
                                        <thead>
                                            <tr>
                                                <th>Match ID</th>
                                                <th>Number of Seats</th>
                                                <th>Amount</th>
                                                <th>Booked Tickets</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                           fetchedData?.map(
                                              (eachdata) => {
                                                  return (
                                                    <tr>
                                                    <td>{eachdata.match_id}</td>
                                                    <td>{eachdata.nticket}</td>
                                                    <td>{eachdata.price}</td>
                                                    <td>0</td>
                                                </tr>
                                                  )
                                              } 
                                           )
                                            }       

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

            
        <div className="col-xl-2 col-lg-2 col-md-2">
            <div className="card">
                <div class="card-header">
                    <h3 class="card-title">Sort</h3>
            </div>    
                   <label> <input type="radio" name="sort" /> All</label>
                   <label> <input type="radio" name="sort" /> Sold Out</label>
            </div>
        </div>

    </div>

    
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
