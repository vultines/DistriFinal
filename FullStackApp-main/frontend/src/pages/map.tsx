import React from 'react';
import { GoogleMap, Marker, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { useEffect, useState} from 'react';
import {getAllStabs, getAllEmployees, updateStabs, deleteStabs, getStabsById} from './api/backend.api'
import axios from 'axios';

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

const containerStyle = {
    width: '100%' ,
    height: '750px',
};

const center = {
    lat: -17.375646108432843, 
    lng: -66.16875813592937
};

function MyComponent() {

    const [employeeAll, setEmployee] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllEmployees();
            console.log(res);
            setEmployee(res.data);
        }
        loadData();
    }, [])

    const [stabsAll, setStabs] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllStabs();
            console.log(res);
            setStabs(res.data);
        }
        loadData();
    }, [])



    const [visible, setVisible] = React.useState(false);
     //get by id
    const [selectedEstablishmentId, setSelectedEstablishmentId] = useState();
    const [selectedEstablishmentData, setSelectedEstablishmentData] = useState();

  
    useEffect(() => {
        const fetchStabs = async () => {
          try {
            const response = await getStabsById(selectedEstablishmentId);
            setSelectedEstablishmentData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (selectedEstablishmentId) {
            fetchStabs();
        }
      }, [selectedEstablishmentId]);

    const handler = (id) => {
        setVisible(true), 
        setSelectedEstablishmentId(id)}
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    //setselected
    useEffect(() => {
        if (selectedEstablishmentId) {

          axios.get(`http://127.0.0.1:8000/backend/api/v1/stablishments/${selectedEstablishmentId}`)
            .then(response => {
              // Process the response data and update the necessary state variables
              setSelectedEstablishmentData(response.data);
                //console.log('Data:', await response.data);
            })
            .catch(error => {
              // Handle the error
              console.error(error.message);
            });
        }
    }, [selectedEstablishmentId]);

    //save the id in the selectedEstablishmentData const
    useEffect(() => {
        if (selectedEstablishmentData) {
            console.log(selectedEstablishmentData);
        }
    }, [selectedEstablishmentData]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR GOOGLE API KEY"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])
    

    return isLoaded ? (

        <div className='mainMapContainer'>
            <div className="secondMapCont">
                <div className='mapFormTitle'>Nuestras Ubicaciones</div>


                <div className="mapContainer">
                
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    >
                        {stabsAll.map((stabs) => (
                            <MarkerF position={{lat:stabs.latitude, lng:stabs.longitude}} onClick={() => handler(stabs.id)}/>
                        ))}
                   
                    </GoogleMap>
                </div>
                {selectedEstablishmentData && (
                    <Modal
                        closeButton
                        blur
                        aria-labelledby="modal-title"
                        open={visible}
                        width='700px'
                        onClose={closeHandler}   
                    >
                        <Modal.Header>
                            <h1 style={{fontSize:'20px'}}>{selectedEstablishmentData.name}</h1>
                            
                        </Modal.Header>

                        <Modal.Body>
                            <img src="/images/centro1.jpg"></img>
                            <br></br>
                            <h2 style={{textAlign:'center'}}>{selectedEstablishmentData.description}</h2>
                            <h3 style={{textAlign:'center'}}>Encargado: {selectedEstablishmentData.employee_id}</h3>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button auto flat color="error" onPress={closeHandler}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    )}
                

            </div>
            
        </div>
    ) : <></>

}

export default React.memo(MyComponent)