import DashLayout from '../../../../../../components/dashlayout'
import User from '../../../../../../services/User'
import { useEffect, useState } from 'react';
import LeagueDisplay from '../../components/leaguepagedisplay'
import swal from 'sweetalert';
import {toast} from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router';


export default function SportHome(){

    const router = useRouter();
    const { leaguename, leagueid } = router.query; 
    const [checkLeagueStart, saveLeagueStart] = useState(false) 
    const [pageReady, setPageReady] = useState(false) 
    const [currentSeason, setCurrentSeason] = useState("")
    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

      const classes = useStyles();
   
    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    useEffect(
        () => 
        {
             if(!leagueid) {
      return;
    }
      setPageReady(true)
      setCurrentSeason(localStorage.getItem("current_season"))
           User.getServerData("/checkleague/"+leagueid)
            .then( (response)=>{
                saveLeagueStart(true);
            })
            .catch((response)=>{
                saveLeagueStart(false);
            })
        
        },[leagueid]
        )

        function startLeague(){
            const formJson = {
                "league_id" : leagueid,
                "league_type" : leagueid,
                "league_season" :currentSeason,
                "start_date" : moment(startDate).format('LL'),
                "end_date" : moment(endDate).format('LL'),
            }
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to Start "+leaguename+ " for "+currentSeason,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(willTakeAction => {
                if (willTakeAction) {
                    User.saveDataToServer(formJson, "/startleague").then(
                        (response)=> {
                            toast.success(leaguename + " Started for this Season")
                            saveLeagueStart(true);
                            setOpen(false);
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
        
        <DashLayout title="League Manager">
    <div className="section-body mt-2">
           
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-2">
                           <div className="alert alert-info">
                           <h6> Note that the <code>{leaguename}</code> Data Below corresponds to the Current Season {currentSeason} </h6>
                            </div>
                        </div>                        
                    </div>
                </div>

            
            {
            pageReady ? checkLeagueStart ? 
             <LeagueDisplay /> :
            <div className="d-flex justify-content-center col bg-info p-10"> 
                    <h6 className="text-white">No League Started for {leaguename} With ID {leagueid} this Season</h6>
                    <br />
                    <button className="btn btn-info ml-20" onClick={handleOpen}>Click here To Start</button>
             </div> : <div>Loading Please Wait ... ... .. .. .. ..</div>
            }
            

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
              <h6>Please choose the start/End Date</h6>
        <div className="form-group">
            <label for="formGroupExampleInput">Start Date</label>
            <br />
          <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
        </div>

        <div className="form-group">
        <label for="formGroupExampleInput">End Date</label>
        <br />
          <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
        </div>

        <div className="form-group">
            <button className="btn btn-primary" onClick={startLeague}>SAVE</button>   
        </div>

          </div>
        </Fade>
      </Modal>            
    
              
               
        
        </div>
    </div>
        </DashLayout>
    )
}
