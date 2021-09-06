import DashLayout from '../../components/dashlayout';
import React, { useState } from 'react';

export default function Dashbaord(props){
    const [amount, setAmount] = useState(0);
    
    const onChangeHandler = event => {
        setAmount(event.target.value);
      };


    return(
        <DashLayout title="Dashbaord">
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="mb-4">
                            <h4>My Wallet</h4>
                        </div>                        
                    </div>
                </div>


        <div class="d-lg-flex d-xl-flex justify-content-between">
                
            <div className="col-xl-6 col-lg-6">
                <div class="card">
                <div class="col ">
                
                <div className="card-header">
                    <h3 className="card-title text-center">Your Wallet</h3>
                </div>
                
            <div className="card-body">
                <h6  class="text-center">Available Balance</h6>
                <h1 class="text-center">₦ 6.31</h1>
            </div>

                </div>

                </div>
            </div>

           

        <div className="col-xl-6 col-lg-6">
            <div class="card">
                <div className="card-header">
                    <h3 className="card-title text-center">Fund Wallet</h3>
            </div>

           
            <div className="card-body">
                <div class="d-flex justify-content-center">
                    <form class="col-12">
                        <label>Input The Amount to fund your Wallet With</label>
                        <input type="number"  onChange={onChangeHandler} value={amount} class="form-control" />
                        <br />
                        <div class="col text-center">
                        <button class="btn btn-primary text-center">ADD ₦ {new Intl.NumberFormat().format(amount)} to Wallet</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

            </div>

        </div>

        <br />
        <br />




        <div class="row clearfix contanier-fluid">
                
                <div class="col-xl-12 col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Wallet History</h3>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped text-nowrap table-vcenter mb-0">
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
                                            <tr>
                                                <td>#AD1245</td>
                                                <td>Sean Black</td>
                                                <td>Angular Admin</td>
                                                <td>$14,500</td>
                                                <td>Done</td>
                                                <td><span class="tag tag-success">Delivered</span></td>
                                            </tr>
                                            <tr>
                                                <td>#DF1937</td>
                                                <td>Sean Black</td>
                                                <td>Angular Admin</td>
                                                <td>$14,500</td>
                                                <td>Pending</td>
                                                <td><span class="tag tag-success">Delivered</span></td>
                                            </tr>
                                            <tr>
                                                <td>#YU8585</td>
                                                <td>Merri Diamond</td>
                                                <td>One page html Admin</td>
                                                <td>$500</td>
                                                <td>Done</td>
                                                <td><span class="tag tag-orange">Submit</span></td>
                                            </tr>
                                            <tr>
                                                <td>#AD1245</td>
                                                <td>Sean Black</td>
                                                <td>Wordpress One page</td>
                                                <td>$1,500</td>
                                                <td>Done</td>
                                                <td><span class="tag tag-success">Delivered</span></td>
                                            </tr>
                                            <tr>
                                                <td>#GH8596</td>
                                                <td>Allen Collins</td>
                                                <td>VueJs Application</td>
                                                <td>$9,500</td>
                                                <td>Done</td>
                                                <td><span class="tag tag-success">Delivered</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

    </div>

        


        
        
        
        
        
        
        
        </div>
        </div>
        </DashLayout>
    )
}
