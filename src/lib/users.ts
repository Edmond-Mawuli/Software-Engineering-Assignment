import bcrypt from 'bcrypt'

type User = {
  username: string
  passwordHash: string
}

export const users: User[] = []

export async function registerUser(username: string, password: string): Promise<boolean> {
  const existing = users.find(u => u.username === username)
  if (existing) return false

  const passwordHash = await bcrypt.hash(password, 10)
  users.push({ username, passwordHash })
  return true
}

export async function loginUser(username: string, password: string): Promise<boolean> {
  const user = users.find(u => u.username === username)
  if (!user) return false

  return await bcrypt.compare(password, user.passwordHash)
}