import {useRouter} from 'next/router'
import useSWR, {mutate,trigger} from 'swr'
import User from '../../../../../services/User'
export default function AppMethods(){
    return ["HEE", 'EYUEW']
}
export function getRouteData(){
    const router = useRouter()
    const { leagueid } = router.query
    const spiltedid = leagueid?.split("-")
    const leaguerealid = spiltedid[spiltedid.length - 1]
    const stopAt = spiltedid.length - 1;
    const league_name = spiltedid.slice(0,stopAt).toString().replace(",", " ").toUpperCase();
    return {
        'league_name' : league_name,
        'league_id' : leaguerealid
    }
}

export function getRouteDataCup(){
    const router = useRouter()
    var { cupid } = router.query
    const spiltedid = cupid?.split("-")
    const cuprealid = spiltedid[spiltedid?.length - 1]
    const stopAt = spiltedid?.length - 1;
    const cup_name = spiltedid.slice(0,stopAt).toString().toUpperCase();
    return {
        'cup_name' : cup_name,
        'cup_id' : cuprealid
    }
}

export function matchStatusToString(matchstatus,matchhalf){
    let spandata;
        if(matchstatus == 0 && matchhalf == 1){
            spandata = <span class="tag tag-warning"><small>HT</small></span>
        }else if(matchstatus == 0 && matchhalf == 2){
            spandata = <span class="tag tag-danger"><small>FT</small></span>
        }else if(matchstatus == 1 && matchhalf == 1){
            spandata = <span class="tag tag-info"><small>FHIP</small></span>
        }else if(matchstatus == 1 && matchhalf == 2){
            spandata = <span class="tag tag-info"><small>SHIP</small></span>
        }else{
            spandata = <span class="tag tag-primary"><small>NP</small></span>
        }
    return spandata
}

export function convertomoney(amount){
    return new Intl.NumberFormat().format(amount)
}

export function getclubname(clubid){
        const clubdata =  User.getServerData("/getoneteam/"+clubid).then((response) => {
                return response.data.team_name
        });
        return clubdata;
}
 export function getTeamPoints(teamid){
    const  {league_name, league_id} = getRouteData();
    const {data : listmatches} = useSWR("/listleaguematches/"+league_id, {refreshInterval: 500, refreshWhenHidden : true});
    const foundasteamA = listmatches?.filter(
        (eachmatch) => eachmatch.team_a == teamid
    )

    const foundasteamB = listmatches?.filter(
        (eachmatch) => eachmatch.team_b == teamid
    )

    const fetchAllMatchesByClub = listmatches?.filter(
        (eachmatch) => eachmatch.team_a == teamid || eachmatch.team_b == teamid
    )
    
    console.log(foundasteamA)
    console.log(foundasteamB)
    
    //Match Wins Calculator
    const matchWinAsTeamA = foundasteamA?.filter(
        (eachmatch) => eachmatch.score_a > eachmatch.score_b
    )
    const matchWinAsTeamB = foundasteamB?.filter(
        (eachmatch) => eachmatch.score_b > eachmatch.score_a
    )
    const totalwins = matchWinAsTeamA?.length + matchWinAsTeamB?.length
    
    //Match Loss Calculator
    const matchLossAsTeamA = foundasteamA?.filter(
        (eachmatch) => eachmatch.score_b > eachmatch.score_a
    )

    const matchLossAsTeamB = foundasteamB?.filter(
        (eachmatch) => eachmatch.score_a > eachmatch.score_b
    )

    const totalloss = matchLossAsTeamA?.length + matchLossAsTeamB?.length

    //Draw Calculator
   
    const totalPlayed = fetchAllMatchesByClub?.length

    const matchDraw = fetchAllMatchesByClub?.filter(
        (eachmatch) => eachmatch.score_a == eachmatch.score_b
    )
    const totaldraw  = matchDraw?.length
   
    //Match POINTS CALCULATOR START
    const matchpointsatA = foundasteamA?.map(
        (eachmatch) => eachmatch.point_a
    )
    const matchpointsatB = foundasteamB?.map(
        (eachmatch) => eachmatch.point_b
    )
    //MATCH GOAL CALCULATOR STARTS
    const matchgoalsatA = foundasteamA?.map(
        (eachmatch) => eachmatch.score_a
    )
    const matchgoalsatB = foundasteamB?.map(
        (eachmatch) => eachmatch.score_b
    )
    //Match Goal Agianst
    const matchgoalsAgainstatA = foundasteamA?.map(
        (eachmatch) => eachmatch.score_b
    )

    const matchgoalsAgainstatB = foundasteamB?.map(
        (eachmatch) => eachmatch.score_a
    )

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(matchpointsatA,matchgoalsatA,matchgoalsAgainstatA)
    console.log(matchpointsatB,matchgoalsatB,matchgoalsAgainstatB)
    
    let sumpointsasa = matchpointsatA?.length == 0 ? 0 : matchpointsatA?.reduce(reducer)
    let sumpointsasb = matchpointsatB?.length == 0 ? 0 : matchpointsatB?.reduce(reducer)
    
    let sumgoalsasa = matchgoalsatA?.length == 0 ? 0 : matchgoalsatA?.reduce(reducer)
    let sumgoalsasb = matchgoalsatB?.length == 0 ? 0 : matchgoalsatB?.reduce(reducer)
    
    let sumgoalsAgainstasa = matchgoalsAgainstatA?.length == 0 ? 0 : matchgoalsAgainstatA?.reduce(reducer)
    let sumgoalsAgaisntasb = matchgoalsAgainstatB?.length == 0 ? 0 : matchgoalsAgainstatB?.reduce(reducer)


    let totalpoints = sumpointsasa + sumpointsasb
    let totalgoalsfor = sumgoalsasa + sumgoalsasb
    let totalgoalsAgainst = sumgoalsAgainstasa + sumgoalsAgaisntasb
    let goaldifference = totalgoalsfor - totalgoalsAgainst
    console.log(totalpoints,totalgoalsfor)
    return [totalpoints,totalgoalsfor,totalgoalsAgainst,goaldifference,totalwins,totalloss,totaldraw,totalPlayed]
}

