import DashLayout from '../../../../components/dashlayout'
import {useState, useEffect, useCallback} from 'react';
import Link from 'next/link' 
import {GrTransaction} from 'react-icons/gr'
import {GiShieldDisabled} from 'react-icons/gi'
import {BsFillShieldFill} from 'react-icons/bs'
import User from '../../../../services/User'
import moment from 'moment'
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { LoadingSkeleton } from '../../../../components/skeleton';
import Modal from "react-bootstrap/Modal";
import {useDropzone} from 'react-dropzone'
import { formatDistanceStrictWithOptions } from 'date-fns/fp';
import { BiFolder } from 'react-icons/bi';
import { FcFolder } from 'react-icons/fc';
import { AiTwotoneHtml5 } from 'react-icons/ai';
import {FolderSkeleton} from '../../../../components/skeleton'


export default function SportHome(){
    const [smodal, showDataModal] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [disabled, setDisabled] = useState(false);
    const [formSaved, setFormSaved] = useState(false)
    const [fetchedFolders, setfetchedFolders] = useState([])
    const [pageReady, setPageReady] = useState(false)
     
    function showModal(){
        showDataModal(true)
    }

    const formData = {
        'name' : name,
        'description' : description,
        'status' : 1
    }

    useEffect(
        () => {
            User.getServerData("/getfolders").then(
                (response) => {
                    setfetchedFolders(response.data.data)
                    setPageReady(true)
                }
            ).catch(
                (err)=>{
                    setDisabled(false)
                    console.log(err)
                }
            )
        },[formSaved]
    )

     const saveFolder = () => {
       setDisabled(true)
       User.saveDataToServer(formData, "/savefolder").then(
            (response) => {
                setDisabled(false)
                if(response.data.success === true){
                    toast.success("Folder Created Successfully")
                    setFormSaved(true);
                }else{
                    toast.error("Folder Already Exist")
                }
            }
        ).catch(
            (err)=>{
                setDisabled(false)
                console.log(err)
            }
        )
    } 
   
    return (
        <DashLayout title="Image Gallery">
        <div className="section-body mt-3">
                
        <div className="row row-cards">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="page-options d-flex">
                                    <button type="submit" onClick={showModal} className="btn btn-primary ml-2">Create New Folder</button>
                                </div>
                                <div className="page-subtitle ml-0"></div>
                            </div>
                        </div>
                    </div>
        </div>

{
    
    <div className="d-flex justify-content-between">   
{
        !pageReady ?  <FolderSkeleton length={5} /> : 
            fetchedFolders.map((eachfolder)=>{
                return (
                <Link href={"/home/post/gallery/"+eachfolder?.name}><div className="d-flex flex-column justify-content-center" style={{cursor : "pointer"}}> 
                            <i style={{fontSize : '100px;'}}> <FcFolder size={200} /> </i>
                            <h6 className="text-center">{eachfolder?.name}</h6>
                </div></Link>)
            })
}
</div>
}

              
        </div>

          
                 <Modal show={smodal}  onHide={() => true}>
                    <Modal.Header><h6>Folders</h6></Modal.Header>
                    <Modal.Body>
            <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Add Folder</h3>
                </div>

            <div className="card-body">
                <div className="form-group">
                    <label for="formGroupExampleInput">Folder Name</label>
                    <input type="text" onInput={(e) => setName(e.target.value)}  className="form-control" id="name" placeholder="Folder Name" />
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Folder Description</label>
                    <input type="text" onInput={(e) => setDescription(e.target.value)}  className="form-control" id="name" placeholder="Description" />
                </div>

            </div>

        </div>


                    </Modal.Body>
                    <Modal.Footer>
                    
                    <button onClick={saveFolder} className="btn btn-success" disabled={disabled}>Save Folder</button>
                    
                    <button onClick={()=>showDataModal(false)} className="btn btn-primary">Close</button>
                    </Modal.Footer>
                </Modal>


        </DashLayout>
    )
                    }