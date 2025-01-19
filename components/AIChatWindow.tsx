'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { UserProfile, Expenses, FinancialStatus } from '../types/types'

interface AIChatWindowProps {
  userProfile: UserProfile
  expenses: Expenses
  financialStatus: FinancialStatus
}

export default function AIChatWindow({ userProfile, expenses, financialStatus }: AIChatWindowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'context',
        role: 'system',
        content: `Make your responess less than 10 words, here is context, User Profile: Name: ${userProfile.name}, Age: ${userProfile.age}, Job: ${userProfile.jobTitle}, Salary: $${userProfile.salary}. 
                  Monthly Expenses: Rent: $${expenses.rent}, Utilities: $${expenses.utilities}, Food: $${expenses.food}, Transportation: $${expenses.transportation}, Entertainment: $${expenses.entertainment}. 
                  Current Financial Status: Savings: $${financialStatus.savings.toFixed(2)}, Investments: $${financialStatus.investments.toFixed(2)}, Debt: $${financialStatus.debt.toFixed(2)}, Net Worth: $${financialStatus.netWorth.toFixed(2)}.`
      }
    ],
  })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <div className={`fixed bottom-4 right-4 w-[450px] transition-all duration-300 ease-in-out ${isOpen ? 'h-[600px]' : 'h-12'}`}>
      <div 
        className="bg-blue-600 text-white p-2 cursor-pointer flex justify-between items-center rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">Financial Advisor AI</span>
        <span>{isOpen ? '▼' : '▲'}</span>
      </div>
      {isOpen && (
        <div className="bg-white border border-gray-300 h-full flex flex-col rounded-b-lg shadow-xl">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.slice(1).map((message, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${
                  message.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
                }`}
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleFormSubmit} className="border-t p-2 flex">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask for financial advice..."
              className="flex-1 px-4 py-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-r hover:bg-blue-600 transition-colors font-medium">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

