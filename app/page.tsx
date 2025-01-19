'use client'

import { useState } from 'react'
import UserSetup from '../components/UserSetup'
import ExpenseSetup from '../components/ExpenseSetup'
import Simulation from '../components/Simulation'
import StatusView from '../components/StatusView'
import AIChatWindow from '../components/AIChatWindow'
import { UserProfile, Expenses, FinancialStatus } from '../types/types'

export default function FinancialLiteracyApp() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [expenses, setExpenses] = useState<Expenses | null>(null)
  const [financialStatus, setFinancialStatus] = useState<FinancialStatus | null>(null)
  const [currentStep, setCurrentStep] = useState<'userSetup' | 'expenseSetup' | 'simulation'>('userSetup')

  const handleUserSetup = (profile: UserProfile) => {
    setUserProfile(profile)
    setCurrentStep('expenseSetup')
  }

  const handleExpenseSetup = (expenses: Expenses) => {
    setExpenses(expenses)
    const initialStatus: FinancialStatus = {
      savings: 0,
      investments: 0,
      debt: 0,
      netWorth: 0,
    }
    setFinancialStatus(initialStatus)
    setCurrentStep('simulation')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">FinLife</h1>
        {currentStep === 'userSetup' && <UserSetup onSubmit={handleUserSetup} />}
        {currentStep === 'expenseSetup' && <ExpenseSetup onSubmit={handleExpenseSetup} />}
        {currentStep === 'simulation' && userProfile && expenses && financialStatus && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <Simulation
                userProfile={userProfile}
                expenses={expenses}
                financialStatus={financialStatus}
                setFinancialStatus={setFinancialStatus}
              />
            </div>
            <div className="w-full md:w-1/3">
              <StatusView financialStatus={financialStatus} />
            </div>
          </div>
        )}
      </div>
      {userProfile && expenses && financialStatus && (
        <AIChatWindow
          userProfile={userProfile}
          expenses={expenses}
          financialStatus={financialStatus}
        />
      )}
    </div>
  )
}

