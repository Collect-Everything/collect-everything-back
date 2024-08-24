import { AdminRepository } from './../ports/admin.repository';
import { Admin } from "../domain/admin.entity";
import { PaginatedParams, PaginatedResponse } from '@ce/shared-core';

export class InMemoryAdminRepository implements AdminRepository {
  admins: Admin[] = [];

  async save(admin: Admin): Promise<void> {
    const exists = await this.findById(admin.id);
    if (exists) {
      this.admins = this.admins.map((c) =>
        c.id === admin.id ? admin : c,
      );
    } else {
      this.admins.push(admin);
    }
  }

  async findById(id: string): Promise<Admin | null> {
    return this.admins.find((c) => c.id === id) || null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.admins.find((c) => c.email === email) || null;
  }

  async delete(id: string): Promise<void> {
    this.admins = this.admins.filter((c) => c.id !== id);
  }

  findAllPaginated(params: PaginatedParams): Promise<PaginatedResponse<Admin>> {
    throw new Error('Method not implemented.');
  }
}
