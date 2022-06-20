import React from 'react'
import {useRouter} from 'next/router'

export default function CustomDataCard({data, url}){
    const router  = useRouter();
    const currentpath = router.pathname
    const tempUrl =  data?.league_name.replace(/\s/g, "-").toLowerCase();
    const fullurl = currentpath+"/"+tempUrl+"/"+data?.league_id;
    const handleRouting = () => {
        router.push(fullurl)
    }

    return (
        <div className="col-xl-3 col-lg-4 col-md-6" style={{cursor : "pointer"}} onClick={handleRouting} >
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{data?.league_name}</h3>
                            </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mt-10">   
                                 <h6 className="number mb-0 font-12 text-center">Teams</h6>
                                <h6 className="number mb-0 font-12 text-center text-blue">{data?.team_number}</h6>
                            </div>
                        </div>
                        </div>
        </div>
    )
}



export function CustomDataCardCup({data, url}){
    const router  = useRouter();
    const currentpath = router.pathname
    const tempUrl =  data?.cup_name.replace(/\s/g, "-").toLowerCase();
    const fullurl = currentpath+"/"+tempUrl+"/"+data?.cup_id;
    const handleRouting = () => {
        router.push(fullurl)
    }

    return (
        <div className="col-xl-3 col-lg-4 col-md-6" style={{cursor : "pointer"}} onClick={handleRouting} >
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{data?.cup_name}</h3>
                            </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">   
                                 <h6 className="number mb-0 font-12 text-center">Matches</h6>
                                <h6 className="number mb-0 font-12 text-center text-blue">10</h6>
                            </div>

                            <div className="d-flex justify-content-between mt-10">   
                                 <h6 className="number mb-0 font-12 text-center">Teams</h6>
                                <h6 className="number mb-0 font-12 text-center text-blue">{data?.team_number}</h6>
                            </div>
                        </div>
                        </div>
        </div>
    )
}