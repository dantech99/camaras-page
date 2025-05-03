export function getRolesConfig(role: "photographer" | "admin" | "user"): {
  color: string;
  label: string;
} {
  switch (role) {
    case "photographer":
      return { color: "bg-green-500 hover:bg-green-600", label: "Fotógrafo" };
    case "admin":
      return { color: "bg-blue-500 hover:bg-blue-600", label: "Administrador" };
    case "user":
      return { color: "bg-gray-500 hover:bg-gray-600", label: "Usuario" };
  }
}
