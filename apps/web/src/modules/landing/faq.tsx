"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@camaras/ui/src/components/accordion"

export function FAQSection() {
  const faqItems = [
    {
      question: "¿Qué servicios ofrecen?",
      answer:
        "Ofrecemos una amplia gama de servicios incluyendo desarrollo web, diseño UX/UI, consultoría tecnológica y soluciones de comercio electrónico personalizadas para empresas de todos los tamaños.",
    },
    {
      question: "¿Cuánto tiempo toma completar un proyecto?",
      answer:
        "El tiempo de entrega varía según la complejidad del proyecto. Proyectos pequeños pueden completarse en 2-4 semanas, mientras que proyectos más grandes pueden tomar 2-6 meses. Proporcionamos un cronograma detallado durante la fase de planificación.",
    },
    {
      question: "¿Cuáles son sus métodos de pago?",
      answer:
        "Aceptamos transferencias bancarias, tarjetas de crédito/débito y PayPal. Generalmente solicitamos un 50% de anticipo al inicio del proyecto y el saldo restante se divide en pagos según los hitos acordados.",
    },
    {
      question: "¿Ofrecen soporte después de finalizar el proyecto?",
      answer:
        "Sí, ofrecemos planes de mantenimiento y soporte post-lanzamiento. Nuestros paquetes de soporte incluyen actualizaciones de seguridad, corrección de errores, y asistencia técnica para garantizar que su solución siga funcionando sin problemas.",
    },
    {
      question: "¿Trabajan con clientes internacionales?",
      answer:
        "Absolutamente. Tenemos experiencia trabajando con clientes de todo el mundo. Utilizamos herramientas de colaboración en línea para mantener una comunicación efectiva independientemente de las zonas horarias.",
    },
    {
      question: "¿Cómo inició el proceso de trabajo con ustedes?",
      answer:
        "El proceso comienza con una consulta inicial donde discutimos sus necesidades y objetivos. Luego, preparamos una propuesta detallada que incluye alcance, cronograma y presupuesto. Una vez aprobada, comenzamos con la fase de diseño y desarrollo.",
    },
  ]

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">Preguntas Frecuentes</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Encuentre respuestas a las preguntas más comunes sobre nuestros servicios y proceso de trabajo.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-md p-2 md:p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800 last:border-b-0">
              <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-gray-300 transition-colors cursor-pointer">
                <span className="font-medium text-base md:text-lg text-gray-200">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 py-4 px-1">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400 mb-4">¿No encuentra la respuesta que busca?</p>
        <a
          href="#contact"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-800 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600"
        >
          Contáctenos
        </a>
      </div>
    </section>
  )
}
