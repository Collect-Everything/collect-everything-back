import { Entity } from "@ce/shared-core";
import z from "zod";

export const AdminPropsSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type AdminProps = z.infer<typeof AdminPropsSchema>;

export interface AdminData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class Admin extends Entity<AdminProps, string> {
  constructor(props: AdminProps) {
    super(props);
  }

  get data(): AdminData {
    return {
      id: this._props.id,
      firstname: this._props.firstname,
      lastname: this._props.lastname,
      email: this._props.email,
      password: this._props.password,
    };
  }

  static fromData(data: AdminData): Admin {
    return new Admin({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
  }
}
