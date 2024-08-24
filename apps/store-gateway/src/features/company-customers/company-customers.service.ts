import { EventsService, ServerEvent } from '@ce/events';
import { BaseResponse, GatewayService } from '@ce/server-core';
import { CreateCompanyCustomerDto } from '@ce/shared-core';
import { COMPANY_CUSTOMER_CREATED } from '../../events/handlers/company-customers.events-handler';
import { UpdateCompanyCustomerDTO } from './dtos/update-company-customer.dto';

export class CompanyCustomersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super('companyCustomers', {
      gatewayName: 'STORE_GATEWAY',
      serviceName: 'COMPANY_CUSTOMERS'
    });
  }

  async register(data: CreateCompanyCustomerDto) {
    const res = await this.executeRequest(this.fetcher.post('/register', data));

    if (res.isOk()) {
      this.eventsService.send(
        ServerEvent.create({
          type: COMPANY_CUSTOMER_CREATED,
          payload: { email: data.email }
        })
      );
    }

    return res;
  }

  async validateEmail(email: string) {
    const handler = this.fetcher.post('/validate-email', { email });
    return this.executeRequest(handler);
  }

  async validateCredentials(email: string, password: string) {
    const handler = this.fetcher.post<
      BaseResponse<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        companyId: string;
      }>
    >('/validate-credentials', {
      email,
      password
    });
    return this.executeRequest(handler);
  }

  async updateCompanyCustomer(
    companyCustomerId: string,
    data: UpdateCompanyCustomerDTO
  ) {
    const handler = this.fetcher.patch<BaseResponse>(
      `/company-customers/${companyCustomerId}`,
      data
    );
    return this.executeRequest(handler);
  }

  async deleteCompanyCustomer(companyCustomerId: string) {
    const handler = this.fetcher.delete<BaseResponse>(
      `/company-customers/${companyCustomerId}`
    );
    return this.executeRequest(handler);
  }
}
