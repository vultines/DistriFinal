import React from "react";
import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'; 



export default function NavBar( {children}:any) {
  const [isLoggedIn, setBoolValue] = useState(false);
  const router = useRouter();
  const showHeader = router.pathname === '/login' ? false : true;

  const toggleValue = () => {
    setBoolValue(true);
    console.log(isLoggedIn);
  };
  if (!showHeader ) {
    return null;
  }

    return (
      <div>
          <div className="topContainer flex flex-row fixed top-0 left-0 right-0">
            <div className="logoSection flex flex-row justify-between">
              
              <a href="/"><img className="logo" src="/images/logo.png"></img></a>
            
            </div>


            <div className="circleBehind">
              <div className="navigationSection flex flex-row ">
              
              <ul className="linkSection flex flex-row">

                <div className="dv">
                  <li className="navLinks flex flex-column circleBehind">
                    <img className="icon" src="/images/location.png"></img>
                    <Link color={'inherit'} href="/map">Ubicaciones</Link>
                  </li>
                </div>

                <div className="dv">
                  <li className="navLinks flex flex-column circleBehind">
                    <img className="icon" src="/images/complaint.png"></img>
                    <Link color={'inherit'} href="/complaints">Complaints</Link>
                  </li>
                </div>

                {!isLoggedIn && (
                  <>
                    <div className="dv">
                      <li className="navLinks flex flex-row circleBehind">
                      <img src="/images/plus.png" className="icon" />
                      <Link color={'inherit'} href="/employee">Nuevo Funcionario</Link>
                    </li>
                    </div>

                    <div className="dv">
                      <li className="navLinks flex flex-row circleBehind">
                      <img src="/images/plus.png" className="icon" />
                      <Link color={'inherit'} href="/tutor">Nuevo Tutuor</Link>
                    </li>
                    </div>

                    <div className="dv">
                      <li className="navLinks flex flex-row circleBehind">
                      <img src="/images/newEst.png" className="icon" />
                      <Link color={'inherit'} href="/stablishment">Nuevo Centro</Link>
                      </li>
                    </div>
                  </>
                )}
                
                {!isLoggedIn && (
                  <>
                    <li className="navLinks">
                      |
                    </li>

                    <div className="dv">
                      <li className="navLinks flex flex-row circleBehind">
                        <img src="/images/person.png" className="icon"></img>
                        <a href="/login" onClick={toggleValue}>Soy Funcionario/a</a>
                      </li>
                    </div>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <li className="navLinks">
                      |
                    </li>
                    
                    <div className="dv">
                      <li className="navLinks flex flex-row circleBehind">
                        <img src="/images/person.png" className="icon"></img>
                        <a  href="/" onClick={toggleValue}>Salir</a>
                      </li>
                    </div>
                  </>
                )}      
                
              </ul>
              
            </div>
            </div>
            
          </div>
      </div>
    )
}

