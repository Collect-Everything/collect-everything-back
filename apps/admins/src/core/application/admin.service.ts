import { AdminRepository } from "./admin.repository";

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}
}
