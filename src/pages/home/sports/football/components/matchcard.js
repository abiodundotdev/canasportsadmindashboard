import React from "react";
import Link from 'next/link'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useRouter } from "next/router";

function handleClick(e, data) {
    console.log(data.foo);
}

function MatchCard({footbaldata,day}){
    const router = useRouter();
    return (
        <div className="card bg-none">
        <div className="card-header bg-primary">
            <h5 className="card-title text-white text-center">{day}</h5>
        </div>
        <div className="card-body pt-0">
        <div className="table-responsive">
         <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0">
         <tbody>
            {footbaldata.map(  
                (data)=>{
                    return (
                        <>
                        <ContextMenuTrigger id={"itemMenu"+data.id} style={{width : '900px'}}>
                        <tr className="w-100">
                        <td>
                           <h3 className="tag tag-primary">10:00am</h3>
                        </td>
                        <td>
                        <h6>{data.teama}</h6>
                        </td>
                        <td>
                        <h6>Vs</h6>
                        </td>
                        <td>
                            <h6>{data.teamb}</h6>
                        </td>

                        <td>
                            <h6 className="tag tag-success">Upcoming</h6>
                        </td>
                        </tr>
                      </ContextMenuTrigger>

            <ContextMenu id={"itemMenu"+data.id} className="react-contextmenu-wrapper">
                <ul className="list-group">
            <MenuItem onClick={() => router.push("/home/sports/football/update")}>
               <li className="list-group-item"><i className="fa fa-edit mr-10"></i><span>Edit</span></li>
            </MenuItem>
               
            <MenuItem onClick={() => router.push("home/sports/football/update")}>
             <Link href={"football/update/"+data.teama}><a><li className="list-group-item"><i className="fa fa-book mr-10"></i><span>Updates</span></li></a></Link>
            </MenuItem>

            <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
               <li className="list-group-item"><i className="fa fa-recycle mr-10"></i><span>Delete</span></li>
            </MenuItem>
               
                </ul>

            </ContextMenu>
                </>
                    )
                
                }
            )}
            </tbody>
            </table>
            </div>
        </div>
    </div>
    )
}
export default MatchCard