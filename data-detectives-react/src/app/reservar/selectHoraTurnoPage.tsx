"use client";

import { Button, Form, ProgressBar, Spinner } from "react-bootstrap";
import CenteredDiv from "./centeredDiv";
import { useEffect, useState } from "react";
import { FourthPageProps, TurnoDisponible, TurnoDisponibleResponse } from "../types";
import Container from "../container-fondo";
import Card from '../card';
import MyModal from '../modalAlert';
import { useRouter } from "next/navigation";
import AppSpinner from "../app-spinner";


const FourthPage: React.FC<FourthPageProps> = ({ selectedProfessional, selectedFecha, onSelectedTurno, selectedTurno }) => {
    const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([]);
    const [selectedOption, setSelectedOption] = useState<TurnoDisponible>();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

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
              const id_especialidad = selectedProfessional.id_profesional_especialidad;
              const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/show_turno_fecha/${id_especialidad}/${selectedFecha}`); 
              const data: TurnoDisponibleResponse = await response.json();
      
              if (Array.isArray(data?.data)) {
                setTurnosDisponibles(data.data);
              } else {
                console.log("La respuesta de la API no contiene un array válido de turnos disponibles:", data);
              }
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchTurnosDisponibles();
    }, []);
    
    const handleSelectHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedHour = event.target.value;
        const option = turnosDisponibles.find((turno) => turno.hora === selectedHour);
        if (option)
          setSelectedOption(option);
    };

    const handleNextPage = () => {
        if (selectedOption) {
            onSelectedTurno(selectedOption);
        } else {
          console.log("Debe seleccionar un turno antes de continuar.");
        }
    };

    const handleBack = () => {
      router.back()
    };

    useEffect(() => {
      if (selectedTurno && !selectedOption) {
        setSelectedOption(selectedTurno);
      }
    }, [selectedTurno]);

    useEffect(() => {
      if (turnosDisponibles.length > 0 && !selectedOption) {
        setSelectedOption(turnosDisponibles[0]);
      }
    }, [turnosDisponibles]);

    return (
        <Container>
          <ProgressBar striped variant="info" animated now={80} />
          <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
            Back
          </Button>
          <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
          <CenteredDiv>
            <Card>
              <h3 className='text-white text-center mt-3'>Horarios disponibles</h3>
              {loading ? (
                <AppSpinner loading={loading}></AppSpinner>
              ) : (
              <Form.Select
                className="bg-dark text-white"
                value={selectedOption ? selectedOption.hora : ""}
                onChange={handleSelectHour}
                >
                {turnosDisponibles.map((turno) => (
                    <option key={turno.id} value={turno.hora}>
                    {turno.hora}
                    </option>
                ))}
            </Form.Select>)}
            { !loading && (<Button variant="dark" className="mt-2" onClick={handleNextPage}>
              Siguiente
            </Button>)}
            </Card>
          </CenteredDiv>
        </Container>
      );
};

export default FourthPage;