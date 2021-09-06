export default function UserBar () { 
    return (
        <div className="user_div">
        <h5 className="brand-name mb-4">Soccer<a href="javascript:void(0)" className="user_btn"><i className="icon-logout"></i></a></h5>
        <div className="card-body">
            <a href="page-profile.html"><img className="card-profile-img" alt="" /></a>
            <h6 className="mb-0">Peter Richards</h6>
            <span>peter.richard@gmail.com</span>
            <div className="d-flex align-items-baseline mt-3">
                <h3 className="mb-0 mr-2">9.8</h3>
                <p className="mb-0"><span className="text-success">1.6% <i className="fa fa-arrow-up"></i></span></p>
            </div>
            <div className="progress progress-xs">
                <div className="progress-bar" role="progressbar" style={{width: '15%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-info" role="progressbar" style={{width: '20%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-success" role="progressbar" style={{width: '30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-orange" role="progressbar" style={{width: '5%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-indigo" role="progressbar" style={{width: '13%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h6 className="text-uppercase font-10 mt-1">Performance Score</h6>
            <hr />
            <p>Activity</p>
            <ul className="new_timeline">
                <li>
                    <div className="bullet pink"></div>
                    <div className="time">11:00am</div>
                    <div className="desc">
                        <h3>Attendance</h3>
                        <h4>Computer className</h4>
                    </div>
                </li>
                <li>
                    <div className="bullet pink"></div>
                    <div className="time">11:30am</div>
                    <div className="desc">
                        <h3>Added an interest</h3>
                        <h4>“Volunteer Activities”</h4>
                    </div>
                </li>
                <li>
                    <div className="bullet green"></div>
                    <div className="time">12:00pm</div>
                    <div className="desc">
                        <h3>Developer Team</h3>
                        <h4>Hangouts</h4>
                        <ul className="list-unstyled team-info margin-0 p-t-5">                                            
                            <li><img src="assets/images/xs/avatar1.jpg" alt="Avatar" /></li>
                            <li><img src="assets/images/xs/avatar2.jpg" alt="Avatar" /></li>
                            <li><img src="assets/images/xs/avatar3.jpg" alt="Avatar" /></li>
                            <li><img src="assets/images/xs/avatar4.jpg" alt="Avatar" /></li>                                            
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="bullet green"></div>
                    <div className="time">2:00pm</div>
                    <div className="desc">
                        <h3>Responded to need</h3>
                        <a href="javascript:void(0)">“In-Kind Opportunity”</a>
                    </div>
                </li>
                <li>
                    <div className="bullet orange"></div>
                    <div className="time">1:30pm</div>
                    <div className="desc">
                        <h3>Lunch Break</h3>
                    </div>
                </li>
                <li>
                    <div className="bullet green"></div>
                    <div className="time">2:38pm</div>
                    <div className="desc">
                        <h3>Finish</h3>
                        <h4>Go to Home</h4>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    )
 }