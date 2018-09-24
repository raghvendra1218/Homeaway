import React, { Component } from 'react';

class LoginNavbar extends Component {
    render(){
        return(
        <div className="header-bce">
            <div className="container">
                <div className="navbar header navbar-bce">
                    <div className="navbar-inner">
                        <div className="pull-left">
                            <a href="http://localhost:3000" title="HomeAway" className="logo">
                                <img src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"} alt = "logo"/>
                            </a>    
                        </div>
                    </div>
                </div>
                <div className="header-bce-birdhouse-container">
                    <div className="flip-container">
                        <div className="flipper">
                            <div className="front btn-bce">
                                <img src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"} alt= "bridHouse"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default LoginNavbar;
        
        
        
        
