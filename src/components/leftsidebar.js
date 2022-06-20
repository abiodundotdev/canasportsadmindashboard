import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link';
import {APP_NAME} from '../includes/constants' 
import {sportslist} from '../includes/tempdata'
import React, { useEffect, useState } from 'react';
import {GiFootyField,GiThreeFriends,GiTicket} from 'react-icons/gi'
import User from '../services/User';
import {BsFilePost,BsNewspaper} from 'react-icons/bs'
import {MdChildFriendly, MdNoteAdd} from 'react-icons/md'
import {AiOutlineGroup} from 'react-icons/ai'
import { FaChild, FaMailBulk, FaSchool, FaTeamspeak, FaUserFriends, FaUsers } from 'react-icons/fa';
import { BiMessageAdd } from 'react-icons/bi';
import { RiTeamFill } from 'react-icons/ri';
import { FcGallery } from 'react-icons/fc';

function LeftSideBar({title}){
    const router = useRouter();
    const [userData, setUserData] = useState({})
   
    useEffect(
        () => {
          User.getServerData("/user").then(
            (response) => {
                setUserData(response.data)
            }
          ).catch( 
            (err) => {
              if(err.response.status === 401){
                   //router.push("/login")
              }
                }
          )
        },[])

  
    const logOut = () => {
            User.saveDataToServer({"name" : ""}, "/logout").then(
                (response) => {
                    router.push("/login")
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
    }
    return(
        <div id="left-sidebar" className="sidebar ">
        <h5 className="brand-name">{APP_NAME}<a className="menu_option float-right"><i className="fa fa-th" data-toggle="tooltip" data-placement="left" title="Grid & List Toggle"></i></a></h5>
        <nav id="left-sidebar-nav" className="sidebar-nav">
            <ul className="metismenu">
                <li className="g_heading" key="1">Home</li>
                <li className={router.pathname == "/home/dashboard" ? "active" : ""} key="2"><Link href="/home/dashboard"><a><i className="fa fa-tachometer-alt"></i><span>Dashboard</span></a></Link></li>                        
                <li className={router.pathname == "/home/administrators" ? "active" : ""}><Link href="/home/administrators" key="4"><a><i className="fa fa-users"></i><span>Administrators</span></a></Link></li>
                <li className={router.pathname == "/home/users" ? "active" : ""}><Link href="/home/users" key="5"><a><i className="fa fa-user-friends"></i><span>Users</span></a></Link></li>
                <li className={router.pathname == "/home/profile" ? "active" : ""}><Link href="/home/profile"><a><i className="fa fa-user"></i><span>Profile</span></a></Link></li>
                
                {
                   userData?.role == "ticket" || userData?.role == "super"   ?
                <>
                <li className="g_heading" key="6">Ticket Management</li>
                <li className={router.pathname == "/home/manageticket" ? "active" : ""}><Link href="/home/manageticket" key="7"><a><i className="fa fa-ticket-alt"></i><span>Manage Ticket</span></a></Link></li>
                <li className={router.pathname == "/home/tickethistory" ? "active" : ""}><Link href="/home/tickethistory" key="8"><a><i className="fa fa-clipboard-list"></i><span>Ticket History</span></a></Link></li>
               {
               // <li className={router.pathname == "/home/generateticket" ? "active" : ""}><Link href="/home/generateticket" key="9"><a><i><GiTicket /></i><span>Generate Ticket for Match</span></a></Link></li>
               }
                </>
                : ""
                }
                
                {
                   userData?.role == "post" || userData?.role == "super"    ?
                <>
                <li className="g_heading" key="6">Posts </li>
                <li className={router.pathname == "/home/post" ? "active" : ""}><Link href="/home/post" key="7"><a><i><BsNewspaper /></i><span>All Post</span></a></Link></li>
                <li className={router.pathname == "/home/post/addnewpost" ? "active" : ""}><Link href="/home/post/addnewpost" key="8"><a><i><MdNoteAdd /></i><span>Add New Post</span></a></Link></li>
                <li className={router.pathname == "/home/post/category" ? "active" : ""}><Link href="/home/post/category" key="8"><a><i><AiOutlineGroup /></i><span>Category</span></a></Link></li>
                <li className={router.pathname == "/home/post/gallery" ? "active" : ""}><Link href="/home/post/gallery" key="8"><a><i><FcGallery /></i><span>File Manager</span></a></Link></li>
                </>
               : ""
                }
                
                {
                    userData?.role == "account" || userData?.role == "super"    ?
                <>
                <li className="g_heading" key="6">Accounts Management</li>
                <li className={router.pathname == "/home/externalaccount/players" ? "active" : ""}><Link href="/home/externalaccount/players" key="7"><a><i><GiThreeFriends /></i><span>Players</span></a></Link></li>
                <li className={router.pathname == "/home/externalaccount/groups" ? "active" : ""}><Link href="/home/externalaccount/groups" key="8"><a><i><FaUserFriends /></i><span>Groups</span></a></Link></li>
                <li className={router.pathname == "/home/externalaccount/schools" ? "active" : ""}><Link href="/home/externalaccount/schools" key="8"><a><i><FaSchool /></i><span>Schools</span></a></Link></li>
                <li className={router.pathname == "/home/externalaccount/clubs" ? "active" : ""}><Link href="/home/externalaccount/clubs" key="8"><a><i><RiTeamFill /></i><span>Clubs</span></a></Link></li>
                <li className={router.pathname == "/home/externalaccount/children" ? "active" : ""}><Link href="/home/externalaccount/children" key="8"><a><i><FaChild /></i><span>Children</span></a></Link></li>
                </>
                : ""
                }                  

                <li className="g_heading" key="6">Messaging / Notification</li>
                <li className={router.pathname == "/home/sendnew" ? "active" : ""}><Link href="/home/sendnew" key="7"><a><i><BiMessageAdd /></i><span>Send Group Mail</span></a></Link></li>
                 
                {
                   userData?.role == "match" || userData?.role == "super"    ?
                <>
                <li className="g_heading" key="9">Football Manager</li>
                {
                sportslist.map((sport)=>{
                    return <li className={router.pathname == "/home/sports/football/"+sport.name.toLowerCase() ? "active" : ""} key={sport.name}><Link href={"/home/sports/football/"+sport.name.toLowerCase()}><a><i>{sport.icon}</i>{sport.name}</a></Link></li>
                })
                 }
                <li key="20"><Link href="/home/managepitch"><a><i><GiFootyField /></i><span>Manage Pitch</span></a></Link></li>
                </>
                : ""
                }

                <li className="g_heading" key="21">App</li>
                <Link href="/home/settings"><li key="22"><a><i className="fa fa-gear"></i><span>Setting</span></a></li></Link>
                <li  key="29" style={{cursor : "pointer"}}><a onClick={logOut}><i className="fa fa-sign-out-alt"></i><span>Log Out</span></a></li>
                
            </ul>
        </nav>        
    </div>
    )
}


export default LeftSideBar