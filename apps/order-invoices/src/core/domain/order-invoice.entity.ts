import { Entity, EntityValidationError } from '@ce/shared-core';
import { z } from 'zod';

export const OrderInvoicePropsSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  total: z.number().min(0),
  pdf: z.string(),
  orderId: z.string(),
  date: z.date()
});

interface OrderInvoiceData {
  id: string;
  invoiceNumber: string;
  total: number;
  pdf: string;
  orderId: string;
  date: Date;
}

export type OrderInvoiceProps = z.infer<typeof OrderInvoicePropsSchema>;

export class OrderInvoice extends Entity<OrderInvoiceProps, string> {
  constructor(props: OrderInvoiceProps) {
    super(props);

    this.validate();
  }

  get orderId() {
    return this._props.orderId;
  }

  get total() {
    return this._props.total;
  }

  get pdf() {
    return this._props.pdf;
  }

  get invoiceNumber() {
    return this._props.invoiceNumber;
  }

  get date() {
    return this._props.date;
  }

  static fromData(data: OrderInvoiceData): OrderInvoice {
    return new OrderInvoice({
      id: data.id,
      invoiceNumber: data.invoiceNumber,
      total: data.total,
      pdf: data.pdf,
      orderId: data.orderId,
      date: data.date
    });
  }

  validate() {
    const result = OrderInvoicePropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
