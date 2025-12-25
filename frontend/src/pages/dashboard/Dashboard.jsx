import React from 'react'
import Layout from '../../components/layout/Layout'

function Dashboard() {
  return (
    <Layout>
      <h2>Financial Overview</h2>

      <div className="cards">
        <div className="card">
          <p>Total Balance</p>
          <h2>$24,562.00</h2>
        </div>

        <div className="card">
          <p>Total Income</p>
          <h2>$8,250.50</h2>
        </div>

        <div className="card">
          <p>Total Expenses</p>
          <h2>$3,890.00</h2>
        </div>

        <div className="card dark">
          <p>Savings Target</p>
          <h2>$6,500 / $10,000</h2>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard