import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statment = {
  ...defaultStatements,
  project: ["create", "read", "update", "delete", "share", "patch", "realm"],
} as const;

export const ac = createAccessControl(statment);

export const user = ac.newRole({
  project: ["create", "read", "update", "share"],
});

export const photographer = ac.newRole({
  project: ["create", "read", "update", "delete", "share"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update", "delete", "share", "patch", "realm"],
});
