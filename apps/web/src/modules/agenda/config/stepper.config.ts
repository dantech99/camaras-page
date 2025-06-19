import { defineStepper } from "@stepperize/react";

export const GlobalStepper = defineStepper(
  {
    id: "first",
    title: "Seleccionar Fotógrafo",
    description: "Selecciona el fotógrafo que deseas contratar para tu evento",
    percentage: 0,
  },
  {
    id: "second",
    title: "Seleccionar Paquete",
    description: "Selecciona el paquete que deseas contratar para tu evento",
    percentage: 20,
  },
  {
    id: "third",
    title: "Seleccionar Fecha",
    description: "Selecciona la fecha que deseas contratar para tu evento",
    percentage: 40,
  },
  {
    id: "fourth",
    title: "Seleccionar metodo de pago",
    description: "Selecciona el metodo de pago que deseas contratar para tu evento",
    percentage: 60,
  },
  {
    id: "fifth",
    title: "Datos del Comprador",
    description: "Ingresa tus datos para completar la compra",
    percentage: 80,
  },
  {
    id: "sixth",
    title: "Confirmar",
    description: "Confirma tu compra",
    percentage: 100,
  }
);