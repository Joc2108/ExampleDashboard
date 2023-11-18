import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Customer,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import Datos from "@/app/lib/placeholder-data"

export async function fetchRevenue() {
  try {
    const data: Array<Revenue> = await Datos.revenue;
    return data;
  } catch (error) {
    console.error('Error cargando datos', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    let data = Datos.invoices
    data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    data = data.slice(0, 5)

    var Datatemp: Array<LatestInvoiceRaw> = []
    await data.map((datos, index) => {
      let cliente: Customer | undefined

      cliente = Datos.customers.find(clienteTemp => clienteTemp.id === datos.customer_id);
      if (cliente != undefined) {
        Datatemp.push({
          "id": cliente.id,
          "name": cliente.name,
          "image_url": cliente.image_url,
          "email": cliente.email,
          "amount": datos.amount
        })
      }
    })



    Datatemp = Datatemp.slice(0, 5)

    const latestInvoices = Datatemp.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}