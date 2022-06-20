import {Menu,Item,Separator,Submenu,useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { toast } from "react-toastify";
import useSWR, {mutate,trigger} from 'swr'
import User from "../../../../../services/User";
import { matchStatusToString } from "../../../../../components/appmethods";
import { CSVLink, CSVDownload } from "react-csv";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import { LoadingSkeletonSmTable } from "../../../../../components/skeleton";
import moment from "moment";
import swal from "sweetalert";

export default function MatchListCard({matchdata, day, isitemfounded}){
const {data : listallclubs} = useSWR("/listallclubs");
const [csv_data, setCsvData] = useState([["CanaSport", "Ng"]])
const approuter = useRouter();
const MENU_ID = 'blahblah';
const { show } = useContextMenu();
function displayMenu(menuid){
        return function (e){
            show(e, {
              id: menuid
            })
          } 
}

function getClubName(clubid){
       const found = listallclubs?.find(
            (eachclub) => eachclub.id == clubid
        )
        return found?.team_name
}

useEffect(
    ()=> {
        const csvdata = matchdata?.map(
            (match) => [
                getClubName(match.team_a), 
                getClubName(match.team_b),
                match.score_a + " - "+ match.score_b,
                match.point_a + " - "+ match.point_b
            ]
        )
        setCsvData(csvdata)
    },[])
      
function handleItemClick(match){
      return function({ event, props, triggerEvent, data }){
        const match_db_id = match?.id;
        approuter.push("/home/sports/football/matchupdate/"+match_db_id)
      }
}

function handleSubItemClick(action,match){
    return function({ event, props, triggerEvent, data }){
    
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to "+action.toUpperCase(),
            icon: "warning",
            dangerMode: true,
            buttons: true,
          })
          .then(willTakeAction => {
            if (willTakeAction) {

    var defaultaction = ""
    const match_db_id = match?.match_id;
       switch (action) {
           case "startfirsthalf":
               defaultaction = "startfirsthalf"
               break;
            case "endfirsthalf":
                defaultaction = "endfirsthalf"
                break;
            case "startsecondhalf":
                defaultaction = "startsecondhalf"
                break;
            case "endsecondhalf":
                defaultaction = "endsecondhalf"
                break;
            default:
                defaultaction = "startfirsthalf"
               break;
       }

       const formJson = {
           "action" : defaultaction,
           "match_id": match_db_id
       }

       User.saveDataToServer(formJson,"/updatematchstatus").then(
           (response) => {
               toast.success("Match Updated Successfully")
           }
       ).catch(
           (err)=>{
            toast.error("Not updated")
           }
       )
    
    }
});


      }
}

return (
        <div className="card">
                <div className="card-header d-flex justify-content-between bg-primary">
                    <h6 className="card-title text-white">{day}</h6>
                    {
                    //  <CSVLink className="btn btn-primary" filename={"CanaSportsNgMatches_"+day+".csv"} data={csv_data}>Export</CSVLink>
                    }
                    <kbd>Right Click For Menu</kbd>
        </div>
        <div className="card-body">
            <div className="table-responsive">
           {
               !isitemfounded ? <LoadingSkeletonSmTable length={5} /> : 

               <table className="table table-hover table-responsive text-xsmall table-md" style={{fontSize: "10px"}}>
                    <thead>
                        <tr>
                        <th></th>
                        <th scope="col"><small>Team 1</small></th>
                        <th scope="col"><small>Team 2</small></th>
                        <th scope="col"><small>Scores</small></th>
                        <th scope="col"><small>Points</small></th>
                        <th scope="col"><small>Date</small></th>
                        <th scope="col"><small>Time(GMT)</small></th>
                        <th scope="col"><small>Status</small></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             matchdata?.length <= 0 ? <tr><td colSpan="7">No matches found for {day}</td></tr> : ""
                        }
                    {
                    matchdata?.map((match,index) => {
                        return(
                       <>
                      { matchdata?.length <= 0 ? <div>Matches Not Found</div> : " "}
                            <tr key={match.id} onContextMenu={displayMenu("menu_"+match.id)}>
                            <td>{index+1}</td>
                            <td>{match.club_one.team_name}</td> 
                            <td>{match.club_two.team_name}</td>
                            <td>{match.score_a + " - "+ match.score_b}</td>
                            <td>{match.point_a + " - "+ match.point_b}</td>
                            <td>{moment(match.match_day).format('MMMM Do YYYY, h:mm a')}</td>
                            <td>{match.match_time}</td>
                            <td>{matchStatusToString(match.status,match.match_half)}</td> 
                       
                <Menu id={"menu_"+match?.id}>
                        
                     

                        <Item onClick={handleItemClick(match)}>
                        Live Update of {match.club_one.team_name + " VS " + match.club_two.team_name}
                        </Item>
                        <Separator />

                        <Submenu label="Actions">
                    { 

                match.status == 0 && match.match_half == 0 ? 
                <>
                <Item onClick={handleSubItemClick("startfirsthalf",match)}>
                     Start Match
                </Item>
                </>
                   : match.status == 1 && match.match_half == 1 ? 
               <>
               <Item onClick={handleSubItemClick("endfirsthalf",match)}>
                            End First Half
                </Item>
                </>
                  :
                match.status == 0 && match.match_half == 1 ? 
                <>
                <Item onClick={handleSubItemClick("startsecondhalf",match)}>
                            Start Second Half
                </Item>
                </>
                :
                match.status == 1 && match.match_half == 2 ? 
                <>
                <Item onClick={handleSubItemClick("endsecondhalf",match)}>
                            End Second Half
                </Item>
                </>
                : 
                <>
                <Item>
                    MATCH ENDED
                </Item>
                
                </>
                }
                       
                {  
                    match.status == 1 || match.match_half == 1 ||  match.match_half == 2 ? "" :
                     <>
                     <Item onClick={handleSubItemClick("cancelmatch",match)}>
                            Cancel Match
                    </Item>
                    </>
                }

                {  
                    match.status == 1 || match.match_half == 1 ||  match.match_half == 2 ? "" :
                     <>
                     <Item onClick={handleSubItemClick("deletematch",match)}>
                            Delete Match
                    </Item>
                    </>
                }
                        </Submenu>
                    </Menu>
                        </tr> 
                    </>

                        )
                        })
                    }
                    </tbody>
                </table>
        }

            </div>

               </div>
           </div>
    )
}