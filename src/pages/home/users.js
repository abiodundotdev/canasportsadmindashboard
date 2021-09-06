import DashLayout from '../../components/dashlayout';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import User from '../../services/User';
import {GrTransaction} from 'react-icons/gr'
import { GiShield, GiShieldDisabled } from 'react-icons/gi';
import {BsFillShieldFill} from 'react-icons/bs'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import {LoadingSkeleton} from '../../components/skeleton';

export default function Dashbaord(props){
    const [amount, setAmount] = useState(0);
    const [fetchedData,setFetchedData] = useState([]);
    const [keyword,setKeyword] = useState("");
    const [disable, setDisable] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [showPerPage, setPostPerPage] = useState(3)
    const usersToShow = currentPage * showPerPage
    const [pageLoaded,setPageLoaded] = useState(false);
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

      const handleDisable = (user,status) => {
          const formData = {
              "user" : user,
              "status" : status
          }
          const sta = status == 1 ? "Enable" : "Disable"
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to "+ sta +" "+user+" On the Users List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                User.saveDataToServer(formData, "/disableuser").then(
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
        User.getServerData("/getallusers").then(
            (response)=>{
                setFetchedData(response.data)
                setPageLoaded(true);
            }
        ).catch(
            (err) => {

            }
        )
    },[])

    useEffect(
        () => {
            User.getServerData("/getallusers").then(
                (response)=>{
                    setFetchedData(response.data) 
                }
            ).catch(
                (err) => {
    
                }
            )
        },[disable])

return(
<DashLayout title="Users">
<div className="section-body mt-3">
<div className="card">
        <div className="card-body">
        <div className="input-group mt-2">
            <input type="text" value={keyword} onInput={(e) => setKeyword(e.target.value)} className="form-control search" placeholder="Search by Email or Name" />
        </div>
       
    </div>
</div>

{
!pageLoaded ? <LoadingSkeleton length={showPerPage} /> :
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
                <div className="text-muted">{eachuser.phone_number}</div>
            </td>
            <td className="hidden-xs">
                <div className="text-muted">{eachuser.email}</div>
                <div className="text-muted">{
                eachuser.status == 1 ?
                <span className="tag tag-danger">Active</span>:
                <span className="tag tag-success">Disabled</span>
                }</div>
            </td>
            <td className="hidden-sm">
                <div className="text-muted">{"₦ "+new Intl.NumberFormat().format(eachuser.wallet_balance)}</div>                                                
            </td>
            <td className="text-right">
               <Link href={"/home/transactions?user="+eachuser.email}><a className="btn btn-info btn-link" data-toggle="tooltip" title="Tranactions"><i><GrTransaction /></i></a></Link>
               {
                eachuser.status == 1 ?
                <a className="btn btn-primary ml-2" onClick={() => handleDisable(eachuser.email, 0)} data-toggle="tooltip" title="Disable"><i><GiShieldDisabled /> </i></a>
                :
                <a className="btn btn-primary ml-2" onClick={() => handleDisable(eachuser.email, 1)} data-toggle="tooltip" title="Enable"><i><BsFillShieldFill /> </i></a>
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








</div>
    </DashLayout>
    )
}
