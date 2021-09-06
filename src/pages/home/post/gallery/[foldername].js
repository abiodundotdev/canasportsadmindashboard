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
import { useRouter } from 'next/router';
import { FaClipboard, FaTrash } from 'react-icons/fa';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function SportHome(){
    const [smodal, showDataModal] = useState(false)
    const [filename, setFileName] = useState(["Drag 'n' drop some files here, or click to select files"])
    const [selectedFile, setSelectedFile] = useState([])
    const [fetcehdData, setFetchedData] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const [btnText, setBtnText] = useState("Upload Files")
    const [disabled, setDisabled] = useState(false)
    const [dataSaved, setDataSaved] = useState(false)
    const router = useRouter();
    const {foldername} = router.query
    function showModal(){
        showDataModal(true)
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }

    const copyToClip = () => {
        toast.success("Url Copied To Clipboard Successfully");
    }

    useEffect(
        ()=>{
            User.getServerData("/listfolderfiles/"+foldername).then(
                (response)=>{
                    setFetchedData(response.data.data)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
        },[dataSaved])

     const onFileUpload = () => {
        setDisabled(true)
        setBtnText("Uploading Files ... ")
        const data = new FormData();
        selectedFile.forEach(file => {
            data.append('appfiles[]', file, file.name)
        });
        
       data.append('foldername', foldername);
      
       User.uploadFile(data, "/uploadfile", config).then(
            (response) => {
                setDisabled(false)
                setBtnText("Upload Files")
                console.log(response)
                setDataSaved(true)
                toast.success("Files Upload to "+foldername+ " Successfully")
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    } 
   
    const onDrop = useCallback(acceptedFiles => {
        const filenames = []
      //  console.log(acceptedFiles)
        acceptedFiles.forEach((file) => {
            filenames.push(file.name)
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              //console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
          })
          setFileName(filenames)
          setSelectedFile(acceptedFiles)
          console.log(acceptedFiles)
          console.log(selectedFile)

        }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      

    return (
        <DashLayout title={"Folder: "+foldername}>
        <div className="section-body mt-3">
                
        <div className="row row-cards">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="page-options d-flex">
                                    <div className="input-icon ml-2">
                                        <span className="input-icon-addon">
                                            <i className="fe fe-search"></i>
                                        </span>
                                        <input type="text" className="form-control" placeholder="Search photo" />
                                    </div>
                                    <button type="submit" onClick={showModal} className="btn btn-primary ml-2">Upload New</button>
                                </div>
                                <div className="page-subtitle ml-0">1 - 12 of 1713 photos</div>
                            </div>
                        </div>
                    </div>
        </div>

        <div class="row row-cards">
    {
        fetcehdData.map(
            (eachdata)=>{
                return (
                    <div class="col-sm-6 col-lg-4">
                        <div class="card p-3">
                            <a href="javascript:void(0)" class="mb-3">
                                <img src={"https://canasports.s3.us-east-2.amazonaws.com/admin_uploaded_files/"+eachdata?.file_url} alt="Photo by Nathan Guerrero" class="rounded" />
                            </a>
                            <div class="d-flex align-items-center px-2">
                                <div>
                                    <div>{eachdata?.name}</div>
                                    <small class="d-block text-muted">{moment(eachdata?.created_at).fromNow()}</small>
                                </div>
                            </div>
                        
                        <div class="d-flex justify-content-between">
                                <><button className="btn btn-success"><i> <FaTrash /> </i> Delete </button></>
                                <>
                                <CopyToClipboard text={"https://canasports.s3.us-east-2.amazonaws.com/admin_uploaded_files/"+eachdata?.file_url} onCopy={copyToClip}>
                                <button className="btn btn-danger" title="Copy to ClipBoard"><i> <FaClipboard /> </i> Copy Link</button>
                                </CopyToClipboard>
                                </>
                        </div>
                       
                        </div>
                    </div>
                )
            }
        )

    }


        </div>
              
        </div>

          
                 <Modal show={smodal}  onHide={() => true}>
                    <Modal.Header><h6>Upload Files to {foldername}</h6></Modal.Header>
                    <Modal.Body>

                        <div style={{border : '2px solid grey', borderRadius : '2px'}} className="p20">
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p className="text-center">Drop the files here ...</p> :
                            <p className="text-center">{filename.map(name =>  <> <b>{name}</b> <br /> </>)}</p>
                        }
                     </div>
                        </div>
                        {
                        //<input type="file" className="form-control" onChange={ (e)=> console.log(e.target.files) } multiple />
                        }
                    </Modal.Body>
                    <Modal.Footer>         
                    <button onClick={onFileUpload} className="btn btn-success" disabled={disabled}>{btnText}</button>
                    <button onClick={()=>showDataModal(false)} className="btn btn-primary">Close</button>
                    </Modal.Footer>
                </Modal>


        </DashLayout>
    )
                    }