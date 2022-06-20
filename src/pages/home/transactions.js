import DashLayout from '../../components/dashlayout';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import User from '../../services/User';
import moment from 'moment';
import { convertomoney } from '../../components/appmethods';
import { LoadingSkeleton } from '../../components/skeleton';

export default function Tranasactions(props){
    const router = useRouter()
    const { user, name } = router.query
    const userid = router.query.user
    const [fetchedData, setFetchedData] = useState({})
    const [transactions, setTransactions] = useState([])
    const [keyword,setKeyword] = useState("");
    const [pageReady, setPageReady] = useState(false);
    
    useEffect(
        ()=>{
            User.getServerData("/getusertransactions/"+userid).then(
                (response)=>{
                    setFetchedData(response.data)
                    setTransactions(response.data.transactions)
                    setPageReady(true);
                }
            ).catch(
                (err)=>{

                }
            )
        },[router.isReady, userid])
    
    function handleRadioChange(e){        
           var value = e.target.value
           let filteredData = transactions
           if(value == 1){
            filteredData = transactions?.filter(
                (eachtrans) => eachtrans.status == "success"
                )
           }else if(value == 0){
            filteredData = transactions?.filter(
                (eachtrans) => eachtrans.status == "failed"
                )
           }else{
               filteredData = transactions
           }
           setTransactions(filteredData)      
    }


    return(
        <DashLayout title="Dashbaord">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h5 className="text-center">{name}  Transactions History</h5>
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
                        <h5 className="number mb-0 font-32 text-center">{"₦ "+convertomoney(fetchedData.total_transaction_amount) }</h5>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Booked Tickets</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">{fetchedData.total_booked_tickets}</h5>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Successful</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">{fetchedData.success_transactions}</h5>
                    </div>
                </div>
            </div>


            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Failed</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="number mb-0 font-32 counter text-center">{fetchedData.failed_transactions}</h5>
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
                                          {transactions.length == 0 ? <h6>No transaction found for this User</h6> :  
                                          transactions?.map(
                                               (trans) => {
                                                   return (
                                                    <tr>
                                                    <td></td>
                                                    <td>{trans.transid}</td>
                                                    <td>{trans.type == "debit" ? "Buy Ticket" : "Add Money"}</td>
                                                    <td>{"₦ "+new Intl.NumberFormat().format(trans.amount)}</td>
                                                    <td>{
                                                        moment(trans.created_at).format('MMMM Do YYYY, h:mm a')
                                                        }</td>
                                                    <td>
                                                        {
                                                        trans.status == "success" ?
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
