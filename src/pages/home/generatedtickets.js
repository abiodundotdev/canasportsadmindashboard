import DashLayout from '../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import User from '../../services/User'
import { ToastContainer, toast } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import {RiSaveFill} from 'react-icons/ri'
import useSWR, {mutate,trigger} from 'swr'
import { LoadingSkeleton } from '../../components/skeleton';


export default function GenerateTicket(props){
    const [match_id, setMatch_id] = useState("");
    const [nTicket, setNTicket] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isSaved, setIsSaved] = useState(false)
    const [isGenSuccess, setIsGenSuccess] = useState(false)
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [fetchedData, savefetchedData] = useState([])
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [isFormDiabled, setisFormDiabled] = useState(true)
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    const {data : listallclubs} = useSWR("/listallclubs");
    const [pageReady,setpageReady] = useState(false);
   
     const formJson = {
        "match_id" : selectedMatch?.match_id,
        "price" : price,
        "nticket" : nTicket,
        "description" : description,
        "status" : 1
    }

    function getClubName(clubid){
        const found = (listallclubs||[]).find(
             (eachclub) => eachclub.id == clubid
         )
         return found?.team_name
     }

     function ongenerateclick(match){
        setSelectedMatch(match)
        setIsGenSuccess(true)
        setPrice("")
        setNTicket("")
        setDescription("")
     }

    useEffect(
        () => {  
    if(price == "" || nTicket == ""){
        setisFormDiabled(true)
    }else{
        setisFormDiabled(false)
    }
        },[price,nTicket])

    const handleFormSubmit = () => {
        setFormSubmitted(true)
        User.saveDataToServer(formJson,"/saveticketgenerated").then(
            (res) => {
                toast.success("New Ticket Generated for Match Successfully")
                setFormSubmitted(false)
                setIsSaved(true)
                setPrice("")
                setNTicket("")
                setDescription("")
            }
        ).catch(
            (err) => {
                setFormSubmitted(false)
                toast.error(err.response.data.message)
            }
        )
    }
        useEffect(
            () => {
               User.getServerData("/generatenonplaymatch").then(
                   (response) => {
                        savefetchedData(response.data)
                        setpageReady(true)
                   }
               ).catch(
                   (err)=> {
                        console.log(err)
                   }
               )
            },[])

    
    

    return(
        <DashLayout title="Generate Ticket">
        <div className="section-body mt-3">
            <h6 className="text-center text-warning">Generated Tickets</h6>
            <div className="container-fluid">
               
    <div class="row">
        <div className="col-lg-7">
        <div className="card">
               <div className="card-header">
                   <h6 className="card-title">Recently Added Matches</h6>
               </div>
              {
                !pageReady ? <LoadingSkeleton length={5} /> :
               <div className="card-body table-responsive">
               <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" ><small>Id</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Date</small></th>
                        <th scope="col" rowSpan="1" title="Goal Difference"><small> Units</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Amount</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Units reserved</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Units left</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Description</small></th>
                        <th scope="col" rowSpan="1" title="Action"><small>Action</small></th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                          fetchedData?.map(
                              (eachdata) => {
                                  return (
                                  <tr> 
                                      <td>{eachdata.match_id}</td>
                                       <td>{getClubName(eachdata.team_a)}</td>
                                        <td>{getClubName(eachdata.team_b)}</td>
                                         <td>{eachdata.match_day+ "@" + eachdata.match_time}</td>
                                         <td>{eachdata.pitch}</td>
                                          <td className="btn-group">
                                              <button style={{fontSize : "10px"}} onClick={()=>ongenerateclick(eachdata)} className="btn btn-primary btn-sm">Generate Ticket</button>
                                              <a style={{fontSize : "10px"}} className="btn btn-warning btn-sm">Update</a>
                                          </td>
                                    </tr>
                                  )
            
                              }
                          )
                      }
                    </tbody>
                </table>
               </div>

               }

           </div>
        </div>

        <div className="col-lg-5">
            {
            isGenSuccess ?                
            <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Generate Ticket</h3>
                </div>
        <div className="card-body">
            <div className="">
                <div className="form-group">
                    <label for="formGroupExampleInput">Match ID</label>
                    <input type="text" value={selectedMatch?.match_id} onInput={(e) => setName(e.target.value)}  className="form-control" id="name" placeholder="Pitch Name" disabled/>
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Team A  VS Team B</label>
                    <input type="text" value={ getClubName(selectedMatch?.team_a) + " VS " + getClubName(selectedMatch?.team_b)} onInput={(e) => setWidth(e.target.value)} className="form-control" id="width" placeholder="Width"  disabled/>
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Number of Tickets/Seats</label>
                    <input type="number" value={nTicket} onInput={(e) => setNTicket(e.target.value)} className="form-control" id="height" placeholder="Number of Seat" />
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Ticket Price</label>
                    <input type="number" value={price} onInput={(e) => setPrice(e.target.value)} className="form-control" id="height" placeholder="Price Per Ticket" />
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Total Amount</label>
                    <input type="number" value={nTicket * price} className="form-control" id="height" placeholder="Total" readOnly/>
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Description</label>
                    <input type="text" value={description} onInput={(e) => setDescription(e.target.value)} className="form-control" id="descrption" placeholder="Description" />
                </div>

                <div className="form-group d-flex justify-content-center">
                <button onClick={handleFormSubmit} className="btn btn-success mt-10 text-center d-flex" disabled={isFormDiabled}><i className="mr-2"><RiSaveFill /></i> <small className="mr-2">SAVE</small> {preloader}  </button>
            </div>
            
            </div>
            </div>
            </div>
        : " " }
        </div>



    </div>


        

        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
