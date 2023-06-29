"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDivReservar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Card from '../card';
import MyModal from '../modalAlert';
import AppSpinner from "../app-spinner";
import CenteredDivReservar from "./centeredDivReservar";

const FirstPage: React.FC<FirstPageProps> = ({ onSelectSpecialty }) => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [selectedOption, setSelectedOption] = useState<Especialidad | undefined>(especialidades[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const router = useRouter();
  
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = especialidades.find((specialty) => specialty.nombre === selectedValue);
    if (option) {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      onSelectSpecialty(selectedOption);
    } else {
      console.log("Debe seleccionar una especialidad antes de continuar.")
    }
  };

  const handleBack = () => {
    router.back()
  };
  
  useEffect(() => {
    if (selectedSpecialty && !selectedOption) {
      setSelectedOption(selectedSpecialty);
    }
  }, [selectedSpecialty]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://data-detectives-laravel.vercel.app/rest/especialidades");
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setEspecialidades(data.data);
          setSelectedSpecialty(data.data[0] || null);
        } else {
          console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchEspecialidades();
  }, []);

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={20} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
      <CenteredDivReservar>         
        <Card>
          <h3 className='text-white text-center mt-3'>Seleccione una especialidad</h3>
          {loading ? (
            <AppSpinner loading={loading}></AppSpinner>
          ) : (
          <Form.Select className="bg-dark text-white" value={selectedOption ? selectedOption.nombre : ""}
            onChange={handleSelectSpecialty}>
            {especialidades.map((specialty) => (
              <option key={specialty.id} value={specialty.nombre}>
                {specialty.nombre}
              </option>
            ))}
          </Form.Select>)}
          { !loading && 
            (<Button variant="dark" className="mt-2" onClick={handleNext}>
              Siguiente
            </Button>) }          
        </Card>
      </CenteredDivReservar>
    </Container>
  );
};


export default FirstPage;
