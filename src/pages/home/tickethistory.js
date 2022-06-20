import moment from 'moment';
import { useEffect, useState } from 'react';
import DashLayout from '../../components/dashlayout';
import User from '../../services/User';
export default function TicketHistory(props){
    const [fetchedData, savefetchedData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(
        () => {
           User.getServerData("/getallgenticket").then(
               (response) => {
                    savefetchedData(response.data)
               }
           ).catch(
               (err)=> {
                    console.log(err)
               }
           )
        },[])
        let number_of_page = Math.ceil(fetchedData?.length / 10)
    return(
        <DashLayout title="Ticket History">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h6>Ticket History</h6>
                        </div>                        
                    </div>
                </div>
        
        <div class="row clearfix contanier-fluid">
                
                <div class="col-xl-10 col-lg-10 col-md-10">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Ticket History</h3>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped text-nowrap table-vcenter mb-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Date Created</th>
                                                <th>Amount</th>
                                                <th>Number of Seats</th>
                                                <th>Units Booked/Reserved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                           fetchedData?.map(
                                              (eachdata) => {
                                                  return (
                                                    <tr>
                                                    <td>{eachdata.id}</td>
                                                    <td>{moment(eachdata?.issued_at).format("LLLL")}</td>
                                                    <td>{"₦ "+new Intl.NumberFormat().format(eachdata.price)}</td>
                                                    <td>{eachdata.nticket}</td>
                                                    <td>{eachdata.number_bought}</td>
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

<div className="d-flex justify-content-center">
<nav aria-label="Page navigation example">
    <ul className="pagination pagination justify-content-center">
    {
          currentPage <= 1 ? "" :  <li className="page-item"><a className="page-link" onClick={()=>setCurrentPage(currentPage-1)}>Previous</a></li>
    }
    {
    Array.apply(0, Array(number_of_page)).map(function (x, i) {
    return <li key={i+1} className={"page-item "+currentPage == i+1 ? "active" : ""}><a className="page-link" onClick={()=>setCurrentPage(i+1)} >{i+1}</a></li>
  })
    }
     {
    currentPage >=  number_of_page ? "" :
    <li className="page-item"><a className="page-link" onClick={()=>setCurrentPage(currentPage+1)} >Next</a></li>
     }
    </ul>
</nav>
</div>
    </div>

    
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
