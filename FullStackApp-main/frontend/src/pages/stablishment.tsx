import Image from 'next/image'
import React from 'react';
import { Inter } from 'next/font/google'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import { createstabs, getAllEmployees } from './api/backend.api' 

import { GoogleMap, Marker, MarkerF, useJsApiLoader } from '@react-google-maps/api';

import { useEffect, useState} from 'react';

const inter = Inter({ subsets: ['latin'] })

const containerStyle = {
    width: '100%' ,
    height: '240px',
};

const center = {
    lat: -17.375646108432843, 
    lng: -66.16875813592937
};

export default function Stablishment() {

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit(async data => {
        const res = await createstabs(data)
        //console.log(res);

        if(res.status === 400){
            alert("Ha ocurrido un error al registrar el establecimiento")
        }
            
    })

    const [employeeAll, setEmployee] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllEmployees();
            console.log(res);
            setEmployee(res.data);
        }
        loadData();
    }, [])

    const handleUpdateClick = (id: number) => {
        
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOURE GOOGLE API KEY"
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
    
    const [position, setPosition] = useState({ lat: -17.375646108432843, lng: -66.16875813592937 });

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        const { latLng } = event;
        const newLat = latLng.lat();
        const newLng = latLng.lng();
        setPosition({ lat: newLat, lng: newLng });
    };

    const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLat = parseFloat(e.target.value);
    setPosition((prevPosition) => ({ ...prevPosition, lat: newLat }));
    };

    const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLng = parseFloat(e.target.value);
    setPosition((prevPosition) => ({ ...prevPosition, lng: newLng }));
    };

    return isLoaded?(
    
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
       

        <div className="formSubContainer">
            <div className="formTitleC">
                <div className="picContainer">
                    <div className="formssubTitle">
                        <h1>Registro de Centros.</h1>
                    </div>
                </div>
                
            </div>
            <form className="formMargins" onSubmit={onSubmit}>
                
            <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("name", {required:true})} />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("district", {required:true})} />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Distrito</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("description", {required:true})} />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripcion</label>
                </div>
                <input readOnly={true} value={position.lat} onChange={handleLatitudeChange} type="hidden" step='any' id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("latitude", {required:true})} />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitud</label>
                    
                <input readOnly={true}  value={position.lng} onChange={handleLongitudeChange} type="hidden" step='any' id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("longitude" , {required:true})} />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitud</label>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <select id="cars" {...register("employee_id" , {required:true})} >
                            {employeeAll.map((employee) => (
                                <option value={employee.id}>{employee.name} {employee.lastName}</option>
                            ))}
                        </select>
                     </div>
                </div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={(e) => {
                        console.log("latitude = ", e.latLng?.lat())
                        console.log("longtitude = ", e.latLng?.lng());
                    }}
                    >
                        //place marker and add latitude and longitude to position
                        <MarkerF
                            position={position}
                            draggable={true}
                            onDragEnd={handleMarkerDragEnd}  
                        
                        />
                        
                    </GoogleMap>

                <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Registrar</button>
                <Link href={"/datatable"}>Ver Todos</Link>
            </form>
           
        </div>
    </div>
  ): <></>
}
