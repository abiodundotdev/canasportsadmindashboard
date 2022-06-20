import DashLayout from '../../components/dashlayout';
import React, {useContext,useEffect,useState} from 'react'
import { APP_NAME } from '../../includes/constants';
import Image from 'next/image';
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import MatchListCard from './sports/football/components/matchlist';
import User from '../../services/User';
import { toast } from 'react-toastify';
export default function Dashboard(){
    const [user, setUser] = useState({});
    const [fetchedData, setFetchedData] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [isdataloaded, setDataloaded] = useState(false)
    const [isSavingTicket, setIsSavingTicket] = useState(false)
    const date = new Date().getHours()
    const [nticket, setnticket] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const stateUser = useSelector(state => state.user)
    
    useEffect(() => {
        const authUser =  JSON.parse(localStorage.getItem("userAuth"));
        setUser(authUser);
        fetchData()
      },[]);

      const fetchData = ()=> {
        User.getServerData("/dashboard").then(
            (response)=>{
                setDataloaded(true)
                setFetchedData(response.data);
               }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
      }

      const savetTicket = ()=> {
        setIsSavingTicket(true)
        User.saveDataToServer({ 'price' : price , 'nticket' : nticket, 'description' : description },  "/saveticketgenerated").then(
            (response)=>{
                fetchData()
                setIsSavingTicket(false)
                toast.success("Ticket Initiated Successfully for today")
               }
        ).catch(
            (err) => {
                setIsSavingTicket(false)
                toast.error(err.response.data.message)

            }
        )
      }

      const updateTicket = ()=> {
        setIsSavingTicket(true)
        User.saveDataToServer({'price' : price , 'nticket' : nticket},  "/updateIssuedTicket").then(
            (response)=>{
                fetchData()
                setIsSavingTicket(false)
                toast.success("Ticket Initiated Successfully for today")
               }
        ).catch(
            (err) => {
                setIsSavingTicket(false)
                toast.error(err.response.data.message)
            }
        )
      }

    return(
        
        <DashLayout title="Dashboard">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                        <h4 style={{fontSize : '20px', fontWeight: 'bolder'}} className="text-capitalize">Hi {date < 12 ? 'Good Morning ' : date < 18 ? 'Good Afternoon ' : 'Good Evening '} {
                            user.name
                        }</h4>
                        </div>                        
                    </div>
            </div>
            <div className="row clearfix row-deck">

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Leagues</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 text-center">{fetchedData.total_leagues}</h5>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Teams</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_clubs}</h5>
                             </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Matches</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_matches}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Players</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_players}</h5>
                             </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Reserved Seats</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.reserved_seats}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Total Seats for the day</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_seats_today}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Total Seats left for the day</h3>
                            </div>
                            <div className="card-body">
                                <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_seats_left}</h5>
                            </div>
                        </div>
                    </div>


                <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Generate Ticket
                            </div>
                            <div className="card-body">
                            <Button variant="secondary" onClick={()=> setOpenModal(true)}>
                                                Genetate Ticket
                            </Button>

                            <Button variant="primary" onClick={()=> setOpenUpdateModal(true)}>
                                            Update Seats
                            </Button>                     
                             <Modal show={openModal} onHide={ () => setOpenModal(false) }>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Initate Ticket</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                    <input value={price} onInput={(e) => setPrice(e.target.value)} className='form-control' name='price' placeholder='price'></input>
                                                    <br />
                                                    <input value={nticket} onInput={(e) => setnticket(e.target.value)} className='form-control' placeholder='Units'></input>
                                                    <br />
                                                    <textarea className='form-control' value={description} onInput={(e) => setDescription(e.target.value)} >Descrption</textarea>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={()=> setOpenModal(false)}>
                                                Close
                                            </Button>
                                            <Button disabled = {isSavingTicket} variant="primary" onClick={savetTicket}>
                                                Save Changes
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal show={openUpdateModal} onHide={ () => setOpenUpdateModal(false) }>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Initate Ticket</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                    <input value={price} onInput={(e) => setPrice(e.target.value)} className='form-control' name='price' placeholder='Price (NB:Leave blank if not needed)'></input>
                                                    <br />
                                                    <input value={nticket} onInput={(e) => setnticket(e.target.value)} className='form-control' placeholder='Units to Add/Remove'></input>
                                                    <br />
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={()=> setOpenModal(false)}>
                                                Close
                                            </Button>
                                            <Button disabled = {isSavingTicket} variant="primary" onClick={updateTicket}>
                                                   Update
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                            </div>
                        </div>
                    </div>                  
                 </div>

   

           <br />
           <br />


            <div className="row clearfix row-deck">
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={fetchedData.upcoming} day="Upcoming Matches"  isitemfounded={isdataloaded} />     
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={fetchedData.live} day = "Live Matches" isitemfounded={isdataloaded} />  
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <MatchListCard matchdata={fetchedData.fiveconcluded} day="Recently Finished" isitemfounded={isdataloaded} />
                </div>
 
            </div>

<br />
<br />
        


        
        
        </div>
        </div>
        </DashLayout>
    )
}
