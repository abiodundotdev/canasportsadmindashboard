import DashLayout from '../../components/dashlayout';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import User from '../../services/User';
import moment from 'moment';
import { convertomoney } from './sports/football/components/appmethods';
import { LoadingSkeleton } from '../../components/skeleton';

export default function Tranasactions(props){
    const router = useRouter()
    const { user } = router.query
    const userid = router.query.user
    const [fetchedData, setFetchedData] = useState([])
    const [filterBy, setFilterBy] = useState("all")
    const [keyword,setKeyword] = useState("");
    const [pageReady, setPageReady] = useState(false);
    
    useEffect(
        ()=>{
            User.getServerData("/getusertransactions/"+userid).then(
                (response)=>{
                    setFetchedData(response.data)
                    setPageReady(true);
                }
            ).catch(
                (err)=>{

                }
            )
        },[])

    
    const successful = fetchedData?.filter(
            (eachtrans) => eachtrans.status == 1
    )

    const failed = fetchedData?.filter(
        (eachtrans) => eachtrans.status == 0
    )

    const totalamountadded = fetchedData?.filter(
        (eachtrans) => eachtrans.type == "add" && eachtrans.status == 1
    )

    const totamap = totalamountadded?.map(
            (eachtrans) => eachtrans.amount
    )

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    let sumtotaladded = totamap?.length == 0 ? 0 : totamap?.reduce(reducer)

    const filtertransactions = fetchedData?.filter( (eachdata) => 
      eachdata.transactionid.includes(keyword) || eachdata.type.includes(keyword)
    )

    function handleRadioChange(e){
           var value = e.target.value
           let filtdata = fetchedData
           if(value == 1){
            filtdata = fetchedData?.filter(
                (eachtrans) => eachtrans.status == 1
                )
           }else if(value == 0){
            filtdata = fetchedData?.filter(
                (eachtrans) => eachtrans.status == 0
                )
           }else{
               filtdata = fetchedData
           }
           setFetchedData(filtdata)
             
    }


    return(
        <DashLayout title="Dashbaord">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h5 className="text-center">{userid}  Transactions History</h5>
                        </div>                        
                    </div>
                </div>

            <div className="row clearfix row-deck">
            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Total Amount Added</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 text-center">{"₦ "+convertomoney(sumtotaladded) }</h5>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Booked Tickets</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">0</h5>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Successful</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">{successful.length}</h5>
                    </div>
                </div>
            </div>


            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Failed</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">{failed.length}</h5>
                    </div>
                </div>
            </div>

            </div>
        
        <div class="row clearfix contanier-fluid">
        
    <div className="card">
        <div className="card-body">
        <div className="input-group mt-2">
            <input type="text" value={keyword} onInput={(e) => setKeyword(e.target.value)} className="form-control search" placeholder="Search By Transaction ID OR Amount" />
        </div>
    </div>
    </div>
{
   
    !pageReady ? <LoadingSkeleton length={10} /> : 
    <>
             <div className="col-xl-10 col-lg-10 col-md-10">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Transactions History</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped text-nowrap table-vcenter mb-0">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Transaction Id</th>
                                                <th>Transaction Type</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          { fetchedData?.length <= 1 ? <h6>No transaction found for this User</h6> :  
                                           filtertransactions?.map(
                                               (trans) => {
                                                   return (
                                                    <tr>
                                                    <td></td>
                                                    <td>{trans.transactionid}</td>
                                                    <td>{trans.type == "add" ? "Add Money" : "Buy Ticket"}</td>
                                                    <td>{"₦ "+new Intl.NumberFormat().format(trans.amount)}</td>
                                                    <td>{
                                                        moment(trans.created_at).format('MMMM Do YYYY, h:mm a')
                                                        }</td>
                                                    <td>
                                                        {
                                                        trans.status == 1 ?
                                                        <span className="tag tag-danger">Successful</span>
                                                        :
                                                        <span className="tag tag-success">Failed</span>
                                                        }
                                                    </td>
                                                    </tr>
                                                   )
                                               }
                                           )
                                        }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

            
        <div className="col-lg-2">
            <div className="card">
                <div class="card-header">
                    <h3 class="card-title">Filter</h3>
                </div>
                <div className="p-2" onChange={handleRadioChange}>
                   <label className="card d-flex justify-content-between"> <input type="radio" value="all" name="sort" /> <b> All </b> </label>
                   <label className="card d-flex justify-content-between"> <input type="radio" value={1} name="sort" />  <b>Successful</b> </label>
                   <label className="card d-flex justify-content-between"> <input type="radio" value={0} name="sort" /> <b>Failed</b></label>
                   <label className="card d-flex justify-content-between"> <input type="radio" value={2} name="sort" /> <b>Pending</b></label>
                </div>
            </div>
        </div>
</>

}

    </div>

        


        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
