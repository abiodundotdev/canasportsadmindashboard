import DashLayout from '../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import User from '../../services/User';


export default function Dashbaord(props){
    const [fetchedData, setFetchedData] = useState([])
    const [user, setUser] = useState({})
    const [oldpassword, setoldpassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [confirmMessage, setConfirmMessage] = useState("")
    const [formDisabled, setFormDisabled] = useState(true)
    const [season, setSeason] = useState("")
    const [season1, setSeason1] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [season2, setSeason2] = useState("")
    
    
    useEffect(
        ()=>{
            setUser(JSON.parse(localStorage.getItem("userAuth")))
            console.log(localStorage.getItem("userAuth"))
            setSeason1(localStorage.getItem("current_season").split("/")[0])
            setSeason2(localStorage.getItem("current_season").split("/")[1])
        },[])

        useEffect(
            ()=>{
                if(oldpassword== "" || newPassword == "" || confirmPassword == "" || newPassword !== confirmPassword){
                    setFormDisabled(true)
                    setDisabled(true)
                }else{
                    setFormDisabled(false)
                    setDisabled(false)
                }
            },[oldpassword,newPassword,confirmPassword])
    
    useEffect(
        ()=>{
            if(newPassword !== confirmPassword){
                setConfirmMessage("Password Do Not")
            }else{
                setConfirmMessage("")
            }
        },[confirmPassword])
        
        const formJson = {
            "oldpassword" : oldpassword,
            "newpassword" : newPassword
        }
        
        function roletostring(role){
            if(role == "super"){
                return "Super Administrator"
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
    
        function handleChangePassword(){
           setDisabled(true)
           User.saveDataToServer(formJson, "/changepassword").then(
               (response)=>{
                    setDisabled(false)
                    toast.success("Password Changed Successfully")
               }
           ).catch(
               (err) => {
                setDisabled(false)
                toast.error(err.response.data.message)
               }
           )
        }

        function updateSeason(){
            User.saveDataToServer({"season" : season1+"/"+season2}, "/updateseason").then(
                (response)=> {
                    toast.success("Season Updated Successully")
                }
            ).catch(
                (err)=>{
                    toast.error("An Error Occur")
                }
            )
        }
    

    return(
        <DashLayout title="Profile">
<div className="section-body mt-3">
      <div className="row">
<div className="col-lg-5">
    <div className="card">
    <div className="card-header">
                <h6 className="card-title">Profile</h6>
    </div>
        
    <div class="card-body">
        <div class="row clearfix">
            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Name" value={user?.name} disabled/>
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" value={user?.email} placeholder="Email" disabled/>
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Role</label>
                    <input type="email" class="form-control" value={roletostring(user?.role)} placeholder="Role" disabled/>
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="number" class="form-control" value={user?.phone_number} placeholder="Number" disabled/>
                </div>
            </div>
        </div>
    </div>
</div>


<div className="card">
    <div className="card-header">
        <h2 className="card-title">Update Season</h2>
    </div>

<div className="card-body">
    <div class="form-group">
        <label class="form-label">Season</label>
        <div className="row">
        <input type="number" class="form-control col-4"  onInput={(e)=>setSeason1(e.target.value)} value={parseInt(season1)} placeholder="Season" />
        <input type="number" class="form-control col-4"  onInput={(e)=>setSeason2(e.target.value)} value={parseInt(season2)} placeholder="Season" />
        </div>
    </div>

    <div class="form-group">
       <button className="btn btn-primary" onClick={updateSeason}>Update Season</button>
    </div>
</div>

</div>

    </div>


<div className="col-lg-2"></div>


    <div className="col-lg-5">
        <div className="card">
            <div className="card-header">
                <h6 className="card-title">Change Password</h6>
        </div>
        
    <div class="card-body">
        <div class="">
            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Old Password</label>
                    <input type="password" onInput={(e)=>setoldpassword(e.target.value)} class="form-control" placeholder="Old Password" value={oldpassword} />
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
                    <label class="form-label">New Password</label>
                    <input type="password" onInput={(e)=>setnewPassword(e.target.value)} class="form-control" value={newPassword} placeholder="New Password" />
                    <b className="text-danger text-center">{confirmMessage}</b>
                </div>
               </div>

           <div class="col-12">
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" onInput={(e)=>setconfirmPassword(e.target.value)} class="form-control" value={confirmPassword} placeholder="Confirm Password" />
                </div>
            </div>   
        </div>
    </div>

    <div class="card-footer text-right">
        <button type="submit" onClick={handleChangePassword} class="btn btn-primary" disabled={disabled}>Update Password</button>
    </div>

    </div>
    </div>


   </div>         
</div>



        </DashLayout>
    )
}
