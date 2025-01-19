import { useState, useEffect } from 'react'
import { UserProfile, Expenses, FinancialStatus } from '../types/types'
import { simulateMonth, generateRandomEvent, Decision } from '../utils/simulationUtils'

interface SimulationProps {
  userProfile: UserProfile
  expenses: Expenses
  financialStatus: FinancialStatus
  setFinancialStatus: React.Dispatch<React.SetStateAction<FinancialStatus>>
}

export default function Simulation({ userProfile, expenses, financialStatus, setFinancialStatus }: SimulationProps) {
  const [messages, setMessages] = useState<Array<{ text: string; type?: 'correct' | 'incorrect' }>>([])
  const [currentMonth, setCurrentMonth] = useState(1)
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null)
  const [showMoneyAnimation, setShowMoneyAnimation] = useState(false)

  useEffect(() => {
    simulateNextMonth()
  }, [])

  const simulateNextMonth = () => {
    const { newStatus, event } = simulateMonth(userProfile, expenses, financialStatus)
    setFinancialStatus(newStatus)
    setMessages(prev => [...prev, { text: `Month ${currentMonth}: ${event}` }])
    setCurrentMonth(prev => prev + 1)

    const decision = generateRandomEvent()
    setCurrentDecision(decision)
  }

  const handleDecision = (choice: string) => {
    if (!currentDecision) return

    const isCorrect = choice === currentDecision.correctChoice
    const feedback = isCorrect ? currentDecision.correctFeedback : currentDecision.incorrectFeedback
    setMessages(prev => [
      ...prev,
      { text: `Decision: ${currentDecision.scenario}` },
      { text: `Your choice: ${choice}`, type: isCorrect ? 'correct' : 'incorrect' },
      { text: feedback, type: isCorrect ? 'correct' : 'incorrect' }
    ])
    setCurrentDecision(null)
    
    if (isCorrect) {
      setShowMoneyAnimation(true)
      setTimeout(() => setShowMoneyAnimation(false), 3000)
    }
    
    simulateNextMonth()
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg h-[600px] flex flex-col relative overflow-hidden">
      <div className="flex-grow overflow-y-auto mb-4 relative z-10">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-2 p-2 rounded shadow ${
              message.type === 'correct' ? 'bg-green-100 border-l-4 border-green-500' :
              message.type === 'incorrect' ? 'bg-red-100 border-l-4 border-red-500' :
              'bg-white'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      {currentDecision && (
        <div className="bg-white p-4 rounded shadow relative z-10">
          <h3 className="font-bold mb-2">{currentDecision.scenario}</h3>
          <div className="flex gap-2">
            {currentDecision.choices.map(choice => (
              <button
                key={choice}
                onClick={() => handleDecision(choice)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}
      {showMoneyAnimation && <MoneyAnimation />}
    </div>
  )
}

function MoneyAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          💰
        </div>
      ))}
    </div>
  )
}

