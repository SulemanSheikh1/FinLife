import { useState } from 'react'
import { Expenses } from '../types/types'

interface ExpenseSetupProps {
  onSubmit: (expenses: Expenses) => void
}

export default function ExpenseSetup({ onSubmit }: ExpenseSetupProps) {
  const [expenses, setExpenses] = useState<Expenses>({
    rent: '',
    utilities: '',
    food: '',
    transportation: '',
    entertainment: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setExpenses(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(expenses)
  }

  const calculateTotal = () => {
    return Object.values(expenses).reduce((sum, value) => sum + Number(value), 0)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Set Up Your Monthly Expenses</h2>
      {Object.entries(expenses).map(([category, value]) => (
        <div key={category} className="mb-4">
          <label htmlFor={category} className="block mb-2 capitalize">{category}</label>
          <input
            type="number"
            id={category}
            name={category}
            value={value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}
      <div className="mb-4">
        <strong>Total Monthly Expenses: ${calculateTotal()}</strong>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Start Simulation
      </button>
    </form>
  )
}

