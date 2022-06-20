import DashLayout from '../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import User from '../../services/User';
import { ToastContainer, toast } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import { AdminSkeleton } from '../../components/skeleton';
import moment from 'moment';
import swal from 'sweetalert';
export default function Administrators(props){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [gender, setGender] = useState("")
    const [isFormDiabled,setisFormDiabled] = useState(true)
    const [fetchedData, setFetchedData] = useState([])
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [isPageReady, setPageReady] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState({})
    
    const preloader = isFormSubmitted ? <ScaleLoader height={15} color="white" /> : " "


    function roletostring(role){
        if(role == "super"){
            return "Super"
        }else if(role == "ticket"){
            return "Ticket Manager"
        }else if(role == "match"){
            return "Match Manager"
        }else if(role == "post"){
            return "Post Manager"
        }else{
            return "Match Manager"
        }
    }

    useEffect(
        ()=>{
        User.getServerData("/user").then(
             (response)=>{
                    setCurrentAdmin(response.data)
                }).catch(
                (err)=>{

                })
        },[])

    const formJson = {
        "name" : name,
        "email" : email,
        "phone_number" : phone,
        "current_season" : `${new Date().getFullYear()-1}/${new Date().getFullYear()}`,
        "role" : role,
        "gender" : gender,
        "password" : "$2y$10$Rkrxe5WQKbQUAhR6c2S8MuoA/oWwUJHY13H7qIr.dsOzlmTwsvbJO",
        "status" : 0 
    }

    useEffect(
        () => {  
    if(name == "" || email == "" || phone == "" || role == ""){
        setisFormDiabled(true)
    }else{
        setisFormDiabled(false)
    }
        },[name,email,phone,role])

        const diableacount = (user,status)=> { 
            const stats = status === 1 ? 0 : 1
            const msg = status === 1 ? "Disable" : "Enable"
            const formJson = {
                'status' : stats,
                'email' : user
            }
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to "+msg+" This Account ??",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(willDelete => {
                if (willDelete) {
                    User.saveDataToServer(formJson, "/disableadmin").then(
                        (response) =>  {
                            toast.success("Administrator "+msg+"d"+" Successfully")
                            setFormSubmitted(true)
                        }
                    ).catch(
                        (err) => {
                            toast.error("An Error Occcur")
                            setFormSubmitted(true)
                        }
                    )
                }
            })
     
         }

    const handleFormSave = () => {
        setFormSubmitted(true)
        User.saveDataToServer(formJson,"/saveadministrator").then(
            (response)=>{
              toast.success("Administrator Saved Successfully")
              setFormSubmitted(false)
              setEmail("")
              setName(""),
              setPhone("")
            }
        ).catch(
            (err) => {
                setFormSubmitted(false)
                toast.error(err.response.data.message)
            }
        )
    } 

    useEffect(
        ()=> {
            User.getServerData("/getalladministrators").then(
                (response)=>{
                    setFetchedData(response.data)
                    setPageReady(true) 
                }
            ).catch(
                (err) => {
                    
                }
            )
        },[isFormSubmitted])

    return(
<DashLayout title="Administrators">
<div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-md-flex justify-content-between mb-2">
                                    <ul className="nav nav-tabs b-none">
                                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#list"><i className="fa fa-list-ul"></i>Administrators List</a></li>                                        
                                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#addnew"><i className="fa fa-plus"></i> Add New</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
</div>

<div class="section-body">
            <div class="container-fluid">
                <div class="tab-content">
                   { !isPageReady ? <AdminSkeleton /> :
                    <div class="tab-pane fade show active" id="list" role="tabpanel">
                        <div class="row clearfix">
                            {
                            fetchedData?.map(
                                (eachdata) => {
                                    return (
                                        <div class="col-xl-4 col-lg-4 col-md-6">
                                        <div class="card">
                                            <div class="card-body text-center ribbon">
                                                <div class="ribbon-box indigo">{roletostring(eachdata.role)}</div>
                                                <Image src="/user.jpg" className="rounded-circle img-thumbnail w100" alt="Picture of the author" width={500} height={500} />
                                                <h6 class="mt-3 mb-0">{eachdata.name}</h6>
                                                <b>{eachdata.email}</b>
                                                <br />
                                                <b>{eachdata.gender}</b>
                                                <br />
                                                <b>{eachdata.phone_number}</b>
                                               
                                             
                                                <div className="d-flex justify-content-between">
                                                {
                                                currentAdmin?.role ===  "super" ?
                                                <button class="btn btn-primary btn-sm" onClick={()=>diableacount(eachdata?.email, eachdata?.status)}>{eachdata?.status == 1 ? "Disable" : "Enable"}</button>
                                                 : ""
                                                }
                                                <button className="btn btn-info  btn-sm">{eachdata?.status == 1 ? "Active" : "Disabled"}</button>
                                                </div>

                                               

                                                <div class="row text-center mt-4">
                                                    <div class="col-6 border-right">
                                                        <label class="mb-0">Date Joined</label>
                                                        <h6 class="font-10">{moment(eachdata?.created_at).format("LL")}</h6>
                                                    </div>
                                                    <div class="col-6">
                                                        <label class="mb-0">Last Modified</label>
                                                        <h6 class="font-10">{moment(eachdata?.updated_at).format("LL")}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>        
                                    )
                                }
                            )    
                           }


                        </div>
                    </div>
            }


             
                    <div class="tab-pane fade" id="addnew" role="tabpanel">
                        <div class="row">
                            <div class="col-sm-12">

                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Add Administrator</h3>
                                        <div class="card-options ">
                                            <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fa fa-chevron-up"></i></a>
                                            <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fa fa-x"></i></a>
                                        </div>
                                    </div>
                                    
                                    <div class="card-body">
                                        <div class="col clearfix">
                                            <div class="col-lg-12">
                                                <div class="form-group">
                                                    <label>Full Name</label>
                                                    <input type="text" onInput={(e)=>setName(e.target.value)} placeholder="Full Name" class="form-control" />
                                                </div>
                                            </div>
                                           
                                        <div className="row mt-4">
                                            <div class="col-lg-6">
                                                <label>Gender</label>
                                                <select class="form-control show-tick" onChange={(e)=>setGender(e.target.value)}>
                                                    <option value="">-- Gender --</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>

                                            <div class="col-lg-6">
                                                <label>Role</label>
                                                <select class="form-control show-tick" onChange={(e)=>setRole(e.target.value)}>
                                                    <option value=""> --Role --</option>
                                                    <option value="super">Super Administrator</option>
                                                    <option value="ticket">Ticket Manager</option>
                                                    <option value="post">Post Manager</option>
                                                    <option value="match">Match Manager</option>
                                                </select>
                                            </div>
                                        </div>

                            <div className="row mt-4">
                                    <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label>Phone</label>
                                                    <input type="text" value={phone} onInput={(e)=>setPhone(e.target.value)} placeholder="Phone Number" class="form-control" />
                                                </div>
                                    </div>
                                            
                                        <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label>Enter Email</label>
                                                    <input type="text" value={email} onInput={(e)=>setEmail(e.target.value)} placeholder="Email Address" class="form-control" />
                                                </div>
                                        </div>
                            </div>
            
                                           

                                            <div class="col-sm-12">
                                                <button type="submit" disabled={isFormDiabled} onClick={()=> handleFormSave() } className="btn btn-primary d-flex"><span>Submit</span> <span>{preloader}</span></button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    


                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>



        </DashLayout>
    )
}
