"use client";

import { TableUsers } from "@/modules/dashboard/users/table-users";

export default function UsersPage() {
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex-1 max-w-[calc(100vw-2rem)] border rounded-lg overflow-hidden">
        <TableUsers />
      </div>
    </div>
  );
}
