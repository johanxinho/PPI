export const MIN_PASSWORD_LENGTH = 10

export function passwordError(password) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
  }
  if (!/[A-ZÁÉÍÓÚÑ]/.test(password)) return 'Incluye al menos una letra mayúscula.'
  if (!/[a-záéíóúñ]/.test(password)) return 'Incluye al menos una letra minúscula.'
  if (!/\d/.test(password)) return 'Incluye al menos un número.'
  return ''
}
