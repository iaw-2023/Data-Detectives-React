"use client";
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import ContainerPaciente from "../paciente/containerPaciente";

interface MercadoPagoPageProps {
  onPaymentComplete: (response: any) => void;
}

const MercadoPagoPage: React.FC<MercadoPagoPageProps> = ({ onPaymentComplete }) => {
 
  initMercadoPago("TEST-749a0c68-d11d-474a-a390-888b31a17b66");

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          onPaymentComplete(response);
          resolve();
        })
        .catch(() => {
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