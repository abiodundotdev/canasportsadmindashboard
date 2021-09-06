import DashLayout from '../../components/dashlayout';
import React, { useState } from 'react';
var QRCode = require('qrcode.react');
import Image from 'next/image'
import styles from '../../styles/Ticket.module.css'
import User from '../../services/User';
import { toast } from 'react-toastify';
import { TicketSkeleton } from '../../components/skeleton';
import swal from 'sweetalert';
import moment from 'moment';

export default function Dashbaord(props){
    const [amount, setAmount] = useState(0);
    const [sc , setSC] = useState(false)
    const [ticketId, setTicketId] = useState("")
    const [bottonText, setbuttonText] = useState("Validate")
    const [bDisabled, setbDisabled] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [ticketData, setTicketData] = useState({})
    const [showTicket, setShowTicket] = useState(false);
    const [showSkel, setShowSkel] = useState(false);
    
    const onChangeHandler = event => {
        setAmount(event.target.value);
      };

    function getTicketData(){
        setbDisabled(true)
        setShowTicket(false);
        setShowSkel(true);
        setbuttonText("Validating Please Wait...")
        User.getServerData("/getticketmatchdata/"+ticketId).then(
            (response)=>{
                setTicketData(response.data.data);
                setbDisabled(false);
                setbuttonText("Validate");  
                toast.success("Ticket Found");  
                setShowTicket(true) 
                setShowSkel(false);
            }
        ).catch(
            (err)=> {
                setbDisabled(false);
                setbuttonText("Validate");
                toast.error("Ticket Not Found");
                setShowTicket(false)
                setShowSkel(true);
            })
    }

    function authorizeTicket(type){
        setDisabled(true)
        const formData = {'type' : type, 'ticket' : ticketId}
        swal({
            title: "Are you sure?",
            text: "Are you sure "+ type + " this Ticket",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                User.saveDataToServer(formData, "/authorizeticket").then(
                    (response) =>  {
                        setDisabled(false)
                        toast.success("Ticket "+ type +"d" +" Successfully")
                    }
                ).catch(
                    (err) => {
                       toast.error("An Error Occcur Deeee")
                    }
                )
            }
        })
    }


    return(
        <DashLayout title="Dashbaord">
        <div className="section-body mt-3">
            <div className="container-fluid">
                
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h4>Manage Ticket</h4>
                        </div>                        
                    </div>
                </div>


        <div class="d-lg-flex d-xl-flex justify-content-between">
                

        </div>


<div class="row clearfix contanier-fluid d-flex align-items-center">    
<div className="card">
    <div class="card-body">
        <div class="form-row">
            <div class="col-9">
            <input type="text" onInput={(e)=>setTicketId(e.target.value)} class="form-control" placeholder="Ticket Id or Tell User To Place Incoice at the Scanner" />
            </div>
            <div class="col">
           <button onClick={getTicketData} class="btn btn-primary" disabled={bDisabled}>{bottonText}</button>
            </div>
        </div>
   
    {showSkel ? <TicketSkeleton /> : ""}
    {!showTicket ? "" : 
    <>
    <div className="d-flex justify-content-center mt-5" style={{display : "ne"}}>
        <div className="card mt-0 p-0" style={{width : 500}}>
            <div className="card-img-top" style={{
                        height : "200px",
                        borderRadius : '3px',
                        boxShadow : '0 5px 12px 0 rgba(0, 0, 0, 0.26)',
                        background : 'url(canalogo.jpg)',
                        clipPath  : "url('#my-clip-path')",
                        margin: '0rem auto',
                        filter: 'drop-shadow(0 3px 10px #000)',}}>

            <div className="d-flex justify-content-around align-middle mt-80" style={{verticalAlign : 'middle'}}>

            <div className=""> 
            <img src={String(ticketData?.club1Data?.logo_url) ?? "/canalogo.jpg"} width="100px" height="100px" />
            <h6 className="text-white font-weight-bold">{ticketData?.club1Data?.team_name}</h6>
            </div>
            
            <h2 className="text-white font-weight-bold">VS</h2>

            <div className="">
            <img src={String(ticketData?.club2Data?.logo_url) ?? "/canalogo.jpg"} width="100px" height="100px" />
            <h6 className="text-white font-weight-bold">{ticketData?.club2Data?.team_name}</h6>
            </div> 
           
            </div>  

        </div>

            

        <div className="card-body ">
            <table className="table table-striped">
                <tr>
                    <td rowSpan="8"><QRCode value={ticketData?.ticket?.ticket_id} width={400} /></td>
                </tr>

                <tr>
                    <td>Date/Time</td>
                    <td>{ticketData?.match?.match_time}</td>
                </tr>

                <tr>
                    <td>Price::</td>
                    <td>{"₦ "+new Intl.NumberFormat().format(ticketData?.ticket?.ticket_price)}</td>
                </tr>

                <tr>
                    <td>Unit::</td>
                    <td>{ticketData?.ticket?.units}</td>
                </tr>

                <tr>
                    <td>Total::</td>
                    <td>{"₦ "+new Intl.NumberFormat().format(ticketData?.ticket?.total_amount_paid)}</td>
                </tr>

                <tr>
                    <td>Time Booked ::</td>
                    <td>{moment(ticketData?.ticket?.created_at).format("LLLL")}</td>
                </tr>

                <tr>
                    <td>Booked By ::</td>
                    <td>{ticketData?.ticket?.user}</td>
                </tr>

                <tr>
                    <td>Status::</td>
                    <td>
                        {
                        ticketData?.ticket?.authorized === 1 ?
                        <span className="tag tag-danger">Authorized</span>
                        : 
                        <span className="tag tag-success">Pending</span>
                        }
                    </td>
                </tr>

            </table>
        </div>
    </div>
    
</div>

    <div className="d-flex col justify-content-center">
        {

        ticketData?.ticket?.authorized === 0 ? 
            <button className="btn btn-primary" onClick={()=>authorizeTicket("authorize")} disabled={disabled}><i className="fa fa-check"></i>CHECKIN/AUTHORIZE</button>     
    :
    <span className="tag tag-danger ml-20"><i className="fa fa-error"></i> This Ticket Has been Authorized and Expired at {moment(ticketData?.ticket?.updated_at).format("LLL")}</span>
       
       }
        {
            //<button className="btn btn-danger ml-20" onClick={()=>authorizeTicket("unauthorize")}><i className="fa fa-error"></i> CANCEL TICKET</button>
            }
            </div>

    </>

            }

            




    </div>
</div>  
        
        
        
        <div>
            
        </div>      
        
        </div>

        

        <svg class="svg" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                <path d="M1,0 l0,0.429 c-0.015,0.007,-0.026,0.033,-0.026,0.065 s0.011,0.058,0.026,0.065 V1 H0 V0.559 c0.015,-0.007,0.026,-0.033,0.026,-0.065 S0.015,0.436,0,0.429 V0 h1"></path>
                </clipPath>
    </svg>
        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
