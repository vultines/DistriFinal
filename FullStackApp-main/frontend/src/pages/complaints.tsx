import BodyCard from '@/components/appointmentsBody';
import React, {useEffect, useState} from 'react';

import { getAllComplaints } from './api/backend.api';

const App: React.FC = () => {

    const [complaints, setComp] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllComplaints();
            console.log(res);
            setComp(res.data);
        }
        loadData();
    }, [])

  return (
    <div className="mainFormContainer">
         <div className="circlesConatiner">
        <div className="big--circle">
                <div className="big--circle-content">
                </div>
                <div className="big--circle-content bottom: auto; top: auto; left: -50px; right: 0">
                </div>
                <div className="big--circle-content top: auto; bottom: auto; right: -50px">
                </div>
                <div className="big--circle-content top: auto; bottom: -50px">
                </div>
                <div className="mid--circle">
                    <div className="mid--circle-content">
                    </div>
                    <div className="mid--circle-content bottom: auto; top: auto; left: -35px; right: 0">
                    </div>
                    <div className="mid--circle-content top: auto; bottom: auto; right: -35px">
                    </div>
                    <div className="mid--circle-content top: auto; bottom: -35px">
                    </div>
                    <div className="small--circle">
                    <div className="small--circle-content">
                    </div>
                    <div className="small--circle-content bottom: auto; top: auto; left: -25px; right: 0">
                    </div>
                    <div 
                        className="small--circle-content top: auto; bottom: auto; right: -25px">
                    </div>
                    <div className="small--circle-content top: auto; bottom: -25px">
                    </div>
                    </div>
                </div>
            </div>
       </div>
        <div className="cardSubContainer">
            <a>Todas </a> -  <a>Verificadas</a> - <a>No Verificadas</a>
        <div className="formTitleCM">
                <div className="picContainerCM">
                    <div className="formssubTitle">
                        <h1>Todas las Denuncias.</h1>
                    </div>
                </div>
                
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                {complaints.map((complaint) => (
                    <div >
                        <BodyCard 
                        title="Denuncias - Centros Infantiles"
                        description={complaint.description} 
                        stablishment={complaint.stablishments_id} />
                        <br></br>
                    </div>
                    
                ))}
            </div>
        </div>
        
      
    </div>
  );
};

export default App;