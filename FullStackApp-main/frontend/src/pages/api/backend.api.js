import axios from 'axios';
import { useState } from 'react';

const getAll = axios.create({
    baseURL:"http://127.0.0.1:8000/centros/api/v1/",
})

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
//Stablishments

export const getAllStabs = () => getAll.get('stablishments/');

//get stablishments by id (?)
export const getStabsById = (id) => getAll.get(`stablishments/${id}/`);

export const createstabs = (stabs) => getAll.post('stablishments/', stabs);

export const deleteStabs = (id) => getAll.delete(`stablishments/${id}/`);

export const updateStabs = (id, stabs) => getAll.put(`stablishments/${id}/`, stabs, {headers: {
  "Content-Type": "application/json",
}});


//Tutor

export const getAllTutors = () => getAll.get('tutor/');

export const getTutorsById = (id) => getAll.get(`tutor/${id}/`);


export const createTutor = (person) => getAll.post('tutor/', person,  {headers: {
    "Content-Type": "application/json",
  }});
export const deleteTutors = (id) => getAll.delete(`tutor/${id}/`);

export const updateTutors = (id, tutor) => getAll.put(`tutor/${id}/`, tutor, {headers: {
  "Content-Type": "application/json",
}});


//Employee

export const getAllEmployees = () => getAll.get('employee/');

export const getEmployeeById = (id) => getAll.get(`employee/${id}/`);


export const createEmployee = (person) => getAll.post('employee/', person,  {headers: {
    "Content-Type": "application/json",
  }});
export const deleteEmployees = (id) => getAll.delete(`employee/${id}/`);

export const updateEmployees = (id, employee) => getAll.put(`employee/${id}/`, employee, {headers: {
  "Content-Type": "application/json",
}});

//Get schedule

export const getAllScheds = () => getAll.get('schedule/');


//Complaints

export const getAllComplaints = () => getAll.get('complaint/');


//Announcements
export const getBackendAnnouncements = async () => {
    return axios.get('announcements/');
}



