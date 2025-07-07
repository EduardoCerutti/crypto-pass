import { PBKDF2, SHA256, enc } from "crypto-js"

export function generateHash(password: string, phrase: string) {
  const phraseHash = SHA256(phrase)

  const passwordHash = PBKDF2(password, phraseHash, {
    keySize: 32 / 4,
    iterations: 1000,
  })

  return enc.Base64.stringify(passwordHash)
}
