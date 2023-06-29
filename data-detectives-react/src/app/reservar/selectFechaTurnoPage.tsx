"use client";
import React, { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { ThirdPageProps, TurnoDisponibleResponse } from '../types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from "../container-fondo";
import Card from '../card';
import { useRouter } from "next/navigation";
import MyModal from '../modalAlert';
import AppSpinner from "../app-spinner";
import AlertWarning from "../alert-warning";
import CenteredDivReservar from "./centeredDivReservar";

const ThirdPage: React.FC<ThirdPageProps> = ({ selectedProfessional, onSelectedFecha }) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [fetchRealizado, setFetch] = useState<boolean>(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      try {
        setLoading(true);
        setTieneTurnos(true);
        const id_especialidad = selectedProfessional.id_profesional_especialidad;
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/turnos_disponibles_profesional/${id_especialidad}`); 
        setFetch(true);
        const data: TurnoDisponibleResponse = await response.json();

        if (Array.isArray(data?.data)) {
          const dates = data.data.map((turno) => {
            const [year, month, day] = turno.fecha.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
          });
          
          setAvailableDates(dates);
          setLoading(false);

        } else {
          console.log("La respuesta de la API no contiene un array válido de turnos disponibles:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTurnosDisponibles();
  }, []);

  useEffect(() => {
    if (fetchRealizado && availableDates.length === 0){
      setTieneTurnos(false);
    }
  }, [availableDates])


  const handleSelectTurno = (date: Date) => {
    const dateFormat = formatDate(date); 
    setSelectedOption(dateFormat);
  };
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const getSelectedDate = () => {
    if (selectedOption) {
      const [year, month, day] = selectedOption.split("-");
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return null;
  };

  const handleNextPage = () => {
    if (selectedOption) {
      onSelectedFecha(selectedOption);
    } else {
      console.log("Debe seleccionar un turno antes de continuar.");
    }
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "year" || view === "decade" || view === "century") {
      return false;
    }

    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return !availableDates.some((availableDate) => {
      const availableDateCopy = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
      return currentDate.getTime() === availableDateCopy.getTime();
    });
  };

  const handleBack = () => {
    router.back()
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={60} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
      <CenteredDivReservar>
      {!tieneTurnos && ( <AlertWarning mensaje={"No hay turnos asignados."}></AlertWarning> )}
        <Card>
          <h3 className='text-white text-center mt-3'>Seleccione un turno para {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</h3>
            <Calendar
            className="text-dark"
            tileDisabled={tileDisabled}
            onChange={handleSelectTurno as any}
            value={getSelectedDate()}
            />
            { loading ? 
                ( <AppSpinner loading={loading}></AppSpinner> ) :           
                (selectedOption && (
                  <Button variant="dark" className="mt-2" onClick={handleNextPage}>
                    Siguiente
                  </Button>)
                )
          }                
        </Card>
      </CenteredDivReservar>
    </Container>
  );
};

export default ThirdPage;
