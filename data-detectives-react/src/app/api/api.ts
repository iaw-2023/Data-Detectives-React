"use client";

import { json } from "react-router-dom";
import TurnosAsignadosPage from "../turnosAsignados/page";

export async function getUserType(token: any){

    const responseUserType = await fetch(`https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/typeUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    
    return responseUserType.json();
      
}

export async function getTurnosAsignadosProfesional(token: any) {
    try {
        const responseTurnosProf = await fetch(`https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/turnos_asignados_profesional`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },      
          }     
        );
             
        return responseTurnosProf.json();
    } catch (error) {
      return { 
          message: "Error al obtener los turnos asignados del profesional: " + error,
          route: "/profesional"
      };    
    }; 
    
};

export async function getTurnosAsignadosPaciente(token: any) {

    try {
        const responseTurnos = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/turnos_asignados_paciente', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },      
          }     
        );
        return responseTurnos.json();
    } catch (error) {
      return { 
          message: "Error al obtener los turnos asignados del paciente: " + error,
          route: "/turnosAsignados"
      };    
    };     
}

export async function asignarTurno(tipo_usuario: string, token: any, turno_id: number, primer_consulta: boolean, idPago: number){

    if (tipo_usuario === 'paciente') {
        try {// Esta logueado y es paciente registrado en la BD
            const asignarTurnoResponse = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/asignar_turno', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                data: {
                  turno: {
                    id: turno_id,
                  },
                  primer_consulta: primer_consulta,
                  id_pago: idPago
                },
              }),
            });    
            return asignarTurnoResponse.json();
        } catch (error) {
            return { // Error al confirmar el turno (fetch)
                message: "Error al confirmar el turno: " + error,
                route: "/reservar"
            };    
          }; 
   } else {
        if (tipo_usuario === 'no registrado') {
            return { // Esta logueado y NO es paciente registrado en la BD
                message: "No es posible reservar el turno. El usuario logueado no está registrado como paciente.",
                route: "/register"
            };
        } else  return { // Esta logueado y es profesional registrado en la BD
            message: "No es posible reservar el turno. El usuario logueado está registrado como profesional.",
            route: "/profesional"
        };
    }
}

export async function cancelarTurno(token: any, turno_id: number, turno_asignado_id: number){
    try {
      const cancelarTurnoResponse = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/cancelar_turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: [{
            id: turno_asignado_id,
            turno: {
              id: turno_id,
            },
          }],
        }),
      });
      return cancelarTurnoResponse.json();
    } catch (error) {
      return { 
          message: "Error al cancelar el turno del paciente: " + error,
          route: "/turnosAsignados"
      };    
    }; 
  } 


export async function userRegister(token: any, requestBody: any){
    try {
        const responseRegister = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          })
        return responseRegister.json();
    
    } catch (error) {
        return { 
            message: "Error al registrar al paciente: " + error,
            route: "/register"
        };    
      };           
}

export async function getDatosPaciente(token: any) {

  try {
      const responseTurnos = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/pacientePorEmail', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },      
        }     
      );
      return responseTurnos;
  } catch (error) {
    return { 
        message: "Error al obtener los datos del paciente: " + error,
        route: "/paciente"
    };    
  };     
}

export async function getDatosProfesional(token: any) {

  try {
      const responseTurnos = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/profesionalPorEmail', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },      
        }     
      );
      return responseTurnos;
  } catch (error) {
    return { 
        message: "Error al obtener los datos del profesional: " + error,
        route: "/"
    };    
  };     
}

