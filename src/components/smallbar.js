import Link from 'next/link';
function SmallBar(){
    return (
 <div id="header_top" className="header_top">
        <div className="container">
            <div className="hleft">
                <a className="header-brand"><i className="fa fa-soccer-ball-o brand-logo"></i></a>
                <div className="dropdown">
                    <a className="nav-link user_btn"><img className="avatar" src="/canalogonobg.png" alt="" data-toggle="tooltip" data-placement="right" title="User Menu"/></a>
                   </div>
            </div>
            <div className="hright">
                <div className="dropdown">
                    <a className="nav-link icon settingbar"><i className="fa fa-gear fa-spin" data-toggle="tooltip" data-placement="right" title="Settings"></i></a>
                    <a className="nav-link icon menu_toggle"><i className="fa  fa-align-left"></i></a>
                </div>            
            </div>
        </div>
    </div>
    )
}
export default SmallBar;
