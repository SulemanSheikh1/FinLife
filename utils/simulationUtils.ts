import { UserProfile, Expenses, FinancialStatus } from '../types/types'

export interface Decision {
  scenario: string
  choices: string[]
  correctChoice: string
  correctFeedback: string
  incorrectFeedback: string
}

export function simulateMonth(
  userProfile: UserProfile,
  expenses: Expenses,
  currentStatus: FinancialStatus
): { newStatus: FinancialStatus; event: string } {
  const monthlySalary = Number(userProfile.salary) / 12
  const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + Number(value), 0)
  const monthlyNet = monthlySalary - totalExpenses

  const newStatus = { ...currentStatus }
  newStatus.savings += monthlyNet * 0.5
  newStatus.investments += monthlyNet * 0.3
  newStatus.debt = Math.max(0, newStatus.debt - monthlyNet * 0.2)
  newStatus.netWorth = newStatus.savings + newStatus.investments - newStatus.debt

  const randomEvent = Math.random() < 0.3 ? generateRandomFinancialEvent(newStatus) : null

  return {
    newStatus,
    event: randomEvent ? randomEvent.description : "No significant events this month.",
  }
}

function generateRandomFinancialEvent(status: FinancialStatus): { description: string; impact: number } {
  const events = [
    { description: "You received a bonus!", impact: 1000 },
    { description: "Unexpected car repair bill.", impact: -500 },
    { description: "You won a small lottery!", impact: 200 },
    { description: "Medical expenses this month.", impact: -300 },
  ]

  const event = events[Math.floor(Math.random() * events.length)]
  status.savings += event.impact
  status.netWorth += event.impact

  return event
}

export function generateRandomEvent(): Decision {
  const decisions: Decision[] = [
    {
      scenario: "You have a family emergency and need to pay $10,000 out-of-pocket. Where do you take it from?",
      choices: ["Savings", "Investments", "Credit Card"],
      correctChoice: "Savings",
      correctFeedback: "Good choice! Using savings avoids additional debt or penalties.",
      incorrectFeedback: "Using a credit card would incur high-interest rates. Savings should be used for emergencies like this.",
    },
    {
      scenario: "You have an opportunity to invest in a promising startup. What do you do?",
      choices: ["Invest 10% of savings", "Invest 50% of savings", "Don't invest"],
      correctChoice: "Invest 10% of savings",
      correctFeedback: "Smart move! Diversifying with a small portion of your savings can be a good strategy.",
      incorrectFeedback: "It's risky to invest too much in a single opportunity. Always diversify and only invest what you can afford to lose.",
    },
    {
      scenario: "You've received a $5,000 tax refund. How do you use it?",
      choices: ["Save it all", "Invest it all", "Split between savings and debt repayment"],
      correctChoice: "Split between savings and debt repayment",
      correctFeedback: "Excellent! Balancing between saving and paying off debt is often the best approach.",
      incorrectFeedback: "While saving or investing can be good, it's usually best to also pay down high-interest debt when you have extra funds.",
    },
  ]

  return decisions[Math.floor(Math.random() * decisions.length)]
}

