import {BiFullscreen} from 'react-icons/bi'
function NavBar({title}){
    return (
        <div id="page_top" className="section-body top_dark">
        <div className="container-fluid">
            <div className="page-header">
                <div className="left">
                    <a href="javascript:void(0)" className="icon menu_toggle mr-3"><i className="fa  fa-align-left"></i></a>
                    <h1 className="page-title">{title}</h1>                        
                </div>
                <div className="right">
                    
                    <div className="notification d-flex">
                
                <div className="d-flex">
                    <a title="FULL SCREEN" className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"><i><BiFullscreen /></i><span className="badge badge-success nav-unread"></span></a>
                </div>         

                        <div className="dropdown d-flex">
                            <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-envelope"></i><span className="badge badge-success nav-unread"></span></a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul className="right_chat list-unstyled w350 p-0">
                                    <li className="online">
                                        <a className="media">
                                            <div className="media-body">
                                                <span className="name">Donald Gardner</span>
                                                <div className="message">It is a long established fact that a reader</div>
                                                <small>11 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="online">
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar5.jpg" alt="" />
                                            <div className="media-body">
                                                <span className="name">Wendy Keen</span>
                                                <div className="message">There are many variations of passages of Lorem Ipsum</div>
                                                <small>18 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </a>                            
                                    </li>
                                    <li className="offline">
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="" />
                                            <div className="media-body">
                                                <span className="name">Matt Rosales</span>
                                                <div className="message">Contrary to popular belief, Lorem Ipsum is not simply</div>
                                                <small>27 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </a>                            
                                    </li>
                                    <li className="online">
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar3.jpg" alt="" />
                                            <div className="media-body">
                                                <span className="name">Phillip Smith</span>
                                                <div className="message">It has roots in a piece of classNameical Latin literature from 45 BC</div>
                                                <small>33 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </a>                            
                                    </li>                        
                                </ul>
                                <div className="dropdown-divider"></div>
                                <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-bell"></i><span className="badge badge-primary nav-unread"></span></a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul className="list-unstyled feeds_widget">
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-check"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-danger">Issue Fixed <small className="float-right text-muted">11:05</small></h4>
                                            <small>WE have fix all Design bug with Responsive</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-user"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">New User <small className="float-right text-muted">10:45</small></h4>
                                            <small>I feel great! Thanks team</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-thumbs-o-up"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Feedback <small className="float-right text-muted">Today</small></h4>
                                            <small>It will give a smart finishing to your site</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-question-circle"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-warning">Server Warning <small className="float-right text-muted">10:50</small></h4>
                                            <small>Your connection is not private</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-shopping-cart"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Orders <small className="float-right text-muted">11:35</small></h4>
                                            <small>You received a new oder from Tina.</small>
                                        </div>
                                    </li>                                   
                                </ul>
                                <div className="dropdown-divider"></div>
                                <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-user"></i></a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <a className="dropdown-item" href="page-profile.html"><i className="dropdown-icon fe fe-user"></i> Profile</a>
                                <a className="dropdown-item" href="app-setting.html"><i className="dropdown-icon fe fe-settings"></i> Settings</a>
                                <a className="dropdown-item" href="javascript:void(0)"><span className="float-right"><span className="badge badge-primary">6</span></span><i className="dropdown-icon fe fe-mail"></i> Inbox</a>
                                <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-send"></i> Message</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-help-circle"></i> Need help?</a>
                                <a className="dropdown-item" href="login.html"><i className="dropdown-icon fe fe-log-out"></i> Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default NavBar