import { OrderInvoice } from '../domain/order-invoice.entity';

export class OrderInvoiceMapper {
  static toDomain(raw: any) {
    return OrderInvoice.fromData({
      id: raw.id,
      invoiceNumber: raw.invoiceNumber,
      total: raw.total,
      date: raw.date,
      pdf: raw.pdf,
      orderId: raw.OrderId
    });
  }

  static toPersistence(domain: OrderInvoice) {
    return {
      id: domain.id,
      invoiceNumber: domain.invoiceNumber,
      total: domain.total,
      date: domain.date,
      pdf: domain.pdf,
      orderId: domain.orderId
    };
  }
}
