import React from 'react';
import { Table } from 'antd';
import { useEffect, useState} from 'react';
import {getAllEmployees, getAllScheds, updateEmployees, getEmployeeById, deleteEmployees} from './api/backend.api'
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

    const [employeeAll, setEmployee] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllEmployees();
            console.log(res);
            setEmployee(res.data);
        }
        loadData();
    }, [])

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [employeeData, setEmployeeData] = useState([]);
  
    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await getEmployeeById(selectedEmployeeId);
            setEmployeeData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (selectedEmployeeId) {
          fetchEmployee();
        }
      }, [selectedEmployeeId]);
    
      const handleUpdateClick = (id) => {
        setSelectedEmployeeId(id);
        console.log(id);
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Extract form input values using FormData constructor
        const formData = new FormData(e.target);
        const updatedData = {
          role: formData.get('role'),
          status: formData.get('status'),
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
          await updateEmployees(selectedEmployeeId, updatedData);
          // Handle successful update
          console.log('Employee data updated successfully');
        } catch (error) {
          // Handle error
          console.error('Failed to update employee data:', error);
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
                        Todos Los Funcionarios.
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
                            {employeeAll.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.secondName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.secondLastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td> <FormOutlined className="site-form-item-icon actionIcon" onClick={() => handleUpdateClick(employee.id)}/> </td>
                                <td> <DeleteFilled className="site-form-item-icon actionIcon" onClick={async () => {
                                    const accepted = window.confirm("Quiere eliminar este usuario?");
                                        if (accepted) {
                                        await deleteEmployees(employee.id);
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

                    <Link href={"/employee"}>Volver</Link>

                    {employeeData && (
                        <form className="formMargins" style={{fontFamily:'Century Gothic',background:'none', width:'100%', padding:'20px'}} onSubmit={handleFormSubmit}>
                         <input defaultValue={employeeData.role}  type="hidden" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <input defaultValue={employeeData.status} type="hidden" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
               
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input defaultValue={employeeData.email} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input defaultValue={employeeData.password}  type="password" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.name} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.secondName} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Segundo Nombre</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.lastName} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido Paterno</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.secondLastName} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido Materno</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.phone} type="number" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de Teléfono</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input defaultValue={employeeData.ci} type="text" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">C.I.</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <select  id="cars" defaultValue={employeeData.schedule_id}>
                            {schedsAll.map((scheds) => (
                                <option value={scheds.id}>{scheds.name}</option>
                            ))}
                        </select>
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




