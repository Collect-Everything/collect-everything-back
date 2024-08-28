import { PaginatedParams, PaginatedResponse } from '@ce/shared-core';
import { OrderInvoice } from '../domain/order-invoice.entity';

export interface OrderInvoiceFilters {
  date?: Date;
}

export interface OrderInvoiceRepository {
  save(orderInvoice: OrderInvoice): Promise<void>;
  findById(id: string): Promise<OrderInvoice | null>;
  findAll(filters?: OrderInvoiceFilters): Promise<OrderInvoice[]>;
  findAllPaginated(
    params: PaginatedParams & OrderInvoiceFilters
  ): Promise<PaginatedResponse<OrderInvoice>>;
}
