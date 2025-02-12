import { PrismaClient } from "@camaras/database/index";
import { auth } from "@camaras/auth";

const prisma = new PrismaClient();

export class PermissionService {

    async createOrganization( data: { name: string, role: string }, request: Request ) {
        return auth.api.createOrganization( { request, body: { name: data.name, slug: data.role } } );
    }

    async addMember( data: { organizationId: string, userId: string }, request: Request ) {
        return auth.api.addMember( { request, body: {  role: 'member', userId: data.userId, organizationId: data.organizationId } } );
    }

    async changeRole( data: { organizationId: string, userId: string, role: "admin" | "member"  }, request: Request ) {
        return auth.api.updateMemberRole( { request, body: { role: data.role, memberId: data.userId, organizationId: data.organizationId } } );
    }

    async removeMember( data: { organizationId: string, userId: string }, request: Request ) {
        return auth.api.removeMember( { request, body: { organizationId: data.organizationId, memberIdOrEmail: data.userId } } );
    }

    async getOrganizationMembers( organizationId: string, headers: Headers ) {
        return auth.api.getFullOrganization({ headers, query: { organizationId: organizationId } });
    }

}