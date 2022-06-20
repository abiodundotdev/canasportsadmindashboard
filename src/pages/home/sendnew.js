
import { useState, useEffect } from 'react';
import Link from 'next/link' 
import {GrTransaction} from 'react-icons/gr'
import {GiShieldDisabled} from 'react-icons/gi'
import {BsFillShieldFill} from 'react-icons/bs'
import ReactDOM from 'react-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import {toast} from 'react-toastify'
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import ScaleLoader from "react-spinners/ScaleLoader";
import DashLayout from '../../components/dashlayout';
import User from '../../services/User';


export default function SportHome(){
    const [edit, setedit] = useState({})
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    const [convertedContent , setConvertedContent] = useState("")
    const [posttitle , setPostTitle] = useState("")
    const [msgMode , setmsgMode] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    
  
    const formJson = {
        "title" : posttitle,
        "content" : convertedContent,
        "type" : msgMode,
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
        },[]
    )

    const handlePostSubmit = () => {
        setFormSubmitted(true)
        setFormDisabled(true)
        User.saveDataToServer(formJson, "/notifyuser").then(
            (resposne)=> {
                toast.success("Message sent Successfully")
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

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }
    
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const [editor, setEditor] = useState(false)
    
    useEffect(() => {
        const edi =  require('react-draft-wysiwyg');
        setedit(edi)
        setEditor(true)
      },[])

      const Styles = {
          wrapperclass : {
            padding: "1rem",
            border: "1px solid #ccc",
           
          },
          editorclass : {
            backgroundColor: "lightgray",
            padding: "1rem",
          
            fontSize : "12px",
            border: "1px solid #ccc",
          },
          toolbarclass :  {
            border: "1px solid #ccc"
          }

      }

    return (
        
        <DashLayout title="Send Group/General Mail">
        <div className="section-body mt-3">
        
        
<div className="card">
    <div className="card-body">

        <div className="form-group">
            <input onInput={(e)=> setPostTitle(e.target.value)} className="form-control" placeholder="Message Title"/>
        </div>
  
    {
    editor ?  <edit.Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={Styles.wrapperclass}
        editorClassName={Styles.editorclass}
        wrapperStyle = {Styles.wrapperclass}
        editorStyle = {Styles.editorclass}
        toolbarClassName={Styles.toolbarclass}
      />  : ""

    }
    
<div className="mb-10 mt-4">
<InputLabel id="demo-simple-select-label">Choose Mode</InputLabel>
    <select className="form-control" onChange={(e)=>setmsgMode(e.target.value)}>
        <option value="users">Send to Users</option>
        <option value="schools">Send to School Owners</option>
        <option value="groups">Send to Group Owners</option>
        <option value="parents">Send to Parents</option>
    </select>
</div>

<div className="mt-4 text-right">
            <button className="btn btn-primary" disabled={formDisabled}  onClick={handlePostSubmit}>Send Message{preloader}</button>
</div>

</div>
</div>
</div>
</DashLayout>
    )
}