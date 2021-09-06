import DashLayout from '../../../components/dashlayout'
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
import User from '../../../services/User';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import ScaleLoader from "react-spinners/ScaleLoader";
import { getclubname } from '../sports/football/components/appmethods';
import moment from 'moment';


export default function SportHome(){
    const [edit, setedit] = useState({})
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    const [convertedContent , setConvertedContent] = useState("")
    const [posttitle , setPostTitle] = useState("")
    const [cat , setCat] = useState("")
    const [match, setMatch] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [postCategory , setpostCategory] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    
  
    const formJson = {
        "post_title" : posttitle,
        "post_content" : convertedContent,
        "post_category" : cat,
        "status" : 1,
        "match_id" : selectedMatch
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
        
        <DashLayout title="Add New Post">
        <div className="section-body mt-3">
        
        
<div className="card">
    <div className="card-body">

        <div className="form-group">
            <input onInput={(e)=> setPostTitle(e.target.value)} className="form-control" placeholder="Post Title"/>
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
<InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
    <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={cat}
          onChange={(e)=>setCat(e.target.value)}
          className="form-control"
        >
          <MenuItem  value="">
            <em>Choose Category</em>
          </MenuItem>
          <MenuItem  value="livematch">
            <em>Live Match Streaming</em>
          </MenuItem>
         { 
         postCategory?.map(eachcat => <MenuItem value={eachcat.category_name}>{eachcat.category_name}</MenuItem>)
         }
    </Select>
</div>


<div className="form-group">
    <label>Select Match</label>
        <select onChange={(e)=> setSelectedMatch(e.target.value)} className="form-control" >
            {
                match?.map(
                    (eachmatch)=>{
                        return <option value={eachmatch?.match_id}>{`${eachmatch?.teama_name}  ${eachmatch?.teamb_name} @ ${moment(eachmatch?.match_day).format("LL")} `}</option>
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