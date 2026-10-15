import { PBKDF2, SHA256, algo, enc, lib } from "crypto-js"

// Changing any of these values changes every generated password
const ITERATIONS = 10000
const KEY_SIZE_WORDS = 256 / 32

export type AlgorithmVersion = "v1" | "v2"

function derive(password: string, salt: lib.WordArray) {
  const key = PBKDF2(password.normalize("NFC"), salt, {
    keySize: KEY_SIZE_WORDS,
    iterations: ITERATIONS,
    // Set explicitly: crypto-js <= 4.1 defaulted to SHA1
    hasher: algo.SHA256,
  })

  return enc.Base64.stringify(key)
}

// "  My Bank " and "mybank" must derive the same password
export function normalizeSite(site: string) {
  return site.normalize("NFC").replace(/\s+/g, "").toLowerCase()
}

/** Legacy algorithm: one password for every site. */
export function generateHash(password: string, phrase: string) {
  return derive(password, SHA256(phrase.normalize("NFC")))
}

/** One password per site; bump the counter to rotate a single site's password. */
export function generateHashV2(
  password: string,
  phrase: string,
  site: string,
  counter: number
) {
  // JSON array encoding keeps the fields unambiguous ("ab"+"c" != "a"+"bc")
  const salt = SHA256(
    JSON.stringify([
      "crypto-pass-v2",
      phrase.normalize("NFC"),
      normalizeSite(site),
      counter,
    ])
  )

  return derive(password, salt)
}
