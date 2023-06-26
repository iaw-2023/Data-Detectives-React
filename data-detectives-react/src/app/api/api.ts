"use client";

import { json } from "react-router-dom";

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

export async function asignarTurno(tipo_usuario: string, token: any, turno_id: number, primer_consulta: boolean){

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
                message: "No es posible reservar el turno. No estás registrado como paciente.",
                route: "/register"
            };
        } else  return { // Esta logueado y es profesional registrado en la BD
            message: "No es posible reservar el turno. Estás registrado como profesional.",
            route: "/profesional"
        };
    }
}

export async function userRegister(requestBody: any){

    try {
        const responseRegister = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
        console.log(responseRegister.json())
        return responseRegister.json();
    
    } catch (error) {
        return { 
            message: "Error al registrar al paciente: " + error,
            route: "/register"
        };    
      }; 
    
      
}

