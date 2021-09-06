import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import User from '../../../services/User';
import DashLayout from '../../../components/dashlayout';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { LoadingSkeleton } from '../../../components/skeleton';
import MatchTable from '../sports/football/components/matchtable';

export default function ListTeamMatches(){
   const [pageReady, setPageReady] = useState(false)
   const [fetchedData, setFetchedData]  = useState([]);
   const router = useRouter()
   const {teamid,name} = router.query 

    useEffect(
        () => {
        User.getServerData("/getmatchesforclub/"+teamid)
            .then( (response)=>{
               setPageReady(true)
                setFetchedData(response.data);
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
                            //saveLeagueStart(true);
                            //setOpen(false);
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
        
<DashLayout title="Club Matches">
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
            <h6>Team Name::</h6>
            <h6>{name}</h6>
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
      <th scope="col">Score</th>
      <th scope="col">Points</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
<tbody>
    {
     fetchedData?.map(
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