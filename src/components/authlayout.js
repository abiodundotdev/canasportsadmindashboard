import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
export default function AuthLayout({children}, props){
    return (
    <div>
         
        <Head>
            <title>{props.title} Login</title>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <main>
            {children}
        </main>
    </div>
    );
}