import Head from 'next/head';
import SmallBar from './smallbar';
import RightSideBar from './rightsidebar'
import UserBar from './userbar';
import NavBar from './navbar'
import LeftSideBar from './leftsidebar';
import React, {useEffect,useState, useContext} from 'react'
import {useRouter} from 'next/router'
import User from '../services/User'
import { ToastContainer, toast } from 'react-toastify';

function DashLayout({children, title, data}){
    const [user, setUser] = useState(null);
    const router = useRouter()
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isUserOnline, setUserOnline] = useState(true);
    const [pageReady, setPageReady] = useState(false);
    
    useEffect(
        () => {
          User.getServerData("/user").then(
            (response) => {
                //console.log(response.data)
            }
          ).catch( 
            (err) => {
              if(err.response.status === 401){
                   router.push("/login")
              }
                }
          )
        },[])

  

      useEffect(
        () => {
          setPageReady(true)
         },[]
      )

      useEffect(
        () => {
         if(isUserOnline){
           // toast.success("You are Back Online")
         }else{
          //toast.error("You are currently offline please check Internet Connection")
         }
         },[]
      )

    return (
   <>
        <Head>
            <meta charset="utf-8" />  
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>CanaSportsNg {title}</title>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
            <link rel="icon" href="/favicon.ico"></link>
            <script src="/js/lib.vendor.bundle.js"></script>
            <script src="/js/core.js"></script>
            <script src="/js/page/project-index.js"></script> 
        </Head>
        <ToastContainer toastStyle={{fontSize: "12px"}}/>
        <body className="font-montserrat" style={{fontSize : '10px'}}>
     
      {
        pageReady ? ""
        :
        <div class="page-loader-wrapper">
            <div class="loader">
            </div>
        </div>
      }
        
        <div id="main_content">
            <SmallBar />
            <RightSideBar />
            <UserBar />
            <LeftSideBar title={title} />
           
            <div className="page">
            <NavBar title={title} />

            {children}
           
            </div>


        </div>
       </body>
  
</>
    );
}

/*export async function getServerSideProps({params}) {
    console.log(params)
    return {
      props: {}, 
    }
  }
*/
export default DashLayout
