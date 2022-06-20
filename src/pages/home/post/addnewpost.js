import DashLayout from '../../../components/dashlayout'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link' 
import {GrTransaction} from 'react-icons/gr'
import {GiShieldDisabled} from 'react-icons/gi'
import {BsFillShieldFill} from 'react-icons/bs'
import { EditorState } from 'draft-js';
import { ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import {toast} from 'react-toastify'
import User from '../../../services/User';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from 'moment';



export default function SportHome(){
    const [edit, setedit] = useState({})
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    const [convertedContent , setConvertedContent] = useState("")
    const [posttitle , setPostTitle] = useState("")
    const [postBanner , setPostBanner] = useState("")
    const [cat , setCat] = useState("Football")
    const [match, setMatch] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [postCategory , setpostCategory] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [value, setValue] =  useState("");
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    const editorRef = useRef()
    const [ editorLoaded, setEditorLoaded ] = useState( false )
    const { CKEditor, ClassicEditor} = editorRef.current || {}

    useEffect( () => {
        editorRef.current = {
          CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor, //Added .CKEditor
          ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' ),
        }
        setEditorLoaded( true )
    }, [editorLoaded] );
  
  
    const formJson = {
        "post_title" : posttitle,
        "post_content" : value,
        "post_category" : cat,
        "status" : 1,
        "banner" : postBanner
    }

    useEffect(
        ()=> {
            if(posttitle == ""){
                setFormDisabled(true)
            }else{
                setFormDisabled(false)
            }
        },[posttitle]
    )
   

    useEffect(
        ()=> {
           User.getServerData("/fetchpostcategories").then(
               (response)=> {
                   setpostCategory(response.data)
               }
           ).catch(
               (err)=>{

               }
           )

        User.getServerData("/getallmatches").then(
            (response)=>{
                setMatch(response.data);
            }
        ).catch(
            (err)=>{

            }
        )

        },[]
    )

    const handlePostSubmit = () => {
        setFormSubmitted(true)
        setFormDisabled(true)
        User.saveDataToServer(formJson, "/savepost").then(
            (resposne)=> {
                toast.success("Post Published Successfully")
                setFormDisabled(false)
                setFormSubmitted(false)
            }
        ).catch(
            (err)=> {
                toast.error(err.response.data.message)
                setFormDisabled(false)
                setFormSubmitted(false)
            }
        )
    }

    return (
        
        <DashLayout title="Add New Post">
        <div className="section-body mt-3">
        
        
<div className="card">
    <div className="card-body">

        <div className="form-group">
            <input onInput={(e)=> setPostTitle(e.target.value)} className="form-control" placeholder="Post Title"/>
        </div>
        
        <div className="form-group">
            <input onInput={(e)=> setPostBanner(e.target.value)} className="form-control" placeholder="Post Banner Url"/>
        </div>
  
  
   
        <>
        {editorLoaded ? <CKEditor
            editor={ ClassicEditor }
            onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);           
            } }
            onChange={ (event, editor ) => {
              const data = editor.getData()
              setValue(data);
            } }
        /> : <p>Carregando...</p>}
     </>

<br /> <br />
<div className="form-group">
    <label>Select Category</label>
        <select onChange={(e)=> setCat(e.target.value)} className="form-control" >
            {
                postCategory?.map(
                    (eachcat)=>{
                        return <option value={eachcat?.category_name}>{eachcat?.category_name}</option>
                    }
                )
            }
        </select>
</div>


<div className="mt-4 text-right">
            <button className="btn btn-primary" disabled={formDisabled}  onClick={handlePostSubmit}>Upload Post {preloader}</button>
</div>

</div>
</div>

    
        {
       // JSON.stringify(contentState)
        }
        </div>
        </DashLayout>
    )
}