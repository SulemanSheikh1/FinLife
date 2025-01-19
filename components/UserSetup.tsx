import { useState } from 'react'
import { UserProfile } from '../types/types'

interface UserSetupProps {
  onSubmit: (profile: UserProfile) => void
}

export default function UserSetup({ onSubmit }: UserSetupProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    jobTitle: '',
    salary: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(profile)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Set Up Your Profile</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block mb-2">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={profile.age}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block mb-2">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={profile.jobTitle}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="salary" className="block mb-2">Annual Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={profile.salary}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Continue
      </button>
    </form>
  )
}

