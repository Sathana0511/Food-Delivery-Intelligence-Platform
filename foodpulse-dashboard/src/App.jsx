import React, { useState } from 'react'
import data from './data/foodpulseData.json'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import OverviewTab from './components/OverviewTab'
import TrendsTab from './components/TrendsTab'
import RestaurantsTab from './components/RestaurantsTab'
import CustomersTab from './components/CustomersTab'
import OperationsTab from './components/OperationsTab'
import SqlExplorerTab from './components/SqlExplorerTab'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const handleRefresh = () => {
    // Simulated live refresh
    alert('Refreshed data directly from fooddeliverydb schema (5,000 orders).')
  }

  return (
    <div className="flex min-h-screen bg-[#090D16] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onRefresh={handleRefresh}
        />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab data={data} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'trends' && (
            <TrendsTab data={data} />
          )}

          {activeTab === 'restaurants' && (
            <RestaurantsTab
              data={data}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersTab data={data} />
          )}

          {activeTab === 'operations' && (
            <OperationsTab data={data} />
          )}

          {activeTab === 'sql' && (
            <SqlExplorerTab />
          )}
        </main>
      </div>
    </div>
  )
}
