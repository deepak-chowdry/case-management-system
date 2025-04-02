import CasesDashboard from '@/components/CasesDashboard'
import React from 'react'

const CasesPage = () => {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='w-11/12 h-screen py-8'>
        <CasesDashboard />
      </div>
    </div>
  )
}

export default CasesPage