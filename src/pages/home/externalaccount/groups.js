import DashLayout from '../../../components/dashlayout';
import React, { useEffect, useState, useCallback} from 'react';
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
import { LoadingSkeleton } from '../../../components/skeleton';
import {UPLOAD_URL_DIR_PICTURE, UPLOAD_URL_LOGO, UPLOAD_URL_ID} from '../../../includes/constants';
import ImageViewer from 'react-simple-image-viewer';

export default function Groups(props){
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [fetchedData,setFetchedData] = useState([]);
    const [keyword,setKeyword] = useState("");
    const [disable, setDisable] = useState(false)
    const [pageReady, setPageReady] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [showPerPage, setPostPerPage] = useState(1)
    const [smodal, showDataModal] = useState(false)
    const [showViewer, setShowViewer] = useState(false)
    const [selectedplayer, setSelectedPlayer]= useState({})
    const usersToShow = currentPage * showPerPage
    const indexOfLastUser = currentPage * showPerPage
    const indexOfFirstUser = indexOfLastUser - showPerPage

    const images = [
        UPLOAD_URL_DIR_PICTURE.concat(selectedplayer?.director_pic),
        UPLOAD_URL_ID.concat(selectedplayer?.director_identity),
        UPLOAD_URL_LOGO.concat(selectedplayer?.club_logo)
      ];

      const openImageViewer = useCallback((index) => {
        showDataModal(false)
        setCurrentImage(index);
        setIsViewerOpen(true);
       
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
        showDataModal(true)
      };
    
    const onChangeHandler = event => {
        setAmount(event.target.value);
      };

    let number_of_page = Math.ceil(fetchedData?.length / showPerPage)

      const filteredusers = fetchedData?.filter( (eachdata) => 
         eachdata.sport_dir_name.includes(keyword)
      )

    const userstoshow = filteredusers.slice(indexOfFirstUser, indexOfLastUser)

      const handleDisable = (user,status,name) => {
          const formData = {
              "player" : user,
              "status" : status
          }
          const sta = status == 1 ? "Enable" : "Disable"
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to "+ sta + name+" On the Players List",
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

    const handleApproval = (type,action,detail) => {
        const formData = {
            "type" : type,
            "exact" : action,
            "vid" : selectedplayer?.id,
        }
        const sta = type == 1 ? "Approve" : "DisApprove"
      swal({
          title: "Are you sure?",
          text: "Are you sure that you want to "+ sta + " " + detail,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(willDelete => {
          if (willDelete) {
              User.saveDataToServer(formData, "/verifygroup").then(
                  (response) =>  {
                      toast.success("Data Updated Successfully")
                      setDisable(true)
                      setSelectedPlayer(response.data.data)
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
            User.getServerData("/getallgroups/all").then(
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
<DashLayout title="Groups">
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
                <div><a href="javascript:void(0);">{eachuser.sport_dir_name}</a></div>
            </td>
            <td className="hidden-xs">
                <div className="text-muted">{eachuser.address}</div>
                <div className="text-muted">{
                eachuser.is_picture_verified  == 1 &&   eachuser.is_id_verified == 1 &&  eachuser.is_logo_verified == 1  ?
                <span className="tag tag-danger">Verified</span>:
                <span className="tag tag-success">Not verified</span>
                }</div>

                
            </td>
            <td className="hidden-sm">
                <div className="text-muted">  </div>                                                
            </td>
            <td className="text-right">
              <a className="btn btn-info btn-link" onClick={() => showModal(eachuser)} data-toggle="tooltip" title="View Identity"><i><FcViewDetails /></i></a>
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

{isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          onClose={ closeImageViewer }
        />
      )}


            <Modal show={smodal}  onHide={() => true}>
                    <Modal.Header><h6>{"Uploads"}</h6></Modal.Header>
                    <Modal.Body>
                        <br />
                        <div>
                        <table class="table">
                        <tbody>
                       
                        <tr>
                            <td className="text-success">Director's Picture</td>
                            <td><a onClick={ () => openImageViewer(0) } style={{cursor : "pointer"}} className="tag tag-danger">View</a></td>
                            <td><span className={selectedplayer?.is_picture_verified == 0 ? "tag tag-success" : "tag tag-danger"}>{selectedplayer?.is_picture_verified == 0 ? "Not Approved" : "Approved"}</span></td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>handleApproval(1,"is_picture_verified", "Director's Picture")}>Approve</button>
                                <button className="btn btn-danger" onClick={()=>handleApproval(0,"is_picture_verified", "Director's Picture")}>Reject</button>    
                            </td>
                        </tr>

                        <tr>
                            <td className="text-warning">Director ID Card</td>
                            <td><a onClick={ () => openImageViewer(1)} style={{cursor : "pointer"}} className="tag tag-danger">View</a></td>
                            <td><span className={selectedplayer?.is_id_verified == 0 ? "tag tag-success" : "tag tag-danger"}>{selectedplayer?.is_id_verified == 0 ? "Not Approved" : "Approved"}</span></td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>handleApproval(1,"is_id_verified", "Director's Identity")}>Approve</button>
                                <button className="btn btn-danger" onClick={()=>handleApproval(0,"is_id_verified", "Director's Identity")}>Reject</button>    
                            </td>
                        </tr>


                        <tr>
                            <td className="text-success">Club Logo</td>
                            <td><a onClick={ () => openImageViewer(2) } style={{cursor : "pointer"}} className="tag tag-danger">View</a></td>
                            <td><span className={selectedplayer?.is_logo_verified == 0 ? "tag tag-success" : "tag tag-danger"}>{selectedplayer?.is_logo_verified == 0 ? "Not Approved" : "Approved"}</span></td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>handleApproval(1,"is_logo_verified", "Club Logo")}>Approve</button>
                                <button className="btn btn-danger" onClick={()=>handleApproval(0,"is_logo_verified", "Club Logo")}>Reject</button>        
                            </td>
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
