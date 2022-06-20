import DashLayout from '../../../components/dashlayout'
import { useState, useEffect } from 'react';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



export default function SportHome(){
    const [edit, setedit] = useState({})
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    const [convertedContent , setConvertedContent] = useState("")
    const [posttitle , setPostTitle] = useState("")
    const [postBanner , setPostBanner] = useState("")
    const [cat , setCat] = useState("")
    const [match, setMatch] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [postCategory , setpostCategory] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [value, setValue] =  useState("");
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    
  
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
        
        <div className="form-group">
            <input onInput={(e)=> setPostBanner(e.target.value)} className="form-control" placeholder="Post Banner Url"/>
        </div>
  
  
   
        <CKEditor 
                            editor={ ClassicEditor }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setValue(data);
                                //console.log(data);
                            } }
                            onBlur={ ( event, editor ) => {
                              //  console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                               // console.log( 'Focus.', editor );
                            } }
    />

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