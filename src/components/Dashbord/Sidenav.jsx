import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faClipboardList, faFileAlt, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

function Sidenav() {
    const handleLogout = () => {
        Axios.get('http://localhost:3003/logout') 
            .then((response) => {
                console.log(response);
                localStorage.removeItem('userEmail'); 
                window.location.replace('/'); 
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    const list = [
        { text: 'Home', href: '/', icon: <FontAwesomeIcon icon={faHome} /> , onClick: handleLogout},
        { text: 'Dashboard', href: '/dash', icon: <FontAwesomeIcon icon={faChartLine} /> },
        { text: 'Sales Record', href: '/sales', icon: <FontAwesomeIcon icon={faClipboardList} /> },
        { text: 'Report', href: '/report', icon: <FontAwesomeIcon icon={faFileAlt} /> },
        { text: 'Setting', href: '#', icon: <FontAwesomeIcon icon={faCog} />, dropdown: [
            { text: 'Manage Account', href: '#', icon: <FontAwesomeIcon icon={faUser} /> }
        ] },
        { text: 'Logout', href: '', icon: <FontAwesomeIcon icon={faSignOutAlt} />, onClick: handleLogout }
    ];
    
    return (
        <div className="sidebar bg-primary  " style={{ backgroundColor: 'rgb(83, 140, 247)', top: '30px' ,position:'fixed'}}>
            <ul className="nav flex-column">
                {list.map((item, index) => (
                    <li className="nav-item" key={index}>
                        {item.dropdown ? (
                            <div className="dropdown">
                                <a id="list" className="nav-link dropdown-toggle" href={item.href} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i>{item.icon}</i> {item.text}
                                </a>
                                <ul style={{width:'199px'}} className="dropdown-menu" aria-labelledby="list">
                                    {item.dropdown.map(( subItem, subIndex) => (
                                        <li key={subIndex} style={{display:'flex'}}><a style={{ color: 'black',marginRight:'0px', textDecoration:"none"}} id="icon" className="dropdown-item fs-6" href={subItem.href} ><i style={{marginRight:'1em'}}>{subItem.icon}</i>{subItem.text}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <a id="list" className="nav-link" href={item.href} onClick={item.onClick}>
                                <i >{item.icon} </i>{item.text}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidenav;
