import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import {RiSaveFill} from 'react-icons/ri'
import User from '../../../../services/User';
import DashLayout from '../../../../components/dashlayout';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { LoadingSkeleton } from '../../../../components/skeleton';
import { FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';


export default function Dashbaord(props){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState("");
    const [isSaved, setIsSaved] = useState(false)
    const [fetchedData, savefetchedData] = useState([])
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [isFormDiabled, setisFormDiabled] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    const [pageReady, setPageReady] = useState(false)
    const [image, setImage] = useState("")
    
     const formJson = {
        "league_name" : name,
        "team_number" : team,
        "start_date" : moment(startDate).format("LL"),
        "description" : description,
        "end_date" : moment(endDate).format("LL"),
        "status" : 1
    }

    useEffect(
        () => {  
    if(name == "" || description == "" || team){
        setisFormDiabled(true)
    }else{
        setisFormDiabled(false)
    }
        },[name,description])

    const handleFormSubmit = () => {
        setFormSubmitted(true)
        User.saveDataToServer(formJson,"/saveleaguename").then(
            (res) => {
                toast.success("New League Added Successfully")
                setFormSubmitted(false)
                setisFormDiabled(false)
                setIsSaved(true)
            }
        ).catch(
            (err) => {
                toast.error("Something  went Wrong")
                setisFormDiabled(false)
                setFormSubmitted(false)
            }
        )
    }
        useEffect(
            () => {
               User.getServerData("/getleaguelist").then(
                   (response) => {
                        savefetchedData(response.data)
                        setPageReady(true);
                   }
               ).catch(
                   (err)=> {
                        console.log(err)
                   }
               )
            },[])

        useEffect(
            () => {
               User.getServerData("/getleaguelist").then(
                   (response) => {
                        savefetchedData(response.data)
                   }
               ).catch(
                   (err)=> {
                        console.log(err)
                   }
               )
        },[isSaved])
    
        function deleteLeague(name, id){
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to Delete "+name+" From the List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(willDelete => {
                if (willDelete) {
                    User.saveDataToServer({'id' : id}, "/deleteleague").then(
                        (response) =>  {
                            toast.success(name+" League Deleted Successfully")
                            savefetchedData(response.data.leagues)
                        }
                    ).catch(
                        (err) => {
                           // toast.error("An Error Occcur Deeee")
                        }
                    )
                }
            })
        }
    

    return(
        <DashLayout title="Manage League">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h4>Manage League</h4>
                        </div>                        
                    </div>
                </div>
    <div class="row">
        <div className="col-lg-6">
            <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Add New League</h3>
                </div>
        <div className="card-body">
            <div className="">
                <div className="form-group">
                    <label for="formGroupExampleInput">League Name</label>
                    <input type="text" value={name} onInput={(e) => setName(e.target.value)}  className="form-control" id="name" placeholder="Name" />
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Start Date</label> <br />
                    <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                </div> 


                <div className="form-group">
                    <label for="formGroupExampleInput">End Date</label> <br />
                    <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                </div> 

                <div className="form-group">
                    <label for="formGroupExampleInput">Description</label>
                    <input type="text" value={description} onInput={(e) => setDescription(e.target.value)} className="form-control" id="descrption" placeholder="Description" />
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">League Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.value)} className="form-control" id="descrption" placeholder="Description" />
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Maximum Number of Teams</label>
                    <input type="text" value={team} onInput={(e) => setTeam(e.target.value)} className="form-control" id="descrption" placeholder="Team Number" />
                </div>

                <div className="form-group d-flex justify-content-center">
                <button onClick={handleFormSubmit} className="btn btn-success mt-10 text-center d-flex" disabled={isFormDiabled}><i className="mr-2"><RiSaveFill /></i> <small className="mr-2">ADD NEW LEAGUE</small> {preloader}  </button>
            </div>
            
            </div>
            </div>
            </div>
        </div>

        <div className="col-lg-6">

{
    !pageReady ? <LoadingSkeleton length={10}/> :  <div className="card">
               <div className="card-header">
                   <h6 className="card-title">Leagues</h6>
               </div>
                    
               <div className="card-body">
               <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" ><small>Name</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Team Number</small></th>
                        <th scope="col" rowSpan="1" title="Goal Difference"><small>Start Date</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>End Date</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>League ID</small></th>
                        <th scope="col" rowSpan="1" title="Action"><small>Action</small></th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                          fetchedData?.map(
                              (eachdata) => {
                                  return <tr> <td>{eachdata.league_name}</td> <td>{eachdata.team_number}</td> <td>{eachdata.start_date}</td> <td>{eachdata.end_date}</td>  <td>{eachdata.league_id}</td> <td style={{cursor : "pointer"}} onClick={()=>deleteLeague(eachdata.league_name,eachdata.id)}><i><FaTrash /></i></td> </tr>
                              }
                          )
                      }
                    </tbody>
                </table>
               </div>

           </div>

    }
        </div>



    </div>


        

        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
