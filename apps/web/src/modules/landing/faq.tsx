"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@camaras/ui/src/components/accordion";
import { Button } from "@camaras/ui/src/components/button";
import Link from "next/link";

export function FAQSection() {
  const faqItems = [
    {
      question: "¿Qué servicios ofrecen?",
      answer:
        "En Las Cámaras del Dragón ofrecemos una gama de servicios fotográficos diseñados para capturar la esencia de cada historia. Realizamos retratos artísticos y editoriales, cobertura de eventos culturales y personales, sesiones conceptuales y temáticas, así como producción fotográfica para marcas, artistas y emprendimientos. También brindamos servicios de edición y retoque profesional, y ofrecemos la opción de entregar álbumes digitales o físicos personalizados. Todos nuestros paquetes son adaptables a las necesidades y presupuesto del cliente.",
    },
    {
      question: "¿Cuánto tiempo tarda la entrega del material?",
      answer:
        "Todo el material fotográfico, sin importar el tipo de servicio contratado, se entrega dentro de un plazo de 60 a 90 días calendario, sin excepción. Este tiempo garantiza que podamos realizar una curaduría adecuada, una edición detallada y un trabajo artístico de alta calidad. No ofrecemos entregas anticipadas ni urgencias fuera de este marco de tiempo. Recomendamos tenerlo en cuenta especialmente para eventos con fechas importantes o campañas con cronogramas definidos.",
    },
    {
      question: "¿Cuáles son sus métodos de pago?",
      answer:
        "Contamos con varias opciones para facilitar el pago de nuestros servicios. Aceptamos transferencias bancarias a cuentas en Bancolombia, Nequi o Daviplata, así como pagos con tarjetas de crédito y débito a través de plataformas como MercadoPago y Wompi. Durante eventos o sesiones presenciales, también disponemos de datáfono, lo que permite hacer pagos con tarjeta en el momento. El pago se divide en dos partes: se puede abonar el 50% para reservar la fecha, y el 50% restante debe ser cancelado el mismo día de la sesión, sin excepción. No se considera reservada una fecha hasta que no se haya recibido el abono inicial.",
    },
    {
      question: "¿Qué uso se puede dar a las fotos?",
      answer:
        "Todas las fotografías realizadas por Las Cámaras del Dragón son obras protegidas por derechos de autor, los cuales pertenecen exclusivamente al fotógrafo como creador, en conformidad con la Ley 23 de 1982 y la Decisión Andina 351 de 1993. Esto incluye tanto los derechos morales como los patrimoniales. En ningún caso el cliente adquiere la titularidad de los derechos de autor, ni de forma total ni parcial. Este principio es inmodificable salvo mediante contrato formal de cesión de derechos, el cual no hace parte de nuestros servicios habituales. El cliente obtiene únicamente una licencia de uso limitada, no exclusiva, intransferible y revocable, válida exclusivamente para los fines acordados por escrito antes de la entrega del material. Por ejemplo, un cliente particular podrá compartir las imágenes en sus redes sociales o imprimirlas para uso personal, pero no podrá comercializarlas, cederlas a terceros, publicarlas en medios masivos o modificarlas sin autorización expresa del fotógrafo. En el caso de clientes comerciales o marcas, el uso debe ser previamente definido con precisión, incluyendo alcance, duración y canales de difusión. Si el cliente desea emplear el material para otros fines diferentes a los pactados inicialmente, deberá solicitar una nueva licencia, lo cual generará un costo adicional que se acordará directamente con el fotógrafo. Reiteramos que todos los derechos de autor pertenecen exclusivamente al fotógrafo, y cualquier uso no autorizado será considerado una infracción legal, susceptible de acciones civiles o penales conforme a la legislación colombiana vigente. Contratar nuestros servicios implica la aceptación expresa de estas condiciones.",
    },
    {
      question: "¿Cuál es su política de cancelación? ",
      answer:
        "Si el cliente cancela con más de cinco días de anticipación a la fecha agendada, se reembolsa el 100% del anticipo. Si la cancelación se realiza entre dos y cinco días antes, se devuelve únicamente el 50%. En caso de cancelación con menos de 48 horas de antelación, el anticipo no es reembolsable. Sin embargo, si la cancelación se da por razones de fuerza mayor debidamente justificadas, se puede reagendar la sesión sin costo adicional una única vez. En caso de que el fotógrafo deba cancelar la sesión por razones de fuerza mayor, se reembolsará el 100% del anticipo y se ofrecerá una nueva fecha sin costo adicional. Las Cámaras del Dragón no se hace responsable por cambios climáticos o situaciones ajenas a su control que puedan afectar la realización de la sesión, pero siempre se buscará una solución adecuada para ambas partes.",
    },
    {
      question: "¿Qué pasa si el cliente no asiste a la hora pactada para la sesión?",
      answer:
        "En caso de que el cliente no llegue a la hora establecida, se otorga un margen de espera máximo de 20 minutos. Si transcurrido ese tiempo el cliente no se presenta, la sesión se considera cancelada sin derecho a devolución del anticipo. Si el cliente llega tarde pero aún dentro del límite de espera, la sesión se realizará con el tiempo disponible restante. Para reprogramar una sesión perdida por inasistencia, será necesario pagar un nuevo anticipo o una tarifa de reprogramación, dependiendo de las condiciones del caso. En caso de que el fotógrafo llegue tarde, se extenderá el tiempo de la sesión hasta completar el tiempo pactado inicialmente, o se reprogramará sin costo adicional. Las Cámaras del Dragón no se hace responsable por cambios climáticos o situaciones ajenas a su control que puedan afectar la realización de la sesión, pero siempre se buscará una solución adecuada para ambas partes.",
    },
  ];

  return (
    <div className="bg-black w-full">
      <section className="w-full max-w-4xl mx-auto py-4 px-4 md:px-6 text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Encuentre respuestas a las preguntas más comunes sobre nuestros
            servicios y proceso de trabajo.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-md p-2 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-zinc-800 last:border-b-0"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-gray-300 transition-colors cursor-pointer">
                  <span className="font-medium text-base md:text-lg text-gray-200">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 py-4 px-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">
            ¿No encuentra la respuesta que busca?
          </p>
          <Link href="/contacto" className="inline-flex items-center gap-2">
            <Button
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-800 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600"
            >
              Contáctenos
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
