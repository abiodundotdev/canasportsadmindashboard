import Skeleton from '@material-ui/lab/Skeleton';

export function LoadingSkeleton({length}){
   return  Array.apply(0, Array(length)).map(function (x, i) {
        return <><Skeleton css={{borderRadius : "20px"}} variant="rect" height={60} animation="wave" />  <br /> </> })
}

export function LoadingSkeletonSmTable({length}){
    return  Array.apply(0, Array(length)).map(function (x, i) {
         return <><Skeleton css={{borderRadius : "20px"}} variant="rect" height={30} animation="wave" />  <br /> </> })
 }
 
 export function FolderSkeleton({length}){
    return (
         Array.apply(0, Array(length)).map(function (x, i) {
         return <Skeleton width= {200} height={200} />
        })
        )
 }

export function TicketSkeleton(){
    return (
        <div className="d-flex justify-content-center mt-5" style={{display : "ne"}}>
        <div className="card mt-0 p-0" style={{width : 400}}>
            <div className="card-img-top" style={{
                        height : "280px",
                        borderRadius : '3px',
                        boxShadow : '0 5px 12px 0 rgba(0, 0, 0, 0.26)',
                        background : 'url(canalogo.jpg)',
                        margin: '2rem auto',
                        padding : '4px',
                        filter: 'drop-shadow(0 3px 10px #000)',}}>

            <Skeleton width= {400} height={300} />

        </div>


            

        <div className="card-body ">
            <table className="table table-striped">
                <tr>
                    <td rowSpan="6"><Skeleton width={50} height = {150} /> </td>
                </tr>

                <tr>
                    <td>Date/Time</td>
                    <td><Skeleton width ={100} /></td>
                </tr>

                <tr>
                    <td>Price::</td>
                    <td><Skeleton /></td>
                </tr>

                <tr>
                    <td>Unit::</td>
                    <td><Skeleton /></td>
                </tr>

                <tr>
                    <td>Total::</td>
                    <td><Skeleton /></td>
                </tr>

                <tr>
                    <td>Status::</td>
                    <td><Skeleton /></td>
                </tr>

            </table>
        </div>
    </div>
    
</div>

    )
}

export function AdminSkeleton({length}){
    return <div style={{display : "flex", justifyContent : "space-between"}} className="row"> 
    {
    Array.apply(0, Array(6)).map(function (x, i) {
         return (
<div class="col-xl-4 col-lg-4 col-md-6">
    <div class="card">
     <div class="card-body text-center ribbon">
         <div class="ribbon-box indigo"><Skeleton width={`60%`} /></div>
         <Skeleton circle={true} width={120} height={120} />
         <b><Skeleton width={`60%`} /></b>
         <br />
         <b><Skeleton width={`60%`} /></b>
         <br />
         <b><Skeleton width={`60%`} /></b>
         
        <div>
        <Skeleton width={`60%`} height={30} />
         <Skeleton width={`60%`} height={30} />
         </div>

         <div class="row text-center mt-4">
             <div class="col-6 border-right">
                 <label class="mb-0"><Skeleton /></label>
                 <h4 class="font-18"><Skeleton /></h4>
             </div>
             <div class="col-6">
                 <label class="mb-0"><Skeleton /></label>
                 <h4 class="font-18"><Skeleton /></h4>
             </div>
         </div>
     </div>
 </div>
</div>
)
          })
        }
    </div>
 }
 

 export function ClubSkeleton({length}){
    return <div style={{display : "flex", justifyContent : "space-between"}} className="row"> 
    {
    Array.apply(0, Array(6)).map(function (x, i) {
         return (
<div class="col-xl-3 col-lg-3 col-md-3">
    <div class="card">
     <div class="card-body text-center ribbon">
         <Skeleton circle={true} width={120} height={120} />
         <b><Skeleton width={`60%`} /></b>
         <br />
         
        <div>
        <Skeleton width={`60%`} height={30} />
         <Skeleton width={`60%`} height={30} />
         </div>

         <div class="row text-center mt-4">
             <div class="col-6 border-right">
                 <label class="mb-0"><Skeleton /></label>
                 <h4 class="font-18"><Skeleton /></h4>
             </div>
             <div class="col-6">
                 <label class="mb-0"><Skeleton /></label>
                 <h4 class="font-18"><Skeleton /></h4>
             </div>
         </div>
     </div>
 </div>
</div>
)
          })
        }
    </div>
 }
 

 {
    /*
 <div class="col-xl-4 col-lg-4 col-md-6">
 <div class="card">
     <div class="card-body text-center ribbon">
         <div class="ribbon-box indigo">DE</div>
         <Image src="/user.jpg" className="rounded-circle img-thumbnail w100" alt="Picture of the author" width={500} height={500} />
         <h6 class="mt-3 mb-0"></h6>
         <b>AD</b>
         <br />
         <b>AD</b>
         <br />
         <b>AD</b>
         
         <div>
         <button class="btn btn-primary btn-sm">Disable</button>
         <button class="btn btn-danger btn-sm ml-3">Delete</button>
         </div>

         <div class="row text-center mt-4">
             <div class="col-6 border-right">
                 <label class="mb-0">Last Active</label>
                 <h4 class="font-18">07</h4>
             </div>
             <div class="col-6">
                 <label class="mb-0">Logins</label>
                 <h4 class="font-18">20</h4>
             </div>
         </div>
     </div>
 </div>
</div>
*/
 }