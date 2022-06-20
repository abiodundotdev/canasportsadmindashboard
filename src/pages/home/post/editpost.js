import DashLayout from '../../../components/dashlayout'
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
import User from '../../../services/User';
import ScaleLoader from "react-spinners/ScaleLoader";
import {useRouter} from 'next/router'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function EditPostPage(){
    const [edit, setedit] = useState({})
    const router = useRouter()
    const postId = router.query.id
    const [convertedContent , setConvertedContent] = useState("")
    const [posttitle , setPostTitle] = useState("")
    const [postContent , setPostcontent] = useState("")
    const [postBanner , setPostBanner] = useState("")
    const [cat , setCat] = useState("")
    const [post, setPost] = useState({});
    const [postCategory , setpostCategory] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const preloader = isFormSubmitted ? <ScaleLoader height={13} color="white" /> : " "
    const [value, setValue] =  useState("");
  
  
    const formJson = {
        "post_id" : postId,
        "banner" : postBanner,
        "post_title" : posttitle,
        "post_content" : value,
        "post_category" : cat,
        "status" : 1,
    }
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
           User.getServerData("/getpostbyid/"+postId).then(
            (response)=> {
                setPost(response.data)
                setPostTitle(response.data.post_title)
                setPostBanner(response.data.banner)
                setPostcontent(response.data.post_content)
                setCat(response.data.post_category)
            }
        ).catch(
            (err)=>{
            }
        )


        },[router.isReady, postId]
    )

    const handlePostSubmit = () => {
        setFormSubmitted(true)
        setFormDisabled(true)
        User.saveDataToServer(formJson, "/update-post").then(
            (res)=> {
                toast.success("Post Updated Successfully")
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
        
        <DashLayout title="Update Post">
        <div className="section-body mt-3">  
        
    <div className="card">
    <div className="card-body">

        <div className="form-group">
            <input onInput={(e)=> setPostTitle(e.target.value)} value={posttitle} className="form-control" placeholder="Post Title"/>
        </div>
        <br />
        <div className="form-group">
            <input onInput={(e)=> setPostBanner(e.target.value)} value={postBanner} className="form-control" placeholder="Post Banner"/>
        </div>
    <br />
  
        <CKEditor 
                            editor={ ClassicEditor }
                            data={post.post_content}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setValue(data);
                               // console.log(data);
                            } }
                            onBlur={ ( event, editor ) => {
                              //  console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                              //  console.log( 'Focus.', editor );
                            } }
    />
    <br /> <br />
<div className="form-group">
    <label>Select Category</label>
        <select value={cat} onChange={(e)=> setCat(e.target.value)} className="form-control" >
            {
                postCategory?.map(
                    (eachcat)=>{
                        return <option  selected={post.post_category == post.post_category ? "selected" : ""} value={post.post_category}>{eachcat?.category_name}</option>
                    }
                )
            }
        </select>
</div>
    <br />
    <div className="mt-4 text-right">
    <button className="btn btn-primary" disabled={formDisabled}  onClick={handlePostSubmit}>Update Post</button>
</div>

</div>
</div>
</div>
        </DashLayout>
    )
}