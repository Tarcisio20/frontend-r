export function validatePassword(password: string): string | null {
  // 1. Pelo menos 8 caracteres
  if (password.length < 8) {
    return "Sua senha precisa conter pelo menos 8 caracteres.";
  }

  // 2. Senhas comumente utilizadas
  const commonPasswords = [
    "12345678", "123456789", "123456", "senha123", "admin", "qwerty", "iloveyou", "abc123", "password"
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    return "Sua senha não pode ser uma senha comumente utilizada.";
  }

  // 3. Não pode ser inteiramente numérica
  if (/^\d+$/.test(password)) {
    return "Sua senha não pode ser inteiramente numérica.";
  }

  // Senha válida
  return null;
}
