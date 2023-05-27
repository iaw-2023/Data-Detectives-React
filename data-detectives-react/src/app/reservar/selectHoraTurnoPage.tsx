"use client";

import { Button, Form, ProgressBar } from "react-bootstrap";
import CenteredDiv from "./centeredDiv";
import { useEffect, useState } from "react";
import { FourthPageProps, TurnoDisponible, TurnoDisponibleResponse } from "../types";

const FourthPage: React.FC<FourthPageProps> = ({ selectedProfessional, selectedFecha, onSelectedTurno, selectedTurno }) => {
    const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([]);
    const [selectedOption, setSelectedOption] = useState<TurnoDisponible>();
    
    useEffect(() => {
        const fetchTurnosDisponibles = async () => {
            try {
              const id_especialidad = selectedProfessional.id_profesional_especialidad;
              const response = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/show_turno_fecha/${id_especialidad}/${selectedFecha}`); 
              const data: TurnoDisponibleResponse = await response.json();
      
              if (Array.isArray(data?.data)) {
                setTurnosDisponibles(data.data);
              } else {
                console.log("La respuesta de la API no contiene un array válido de turnos disponibles:", data);
              }
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchTurnosDisponibles();
    }, []);
    
    const handleSelectHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedHour = event.target.value;
        const selectedTurno = turnosDisponibles.find((turno) => turno.hora === selectedHour);
        setSelectedOption(selectedTurno);
    };

    const handleNextPage = () => {
        if (selectedOption) {
            onSelectedTurno(selectedOption);
        } else {
          console.log("Debe seleccionar un turno antes de continuar.");
        }
        console.log(selectedOption);
    };

    useEffect(() => {
      if (selectedTurno && !selectedOption) {
        setSelectedOption(selectedTurno);
      }
    }, [selectedTurno]);

    return (
        <div>
          <CenteredDiv>
            <ProgressBar animated now={90} />
            <h2>Horarios disponibles</h2>
            <Form.Select
                value={selectedOption ? selectedOption.hora : ""}
                onChange={handleSelectHour}
                >
                {turnosDisponibles.map((turno) => (
                    <option key={turno.id} value={turno.hora}>
                    {turno.hora}
                    </option>
                ))}
            </Form.Select>
            <Button variant="primary" className="mt-2" onClick={handleNextPage}>
              Siguiente
            </Button>
          </CenteredDiv>
        </div>
      );
};

export default FourthPage;