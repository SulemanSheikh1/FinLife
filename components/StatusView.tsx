import { FinancialStatus } from '../types/types'

interface StatusViewProps {
  financialStatus: FinancialStatus
}

export default function StatusView({ financialStatus }: StatusViewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Financial Status</h2>
      <div className="space-y-4">
        <StatusItem label="Savings" value={financialStatus.savings} />
        <StatusItem label="Investments" value={financialStatus.investments} />
        <StatusItem label="Debt" value={financialStatus.debt} isNegative />
        <StatusItem label="Net Worth" value={financialStatus.netWorth} isBold />
      </div>
    </div>
  )
}

function StatusItem({ label, value, isNegative = false, isBold = false }: { label: string; value: number; isNegative?: boolean; isBold?: boolean }) {
  const formattedValue = value.toFixed(2)
  const textColor = isNegative ? 'text-red-500' : 'text-green-500'
  const fontWeight = isBold ? 'font-bold' : 'font-normal'
  
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}:</span>
      <span className={`${textColor} ${fontWeight}`}>
        ${isNegative && value > 0 ? '-' : ''}{formattedValue}
      </span>
    </div>
  )
}

