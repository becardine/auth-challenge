import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {
  evaluatePassword(password: string): { strength: string; percentage: number } {
    let strength = 'weak'
    let percentage = 0

    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const criteriaMet = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChars,
    ].filter(Boolean).length

    if (password.length >= 8 && criteriaMet === 4) {
      strength = 'very strong'
      percentage = 100
    } else if (password.length >= 6 && criteriaMet >= 3) {
      strength = 'strong'
      percentage = 75
    } else if (password.length >= 4 && criteriaMet >= 2) {
      strength = 'medium'
      percentage = 50
    } else if (password.length > 0) {
      strength = 'weak'
      percentage = 25
    }

    return { strength, percentage }
  }
}
