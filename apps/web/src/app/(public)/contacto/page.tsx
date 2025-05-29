import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import { Label } from "@camaras/ui/src/components/label";
import { Textarea } from "@camaras/ui/src/components/textarea";

export default function ContactoPage() {
  return (
    <div className="flex flex-col items-center py-18 h-[100dvh] max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Contacto</h1>
      <p className="text-lg text-gray-500">
        Si tienes alguna pregunta o deseas más información, no dudes en
        contactarnos. Estamos aquí para ayudarte.
      </p>
      <form className="mt-8 w-full max-w-md">
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200"
          >
            Nombre
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200"
          >
            Correo electrónico
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="message"
            className="block text-sm font-medium text-gray-200"
          >
            Mensaje
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}
