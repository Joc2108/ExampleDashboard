import React from 'react'
import { lusitana } from '../ui/fonts'
import RevenueChart from '../ui/dashboard/revenue-chart'
import LatestInvoices from '../ui/dashboard/latest-invoices'
import { Card } from '../ui/dashboard/cards'
import { fetchRevenue, fetchLatestInvoices } from '../lib/datosnew'

async function Dashboard() {
  const revenue = await fetchRevenue()
  const latestInvoices = await fetchLatestInvoices()
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {<Card title="Collected" value={1106.36} type="collected" /> }
        { <Card title="Pending" value={1339.11} type="pending" /> }
        { <Card title="Total Invoices" value={15} type="invoices" /> }
        { <Card
          title="Total Customers"
          value={8}
          type="customers"
        /> }
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        { <RevenueChart revenue={revenue}  /> }
        { <LatestInvoices latestInvoices={latestInvoices} /> }
      </div>
    </main>
  )
}

export default Dashboard