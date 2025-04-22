import { createAccessControl } from "better-auth/plugins/access";

const statment = {
    project: ["create", "read", "update", "delete", "share", "patch"],
} as const;

export const ac = createAccessControl(statment)

export const userRole = ac.newRole({
    project: ["create", "read", "update", "share"],
})

export const photogrepherRole = ac.newRole({
    project: ["create", "read", "update", "delete"],
})

export const adminRole = ac.newRole({
    project: ["create", "read", "update", "delete", "share", "patch"],
})