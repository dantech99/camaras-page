"use client";

import { useSaleStore } from "./store/sale.store";
import { Input } from "@camaras/ui/src/components/input";
import { Label } from "@camaras/ui/src/components/label";

export function UserData() {
  const {
    name,
    phoneNumber,
    character,
    email,
    isVerified,
    setName,
    setPhoneNumber,
    setCharacter,
    setEmail,
    setIsVerified,
  } = useSaleStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Label>Nombre:</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Telefono:</Label>
        <Input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Telefono"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Email:</Label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Personaje:</Label>
        <Input
          type="text"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder="Personaje"
        />
      </div>
    </div>
  );
}
