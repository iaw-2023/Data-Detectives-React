"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import SearchInput from './inputDNI';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import CenteredDiv from '../reservar/centeredDiv';


interface Professional {
  id: number;
  DNI: number;
  nombre: string;
  apellido: string;
  email: string;
}

interface Speciality {
  especialidad: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  id_profesional_especialidad: number;
}

interface ApiResponse {
  data: Speciality[];
}

const MainComponent: React.FC = () => {
  var [searchProfessionalResult] = useState<Professional| null>(null);
  var [searchSpecialitiesResult] = useState<Speciality[]>([]);
  var [selectedSpecialty] = useState<Speciality | null>(null); 

  const handleSearch = async (value: string) => {
    try {
      const response_professional = await fetch(
        `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesionalPorDNI/${value}`
      );
      const data_professional = await response_professional.json();

      if (response_professional.ok) {
        searchProfessionalResult = data_professional.data;
        
        var id_profesional = searchProfessionalResult?.id;
        const response_specialities = await fetch(
          `https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`
        );
        const data_specialities = await response_specialities.json();
        const apiResponse: ApiResponse = data_specialities;
        const searchSpecialitiesResult: Speciality[] = apiResponse.data;
       
                
        console.log(searchProfessionalResult);
        console.log(searchSpecialitiesResult);
      } else {
        console.log("La respuesta de la API no contiene un array válido de profesional:", data_professional);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedSpecialty = searchSpecialitiesResult.find((specialty) => specialty.especialidad.nombre === selectedValue);
    if (selectedSpecialty) {
      onSelectSpecialty(selectedSpecialty);
    }
  };

  const handleDiary = () => {
    if (selectedSpecialty) {
      onSelectSpecialty(selectedSpecialty);
    }
  };
  
  function onSelectSpecialty(specialty: Speciality) {
    if (specialty) {
    }
  }

  return (
    <><div>
    <CenteredDiv> 
      <SearchInput onSearch={handleSearch} />
      {searchProfessionalResult && (
        <div>
          <p>ID: {searchProfessionalResult.id}</p>
          <p>DNI: {searchProfessionalResult.DNI}</p>
          <p>Nombre: {searchProfessionalResult.nombre}</p>
          <p>Apellido: {searchProfessionalResult.apellido}</p>
          <p>Email: {searchProfessionalResult.email}</p>
        </div>)}
      <div>
      <Form.Select value={selectedSpecialty ? selectedSpecialty.especialidad.nombre : ""}
          onChange={handleSelectSpecialty}>
          {searchSpecialitiesResult.map((specialty) => (          
            <option key={specialty.especialidad.id} value={specialty.especialidad.nombre}>
              {specialty.especialidad.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleDiary}>
          Ver agenda
        </Button>
        </div>
        </CenteredDiv>
      </div>
       </>
  );
}
export default MainComponent;
