import Head from 'next/head';
import React, {useEffect, useState, useContext} from 'react';
import Layout from '../components/authlayout';
import styles from '../styles/Home.module.css';
import {APP_NAME} from '../includes/constants';
import Link from 'next/link'
import User from '../services/User'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'
import { AppActions } from '../services/redux/actions';
import LoadingIcons from 'react-loading-icons'
import Image from 'next/image'

//import { userContext } from '../includes/context';

export default function Home() {
    const [user ,saveUser] = useState(null);
    const router = useRouter();
    const preLoader = <LoadingIcons.Rings />
    const [formDisable, setFormDisabled] = useState(true)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: "",
    }); 
    const loadingSvg = <img style={{fill : "white"}} src="/loading.svg" alt="IsLoading" width={20} height={20} />                                          
   
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        console.log(values);
        setValues(  (values) => ({
            ...values,
           email : event.target.value,
        }));
    };
    
    useEffect(
        ()=> {
            if(values.email == "" || values.password == ""){
                setFormDisabled(true)
            }else{
                setFormDisabled(false)
            }
        }
    ,[values.email, values.password])

    const handlePasswordChange = (event) => {
        setValues(  (values) => ({
            ...values,
           password : event.target.value,
        }));
        console.log(values);
    };

     const handleSubmit = () => {
        setFormDisabled(true)
        setFormSubmitted(true)
          User.login(values)
          .then((res) => {
              // const { user, storeUser } = useContext(userContext);
              // storeUser(JSON.stringify(res.data.user))
                localStorage.setItem("userAuth", JSON.stringify(res.data.user));
                localStorage.setItem("current_season", res.data.current_season);
                localStorage.setItem("userToken", res.data.token)
                localStorage.setItem("isLoggedIn", true)
                dispatch(AppActions.setUser(res.data.user.name))
                dispatch(AppActions.setUserLogged(true))
                toast.success("Welcome back to Canasportsng "+ res.data.user.name)
                router.push("/home/dashboard");
                setFormDisabled(false)
                setFormSubmitted(false)
            })
          .catch((err) =>  {
               toast.error("Invalid Credentials Provided")
               setFormDisabled(false)
               setFormSubmitted(false)
               //alert(errdata.status)
            })
       
    }   

        
  


  return (
    <div>

<Layout title={APP_NAME}> 
<ToastContainer toastStyle={{fontSize: "12px"}}/>
  <body className="font-montserrat">
  <div className="auth">
    <div className="auth_left">
        <div className="card">
            <div className="text-center mb-2">
                <a className="header-brand"><i className="fa fa-soccer-ball-o brand-logo"></i></a>
            </div>
            
            <div className="card-body">
                <div className="card-title">Login to your account</div>
                <div className="form-group">
                    <input type="email" name="email" value={values.email} onInput={handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label className="form-label">Password<a className="float-right small">I forgot password</a></label>
                    <input type="password" value={values.password}  name="password" onInput={handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">Remember me</span>
                    </label>
                </div>
                <div className="form-footer">
                    <button className="btn btn-primary btn-block" onClick={handleSubmit} title="" disabled={formDisable}>{ isFormSubmitted ?  loadingSvg  :  "Sign in"}</button>
                </div>
            </div>

        </div>        
    </div>
    <div className="auth-right"><img src="/canalogo.jpg"></img></div>
</div>
</body>
      </Layout>
    </div>
  )
}