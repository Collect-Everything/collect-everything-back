import { PrismaClient } from '@ce/db';
import {
  OrderInvoiceFilters,
  OrderInvoiceRepository
} from '../ports/order-invoice.repository';
import { OrderInvoice } from '../domain/order-invoice.entity';
import { OrderInvoiceMapper } from '../mappers/order-invoice.mapper';
import { PaginatedParams, PaginatedResponse } from '@ce/shared-core';

export class PrismaOrderInvoiceRepository implements OrderInvoiceRepository {
  constructor(private prisma: PrismaClient) {}

  async save(orderInvoice: OrderInvoice): Promise<void> {
    const data = OrderInvoiceMapper.toPersistence(orderInvoice);
    await this.prisma.orderInvoice.upsert({
      where: { id: orderInvoice.id },
      create: {
        id: data.id,
        invoiceNumber: data.invoiceNumber,
        total: data.total,
        date: data.date,
        pdf: data.pdf,
        order: {
          connect: { id: data.orderId }
        }
      }
    });
  }

  async findById(id: string): Promise<OrderInvoice | null> {
    const raw = await this.prisma.orderInvoice.findUnique({
      where: { id }
    });
    return raw ? OrderInvoiceMapper.toDomain(raw) : null;
  }

  async findAll(filters?: OrderInvoiceFilters): Promise<OrderInvoice[]> {
    const orderInvoices = await this.prisma.orderInvoice.findMany({
      where: {
        date: filters?.date
      }
    });
    return orderInvoices.map((orderInvoice: OrderInvoice) =>
      OrderInvoice.fromData({
        id: orderInvoice.id,
        invoiceNumber: orderInvoice.invoiceNumber,
        total: orderInvoice.total,
        date: orderInvoice.date,
        pdf: orderInvoice.pdf,
        orderId: orderInvoice.orderId
      })
    );
  }

  async findAllPaginated(
    params: PaginatedParams & OrderInvoiceFilters
  ): Promise<PaginatedResponse<OrderInvoice>> {
    const rawOrderInvoices = await this.prisma.orderInvoice.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });

    const orderInvoices = rawOrderInvoices.map((raw) =>
      OrderInvoiceMapper.toDomain(raw)
    );
    return {
      data: orderInvoices,
      page: params.page,
      limit: params.limit,
      total: await this.prisma.orderInvoice.count()
    };
  }
}
