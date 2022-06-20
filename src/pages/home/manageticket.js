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
        User.getServerData("/getticketdata/"+ticketId).then(
            (response)=>{
                setTicketData(response.data);
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
                        toast.success("Ticket "+ type +"d" +" Successfully");
                        setTicketData(response.data.data)
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
            <input type="text" onInput={(e)=>setTicketId(e.target.value)} class="form-control" placeholder="Ticket Id or Tell User To Place Invoice at the Scanner" />
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

        {
             ticketData?.ticket_status != "Active" ? 
            <h3 className="tag tag-success ml-20 text-center" style={{ fontSize : 22, textAlign : 'center'  }}>{ticketData?.ticket_status == "Used" ? " This ticket has been used" : "This ticket has expired"}</h3>
         : <span></span>
            
        }        

        <div className="card-body ">
            <table className="table table-striped">
                <tr>
                    <td rowSpan="8"><QRCode value={ticketData?.ticket_id} width={400} /></td>
                </tr>

                <tr>
                    <td>Price::</td>
                    <td>{"₦ "+new Intl.NumberFormat().format(ticketData?.ticket_price)}</td>
                </tr>

               

                <tr>
                    <td>Unit::</td>
                    <td>{ticketData?.units}</td>
                </tr>

                <tr>
                    <td>Total::</td>
                    <td>{"₦ "+new Intl.NumberFormat().format(ticketData?.total_amount_paid)}</td>
                </tr>

                <tr>
                    <td>Time Booked ::</td>
                    <td>{moment(ticketData?.created_at).format("LLLL")}</td>
                </tr>

                <tr>
                    <td>Booked By ::</td>
                    <td>{ticketData?.user}</td>
                </tr>

                <tr>
                    <td>Status::</td>
                    <td>
                        {
                        ticketData?.ticket_status == "Active" ?
                        <span className="tag tag-danger"> {ticketData?.ticket_status}</span>
                        : 
                        <span className="tag tag-success">{ticketData?.ticket_status}</span>
                        }
                    </td>
                </tr>

            </table>
        </div>
    </div>
    
</div>

    <div className="d-flex col justify-content-center">
        {

        ticketData?.ticket_status === "Active" ?
            <button className="btn btn-primary" onClick={()=>authorizeTicket("authorize")} disabled={disabled}><i className="fa fa-check"></i>CHECKIN/AUTHORIZE</button>     
    :
  <span></span>    
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
