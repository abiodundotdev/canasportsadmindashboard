import { useEffect, useState } from 'react'
import DashLayout from '../../../components/dashlayout'
import User from '../../../services/User'
import {toast} from 'react-toastify'
import {RiSaveFill} from 'react-icons/ri'

export default function Category(){
    const [name,setName]= useState("")
    const [description, setDescription] = useState("")
    const [isFormDiabled, setFormDisabled] = useState(true)
    const [category,setpostCategory] = useState([])

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
        },[category]
    )


    useEffect(
        ()=> {
            if(name == ""){
                setFormDisabled(true)
            }else{
                setFormDisabled(false)
            }
        },[name])

    function handleFormSubmit(){
        setFormDisabled(true)
        User.saveDataToServer({"category_name" : name, "category_description" : description}, "/savecategory").then(
            (response)=> {
                    toast.success("Catogory Added Successsfully")
                    setFormDisabled(false)
            }
        ).catch(
            (err)=> {
                    toast.error("An error occur")
                    setFormDisabled(false)
            }
        )
    }
    return (
<DashLayout title="Add New Category">
<div className="section-body mt-3"> 
    <div className="row">
        <div className="col-lg-5">
        <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Add New Category</h3>
                </div>

            <div className="card-body">
                <div className="form-group">
                    <label for="formGroupExampleInput">Category Name</label>
                    <input type="text" onInput={(e) => setName(e.target.value)}  className="form-control" id="name" placeholder="Category Name" />
                </div>

                <div className="form-group">
                    <label for="formGroupExampleInput">Category Description</label>
                    <input type="text" onInput={(e) => setDescription(e.target.value)}  className="form-control" id="name" placeholder="Description" />
                </div>

                <div className="form-group d-flex justify-content-center">
                    <button onClick={handleFormSubmit} className="btn btn-success mt-10 text-center d-flex" disabled={isFormDiabled}><i className="mr-2"><RiSaveFill /></i> <small className="mr-2">Save Category</small>  </button>
                </div>

            </div>

        </div>
        </div>

        <div className="col-lg-2"></div>
        
    <div className="col-lg-5">
        <div className="card">
               <div className="card-header">
                   <h6 className="card-title">Category</h6>
               </div>
                    
               <div className="card-body">
               <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" ><small>Name</small></th>
                        <th scope="col" ><small>Description</small></th>
                       </tr>
                    </thead>
                    <tbody>
                      {
                          category?.map(
                              (eachdata) => {
                                  return <tr> <td>{eachdata.category_name}</td> <td>{eachdata.category_description}</td> </tr>
                              }
                          )
                      }
                    </tbody>
                </table>
               </div>

           </div>
    </div>


    </div>
</div>

</DashLayout>
    )
}