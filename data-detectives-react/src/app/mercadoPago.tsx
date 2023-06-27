"use client";
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import ContainerPaciente from "./paciente/containerPaciente";
import { useAuth0 } from '@auth0/auth0-react';

interface MercadoPagoPageProps {
  onPaymentComplete: (response: any) => void;
}

const MercadoPagoPage: React.FC<MercadoPagoPageProps> = ({ onPaymentComplete }) => {

  const { getAccessTokenSilently } = useAuth0();
 
  initMercadoPago("TEST-749a0c68-d11d-474a-a390-888b31a17b66");

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    const token = await getAccessTokenSilently();
    return new Promise<void>((resolve, reject) => {
      fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          onPaymentComplete(response);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };
  
  const onReady = async () => {
    
  };

  return (
    <ContainerPaciente>
      <CardPayment
        initialization={{ amount: 1000 }}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </ContainerPaciente>
    
  );
};

export default MercadoPagoPage;