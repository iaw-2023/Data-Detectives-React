"use client";
import { useEffect } from "react";
import { CardPayment } from '@mercadopago/sdk-react';
import ContainerPaciente from "../paciente/containerPaciente";

declare global {
  interface Window {
    MercadoPago: any;
    cardPaymentBrickController: any;
  }
}

const MercadoPagoPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initializeMercadoPago();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMercadoPago = () => {
    const mp = new window.MercadoPago('TEST-749a0c68-d11d-474a-a390-888b31a17b66', {
      locale: 'es'
    });
    const bricksBuilder = mp.bricks();
    renderCardPaymentBrick(bricksBuilder);
  };

  const renderCardPaymentBrick = async (bricksBuilder: any) => {
    const settings = {
      initialization: {
        amount: 100, // monto a ser pago
      },
      customization: {
        visual: {
          style: {
            theme: 'dark', // | 'dark' | 'bootstrap' | 'flat'
          }
        },
      },
      callbacks: {
        onReady: onReady,
        onSubmit: onSubmit,
        onError: onError,
      },
    };
    window.cardPaymentBrickController = await bricksBuilder.create(
      'cardPayment',
      'cardPaymentBrick_container',
      settings
    );
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
