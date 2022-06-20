import DashLayout from '../../../components/dashlayout'
import {useState, useEffect} from 'react';
import Link from 'next/link' 
import {GrTransaction} from 'react-icons/gr'
import {GiShieldDisabled} from 'react-icons/gi'
import {BsFillShieldFill} from 'react-icons/bs'
import User from '../../../services/User'
import moment from 'moment'
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { LoadingSkeleton } from '../../../components/skeleton';


export default function SportHome(){
    const [calenderValue, onCalenderChange] = useState(new Date());
    const [posttoshow, setPostsToUser] = useState([])
    const [del,setDel] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [showPerPage, setPostPerPage] = useState(5)
    const [keyword,setKeyword] = useState("");
    const [pageReady,setpageReady] = useState(false);
    
    const usersToShow = currentPage * showPerPage
    const indexOfLastUser = currentPage * showPerPage
    const indexOfFirstUser = indexOfLastUser - showPerPage

    let number_of_page = Math.ceil(posttoshow?.length / showPerPage)

    const filteredusers = posttoshow?.filter( (eachdata) => 
    eachdata.post_title.includes(keyword) || eachdata.post_category.includes(keyword) 
    )

    const poststoshow = filteredusers.slice(indexOfFirstUser, indexOfLastUser)

    useEffect(
        ()=> {
           User.getServerData("/fetchallposts").then(
               (response)=> {
                 setPostsToUser(response.data)
                 setpageReady(true)
               }
           ).catch(
               (err)=>{

               }
           )
        },[]
    )

    useEffect(
        ()=> {
           User.getServerData("/fetchallposts").then(
               (response)=> {
                 setPostsToUser(response.data)
               }
           ).catch(
               (err)=>{

               }
           )
        },[del]
    )

    function deletepost(post_id, postitle){
        
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete "+postitle,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                User.saveDataToServer({"id" : post_id}, "/deletepost").then(
                    (resposne) => {
                        toast.success("Post Deleted Successfully")
                        setDel(true)
                    }    
                ).catch(
                    (error)=>{
                        
                    }
                )
            }
          })
    }

    return (
        <DashLayout title="Posts">
        <div className="section-body mt-3">
      
        <div className="card p-4">
           <Link href="/home/post/addnewpost"><a className="btn btn-sm btn-primary">Add New Post</a></Link>
    <div className="card-body">
        <div className="input-group mt-2">
            <input type="text" value={keyword} onInput={(e) => setKeyword(e.target.value)} className="form-control search" placeholder="Search by Title or Category" />
        </div>  
    </div>

        </div>

{
!pageReady ? <LoadingSkeleton length={showPerPage} /> : 
<div className="table-responsive" id="users">
<table className="table table-hover table-vcenter text-nowrap table_custom border-style list">
<thead>
    <tr>
    <th></th>
    <th scope="col"><small>Title</small></th>
    <th scope="col"><small>Author</small></th>
    <th scope="col"><small>Category</small></th>
    <th scope="col"><small>Created </small></th>
    <th scope="col"><small>Last Modified</small></th>
    </tr>
</thead>
<tbody>
   {
    poststoshow?.map( (eachpost, index)=> {
        return (
            <tr className="">
            <td>{index+1}</td>
            <td className="width35 hidden-xs">
            <div>{eachpost.post_title}</div>
                <div className="d-flex justify-content-between">
                    {
                    <Link href={"/home/post/editpost?id="+eachpost.id}><a>Edit  </a></Link> 
                    }
                    <a className="text-primary" onClick={()=> deletepost(eachpost.id, eachpost.post_title) } style={{cursor : "pointer"}}>Trash</a>
                </div>
            </td>
            <td className="">
                {eachpost.post_author}
            </td>
            <td>
                {eachpost.post_category}
            </td>
            <td className="">
                {moment(eachpost.created_at).format("LLL")}
            </td>

            <td className="">
                {moment(eachpost.updated_at).format("LLL")}
            </td>
            

        </tr>
        )
    })  
}

</tbody>
</table>
</div>

}
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
        </DashLayout>
    )
}