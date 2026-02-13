import { OrganizationAdminRoleEnum } from "./user-role";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	role: OrganizationAdminRoleEnum;
	requiresPasswordChange: boolean;
	isEmailVerified: boolean;
	branchId?: string;
	profileImage?: string;
	createdAt: string;
	updatedAt: string;
	lastSeenAt?: string;
}