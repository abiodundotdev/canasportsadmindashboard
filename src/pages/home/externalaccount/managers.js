import DashLayout from '../../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import {GrTransaction} from 'react-icons/gr'
import { GiShield, GiShieldDisabled } from 'react-icons/gi';
import {BsFillShieldFill} from 'react-icons/bs'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import {FcViewDetails} from 'react-icons/fc'
import User from '../../../services/User';
import Modal from "react-bootstrap/Modal";
import { getclubname } from '../../../components/appmethods';
import { LoadingSkeleton } from '../../../components/skeleton';

export default function Players(props){
    const [amount, setAmount] = useState(0);
    const [fetchedData,setFetchedData] = useState([]);
    const [keyword,setKeyword] = useState("");
    const [disable, setDisable] = useState(false)
    const [pageReady, setPageReady] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [showPerPage, setPostPerPage] = useState(1)
    const [smodal, showDataModal] = useState(false)
    const [selectedplayer, setSelectedPlayer]= useState({})
    const usersToShow = currentPage * showPerPage
    const indexOfLastUser = currentPage * showPerPage
    const indexOfFirstUser = indexOfLastUser - showPerPage

    
    const onChangeHandler = event => {
        setAmount(event.target.value);
      };

    let number_of_page = Math.ceil(fetchedData?.length / showPerPage)

      const filteredusers = fetchedData?.filter( (eachdata) => 
      eachdata.name.includes(keyword) || eachdata.email.includes(keyword) || eachdata.phone_number.includes(keyword)
      )

    const userstoshow = filteredusers.slice(indexOfFirstUser, indexOfLastUser)

      const handleDisable = (user,status,name) => {
          const formData = {
              "player" : user,
              "status" : status
          }
          const sta = status == 1 ? "Verifi" : "Unverifi"
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to "+ sta +"y "+name+" On the Players List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                User.saveDataToServer(formData, "/disableplayer").then(
                    (response) =>  {
                        toast.success("User "+sta+"d"+" Successfully")
                        setDisable(true)
                    }
                ).catch(
                    (err) => {
                        toast.error("An Error Occcur")
                        setDisable(true)
                    }
                )
            }
        })
    }

    useEffect(
        () => {
            User.getServerData("/getallplayers").then(
                (response)=>{
                    setFetchedData(response.data) 
                    setPageReady(true);
                }
            ).catch(
                (err) => {
                    
                }
            )
        },[disable])

    function showModal(user){
            setSelectedPlayer(user);
            showDataModal(true)
           
    }


return(
<DashLayout title="Players">
<div className="section-body mt-3">
<div className="card">
        <div className="card-body">
        <div className="input-group mt-2">
            <input type="text" value={keyword} onInput={(e) => setKeyword(e.target.value)} className="form-control search" placeholder="Search by Email or Name" />
        </div>
       
    </div>
</div>

{
!pageReady ? <LoadingSkeleton length={10} /> : 

<div className="table-responsive" id="users">
<table className="table table-hover table-vcenter text-nowrap table_custom border-style list">
<tbody>
   {
    userstoshow?.map( (eachuser)=> {
        return (
            <tr className="">
            <td className="width35 hidden-xs">
                <a className="mail-star"><i className="fa fa-star"></i></a>
            </td>
            <td className="text-center width40">
                <div className="avatar d-block">
                    <img className="avatar" src="/user.jpg" alt="avatar" />
                </div>
            </td>
            <td>
                <div><a href="javascript:void(0);">{eachuser.name}</a></div>
                <div className="text-muted">{eachuser.jersey_number}</div>
            </td>
            <td className="hidden-xs">
                <div className="text-muted">{eachuser.email}</div>
                <div className="text-muted">{
                eachuser.status == "verified" ?
                <span className="tag tag-danger">Verified</span>:
                <span className="tag tag-success">Unverified</span>
                }</div>
            </td>
            <td className="hidden-sm">
                <div className="text-muted">{
                //(getclubname(eachuser?.club_info_id))
                "Koyote"
                }</div>                                                
            </td>
            <td className="text-right">
              <a className="btn btn-info btn-link" onClick={() => showModal(eachuser)} data-toggle="tooltip" title="View Player"><i><FcViewDetails /></i></a>
               {
                eachuser.status == 1 ?
                <a className="btn btn-primary ml-2" onClick={() => handleDisable(eachuser.id, 0, eachuser.name)} data-toggle="tooltip" title="Disable"><i><GiShieldDisabled /> </i></a>
                :
                <a className="btn btn-primary ml-2" onClick={() => handleDisable(eachuser.id, 1, eachuser.name)} data-toggle="tooltip" title="Enable"><i><BsFillShieldFill /> </i></a>
               }
                </td>
        </tr>
        )
    })  
}

</tbody>
</table>
<div className="d-flex justify-content-center">
<nav aria-label="Page navigation example">
    <ul className="pagination pagination justify-content-center">
    {
          currentPage <= 1 ? "" :  <li className="page-item"><a className="page-link" onClick={()=>setCurrentPage(currentPage-1)}>Previous</a></li>
    }
    {
    Array.apply(0, Array(number_of_page)).map(function (x, i) {
    return <li key={i+1} className={"page-item "+currentPage == i+1 ? "active" : ""}><a className="page-link" onClick={()=>setCurrentPage(i+1)} >{i+1}</a></li>
  })
    }
     {
    currentPage >=  number_of_page ? "" :
    <li className="page-item"><a className="page-link" onClick={()=>setCurrentPage(currentPage+1)} >Next</a></li>
     }
    </ul>
</nav>
</div>

    </div>

}


            <Modal show={smodal}  onHide={() => true}>
                    <Modal.Header><h6>{selectedplayer?.name + " Profile"}</h6></Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                           <img width={100} height={100} src="//skldk" />      
                        </div>
                        <br />
                        <div>
                        <table class="table">
                        <tbody>
                        <tr>
                            <td className="text-success">FullName</td>
                            <td>{selectedplayer?.name}</td>
                        </tr>

                        <tr>
                            <td className="text-success">State</td>
                            <td>{selectedplayer?.state}</td>
                        </tr>

                        <tr>
                            <td className="text-success">City</td>
                            <td>{selectedplayer?.city}</td>
                        </tr>

                        <tr>
                            <td className="text-success">Age</td>
                            <td>{selectedplayer?.age}</td>
                        </tr>


                        <tr>
                            <td className="text-success">DOB</td>
                            <td>{selectedplayer?.date_of_birth}</td>
                        </tr>



                        <tr>
                            <td className="text-success">Gender</td>
                            <td>{selectedplayer?.sex}</td>
                        </tr>


                        <tr>
                            <td className="text-success">Jersey Name</td>
                            <td>{selectedplayer?.jersey_name}</td>
                        </tr>

                        </tbody>
                        </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <button onClick={()=>showDataModal(false)} className="btn btn-primary">Close</button>
                    </Modal.Footer>
            </Modal>

</div>
    </DashLayout>
    )
}
