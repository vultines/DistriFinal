import React from 'react';
import { Table } from 'antd';
import { useEffect, useState} from 'react';
import {getAllTutors, getAllScheds, updateTutors, getTutorsById, deleteTutors} from './api/backend.api'
import { get } from 'http';
import { set } from 'react-hook-form';
import { TableBody } from '@nextui-org/react/types/table/base';
import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import axios from 'axios';
import Link from 'next/link';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';

export default function dataTable() {

    
    const [schedsAll, setScheds] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllScheds();
            console.log(res);
            setScheds(res.data);
        }
        loadData();
    }, [])

    const [tutorsAll, setTutors] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllTutors();
            console.log(res);
            setTutors(res.data);
        }
        loadData();
    }, [])

    const [selectedTutorId, setSelectedTutorId] = useState(null);
    const [TutorData, setTutorData] = useState(null);
  
    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await getTutorsById(selectedTutorId);
            setTutorData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (selectedTutorId) {
          fetchEmployee();
        }
      }, [selectedTutorId]);
    
      const handleUpdateClick = (id) => {
        setSelectedTutorId(id);
        console.log(id);
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Extract form input values using FormData constructor
        const formData = new FormData(e.target);
        const updatedData = {
          role: 1,
          status: 1,
          name: formData.get('name'),
          secondName: formData.get('secondName'),
          lastName: formData.get('lastName'),
          secondLastName: formData.get('secondLastName'),
          email: formData.get('email'),
          password: formData.get('password'),
          phone: formData.get('phone'),
          ci: formData.get('ci'),
         
          schedule_id: formData.get('schedule_id'),
        };
      
        try {
          await updateTutors(selectedTutorId, updatedData);
          // Handle successful update
          console.log('Tutor data updated successfully');
        } catch (error) {
          // Handle error
          console.error('Failed to update tutor data:', error);
        }
      };
    const router = useRouter();


    return (
        <div>
            <div className='tableContainer'>

            <div className="circlesConatinerDT">
                <div className="big--circleDT">
                    <div className="big--circle-contentDT">
                    </div>
                    <div className="big--circle-contentDT bottom: auto; top: auto; left: -50px; right: 0">
                    </div>
                    <div className="big--circle-contentDT top: auto; bottom: auto; right: -50px">
                    </div>
                    <div className="big--circle-contentDT top: auto; bottom: -50px">
                    </div>
                    <div className="mid--circleDT">
                    <div className="mid--circle-contentDT">
                    </div>
                    <div className="mid--circle-contentDT bottom: auto; top: auto; left: -35px; right: 0">
                    </div>
                    <div className="mid--circle-contentDT top: auto; bottom: auto; right: -35px">
                    </div>
                    <div className="mid--circle-contentDT top: auto; bottom: -35px">
                    </div>
                    <div className="small--circleDT">
                    <div className="small--circle-contentDT">
                    </div>
                    <div className="small--circle-contentDT bottom: auto; top: auto; left: -25px; right: 0">
                    </div>
                    <div 
                        className="small--circle-contentDT top: auto; bottom: auto; right: -25px">
                    </div>
                    <div className="small--circle-contentDT top: auto; bottom: -25px">
                    </div>
                    </div>
                </div>
            </div>
       </div>

                <div className="secTableContainer">
                    <div className="dataTitle">
                        Todos Los Tutores.
                    </div>
                    <table className='dataTable'>
                        <thead className='theadCont'>
                            <tr>
                                <th>Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="tbodyCont">
                            {tutorsAll.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>{tutor.name}</td>
                                <td>{tutor.secondName}</td>
                                <td>{tutor.lastName}</td>
                                <td>{tutor.secondLastName}</td>
                                <td>{tutor.email}</td>
                                <td>{tutor.phone}</td>
                                <td> <FormOutlined className="site-form-item-icon actionIcon" onClick={() => handleUpdateClick(tutor.id)}/> </td>
                                <td> <DeleteFilled className="site-form-item-icon actionIcon" onClick={async () => {
                                    const accepted = window.confirm("Quiere eliminar este usuario?");
                                        if (accepted) {
                                        await deleteTutors(tutor.id);
                                        toast.success("Elimindado", {
                                        position: "bottom-right",
                                        style: {
                                            background: "#FE7C56",
                                            color: "#fff",
                                            fontFamily:'Century Gothic',
                                            borderRadius: "10px",
                                        },
                                        });
                                        router.reload();
                                    }
                                }}></DeleteFilled> </td>
                            </tr>
                            ))}
                        </tbody>
                    
                    </table>

                    <Link href={"/tutor"}>Volver</Link>

                    {TutorData && (
                        <form className="formMargins" style={{fontFamily:'Century Gothic',background:'none', width:'100%', padding:'20px'}} onSubmit={handleFormSubmit}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input defaultValue={TutorData.email} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input defaultValue={TutorData.password}  type="password" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.name} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.secondName} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Segundo Nombre</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.lastName} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido Paterno</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.secondLastName} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido Materno</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.phone} type="number" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de Teléfono</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={TutorData.ci} type="text" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">C.I.</label>
                    </div>
                   
                </div>
                        <button type="submit">Update</button>
                        </form>
                    )}
                </div>

                

            </div>
        </div>
    );
}




