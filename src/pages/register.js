import Head from 'next/head';
import AuthLayout from '../components/authlayout';
import styles from '../styles/Home.module.css';
import {APP_NAME} from '../includes/constants';
import Link from 'next/link'


export default function Register() {
  return (
    <div>
<AuthLayout title={APP_NAME}> 
<body className="font-montserrat">
<div className="auth">
    <div className="auth_left">
        <div className="card">
            <div className="text-center mb-2">
                <a className="header-brand" href="index-2.html"><i className="fa fa-soccer-ball-o brand-logo"></i></a>
            </div>
            <div className="card-body">
                <div className="card-title">Register a New Account</div>

                <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter FullName" />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                   <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">Remember me</span>
                    </label>
                </div>
                <div className="form-footer">
                    <a href="index-2.html" className="btn btn-primary btn-block" title="">Sign Up</a>
                </div>
            </div>
            <div className="text-center text-muted">
               Already Have an Account?? <Link href="/">Sign In</Link>
            </div>
        </div>        
    </div>
    <div className="auth_right full_img">
        <img src="/canalogo.jpg" />
    </div>
</div>
</body>
      </AuthLayout>
    </div>
  )
}
