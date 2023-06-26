"use client";
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import ContainerPaciente from "../paciente/containerPaciente";
import { useRouter } from "next/navigation";


const MercadoPagoPage : React.FC = () => {

  const initialization = {
    amount: 100,
  };
 
  initMercadoPago("TEST-749a0c68-d11d-474a-a390-888b31a17b66");

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch('/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
  };
  
  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  
  const onReady = async () => {
    
  };

  return (
    <ContainerPaciente>
      <CardPayment
        initialization={{ amount: 100 }}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </ContainerPaciente>
    
  );
};

export default MercadoPagoPage;