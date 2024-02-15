import { GatewayCrudController, ctrlWrapper } from "@ce/server-core";
import { RequestHandler } from "express";

class CustomersCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "COMPANY_USERS",
      },
      "company_users",
    );
  }
}

export const customersCtrl = new CustomersCtrl();
