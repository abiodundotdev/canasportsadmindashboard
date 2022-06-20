import DashLayout from '../../../../../components/dashlayout'
import User from '../../../../../services/User'
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import {toast} from 'react-toastify'
import moment from 'moment'
import { useRouter } from 'next/router';
import { LoadingSkeleton } from '../../../../../components/skeleton';
import MatchTable from '../components/matchtable';


export default function ListFriendlyMatches(){
   const [pageReady, setPageReady] = useState(false)
   const [fetchedData, setFetchedData]  = useState([]);
   const router = useRouter()
    useEffect(
        () => {
        User.getServerData("/listfriendlymatches")
            .then( (response)=>{
               setPageReady(true)
               var res = response.data;
               var concdata = [...res.today, ...res.not_played, ...res.played]
                setFetchedData(concdata);
            })
            .catch((response)=>{
                setPageReady(false)
            })
        
        },[]
        )

        function startLeague(){
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to Start",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(willTakeAction => {
                if (willTakeAction) {
                    User.saveDataToServer("formJson", "/startleague").then(
                        (response)=> {
                            toast.success("league_name" + " Started for this Season")
                           
                        }
                    ).catch(
                        (err)=>{
                            toast.error("Something Went Wrong")
                        }
                    )
                }

            })
        }
    
    return (
        
<DashLayout title="Matches">
    <div className="section-body mt-2">

<div className="row">
<div className="col-3">
    <div className="card p-1 d-flex justify-content-center">
            <h6>Matches::</h6>
            <h6>{fetchedData?.length}</h6>
    </div>
</div>
<div className="col-3">
    <div className="card p-1 d-flex justify-content-center">
            <h6>Friendly Matches</h6>
            
    </div>
</div>
</div>

{
    !pageReady ? <LoadingSkeleton length={10} /> :
<table className="table table-bordered">
<thead class="thead-dark">
    <tr>
      <th scope="col">Match</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
<tbody>
    {
        fetchedData.length == 0 ? <tr><td>Data is empty</td></tr> :  fetchedData?.map(
            (eachmatch) => {
                return (<MatchTable matchdata={eachmatch} />)
            }
        )
    }
</tbody>
</table>
}

    </div>
</DashLayout>
    )
}