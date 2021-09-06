import useSWR, {mutate,trigger} from 'swr'
import Select from 'react-select'

export default function addtotean(){
    return (
        <div>
            <h2>WELLCO</h2>
        </div>
    )
}

export function Goal({teamid}){
    return (
        <div>
            <input className="form-control" value={teamid} placeholder="player name"/>
        </div>
    );
}
export function OffSide(){
    return (
        <div>
             <input className="form-control" placeholder="player name"/>
        </div>
    );
}
export function Corner(){
    return (
        <div>
             <input className="form-control" placeholder="player name"/>
        </div>
    );
}
export function ShotOnTarget(){
    return (
        <div>
             <input className="form-control" placeholder="player name"/>
        </div>
    );
}
export function Posession(){
    return (
        <div>
             <input className="form-control" placeholder="TEAM 1"/>
             <input className="form-control" placeholder="TEAM 2"/>
        </div>
    );
}
export function Card(){
    return (
        <div>
            <select className="form-control">
                <option style={{color : "yellow"}} className="font-weight-bold">Yellow</option>
                <option style={{color : "red"}} className="font-weight-bold">Red</option>
            </select>
            <input className="form-control" placeholder="Player"/>
        </div>
    );
}

export function Substitution(){
    return (
        <div>
            <input className="form-control" className="form-control" placeholder="player in" /> 
            <input className="form-control" className="form-control" placeholder="player out" /> 
        </div>
    );
}

export function Foul(){
    return (
        <div>
             <input className="form-control" placeholder="player" /> 
        </div>
    );
}

 export function SwitchUpdate(action,teamid){
    switch(action){
        case  "goal":
            return <Goal teamid={teamid}/>
        case "offside":
            return <OffSide />
        case "corner":
            return <Corner />
        case "shotontarget":
            return <ShotOnTarget />
        case "posession":
            return <Posession />
        case "card":
            return <Card />
        case "substitution":
            return <Substitution />
        case "foul":
            return <Foul />
    }
}
