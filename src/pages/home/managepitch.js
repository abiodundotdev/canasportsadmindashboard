import DashLayout from '../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import User from '../../services/User'
import { ToastContainer, toast } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import {RiSaveFill} from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa';

export default function Dashbaord(props){
    const [name, setName] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [description, setDescription] = useState("");
    const [isSaved, setIsSaved] = useState(false)
    const [fetchedData, savefetchedData] = useState([])
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [isFormDiabled, setisFormDiabled] = useState(true)
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    
     const formJson = {
        "name" : name,
        "width" : width,
        "height" : height,
        "description" : description,
        "status" : 1
    }

    useEffect(
        () => {  
    if(name == "" || width == "" || height == "" || description == ""){
        setisFormDiabled(true)
    }else{
        setisFormDiabled(false)
    }
        },[name,width,height,description])

    const handleFormSubmit = () => {
        setFormSubmitted(true)
        User.saveDataToServer(formJson,"/savepitch").then(
            (res) => {
                toast.success("New Pitch Added Successfully")
                setFormSubmitted(false)
                setIsSaved(true)
            }
        ).catch(
            (err) => {
                toast.error("Something  went Wrong")
            }
        )
    }
        useEffect(
            () => {
               User.getServerData("/getpitch").then(
                   (response) => {
                        savefetchedData(response.data)
                   }
               ).catch(
                   (err)=> {
                        console.log(err)
                   }
               )
            },[])

        useEffect(
            () => {
               User.getServerData("/getpitch").then(
                   (response) => {
                        savefetchedData(response.data)
                   }
               ).catch(
                   (err)=> {
                        console.log(err)
                   }
               )
        },[isSaved])
    
    

    return(
        <DashLayout title="Manage Pitch">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h4>Manage Pitch</h4>
                        </div>                        
                    </div>
                </div>
    <div class="row">
        <div className="col-lg-6">
            <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Add New Pitch</h3>
                </div>
        <div className="card-body">
            <div className="">
                <div className="form-group">
                    <label for="formGroupExampleInput">Pitch Name</label>
                    <input type="text" value={name} onInput={(e) => setName(e.target.value)}  className="form-control" id="name" placeholder="Pitch Name" />
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Width</label>
                    <input type="text" value={width} onInput={(e) => setWidth(e.target.value)} className="form-control" id="width" placeholder="Width" />
                </div>


                <div className="form-group">
                    <label for="formGroupExampleInput">Length</label>
                    <input type="number" value={height} onInput={(e) => setHeight(e.target.value)} className="form-control" id="height" placeholder="Length" />
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Description</label>
                    <input type="text" value={description} onInput={(e) => setDescription(e.target.value)} className="form-control" id="descrption" placeholder="Description" />
                </div>

            <div className="form-group d-flex justify-content-center">
                <button onClick={handleFormSubmit} className="btn btn-success mt-10 text-center d-flex" disabled={isFormDiabled}><i className="mr-2"><RiSaveFill /></i> <small className="mr-2">ADD NEW PITCH</small> {preloader}  </button>
            </div>
            
            </div>
            </div>
            </div>
        </div>

        <div className="col-lg-6">
        <div className="card">
               <div className="card-header">
                   <h6 className="card-title">Pitch</h6>
               </div>
                    
               <div className="card-body">
               <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" ><small>Name</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Width</small></th>
                        <th scope="col" rowSpan="1" title="Goal Difference"><small>Length</small></th>
                        <th scope="col" rowSpan="1" title="Points"><small>Description</small></th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                          fetchedData?.map(
                              (eachdata) => {
                                  return <tr> <td>{eachdata.name}</td> <td>{eachdata.width}</td> <td>{eachdata.height}</td> <td>{eachdata.description}</td> </tr>
                              }
                          )
                      }
                    </tbody>
                </table>
               </div>

           </div>
        </div>



    </div>


        

        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
