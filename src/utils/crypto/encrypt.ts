import { argon2, createHash, pbkdf2 } from "react-native-quick-crypto"

// Changing any of these values changes every generated password
const V1_PBKDF2 = { iterations: 10000, keyLength: 32, digest: "sha256" }
// RFC 9106 §4 recommended option for memory-constrained devices
const V2_ARGON2ID = {
  memory: 64 * 1024, // KiB
  passes: 3,
  parallelism: 4,
  tagLength: 32,
}

export type AlgorithmVersion = "v1" | "v2"

function utf8(text: string) {
  return new TextEncoder().encode(text.normalize("NFC"))
}

function sha256(text: string) {
  return createHash("sha256").update(utf8(text)).digest()
}

// "  My Bank " and "mybank" must derive the same password
export function normalizeSite(site: string) {
  return site.normalize("NFC").replace(/\s+/g, "").toLowerCase()
}

/** Legacy algorithm: one password for every site. */
export function generateHash(password: string, phrase: string) {
  // Runs natively off the JS thread, so the UI does not freeze
  return new Promise<string>((resolve, reject) => {
    pbkdf2(
      utf8(password),
      sha256(phrase),
      V1_PBKDF2.iterations,
      V1_PBKDF2.keyLength,
      V1_PBKDF2.digest,
      (err, key) =>
        err || !key ? reject(err) : resolve(key.toString("base64"))
    )
  })
}

/** One password per site; bump the counter to rotate a single site's password. */
export function generateHashV2(
  password: string,
  phrase: string,
  site: string,
  counter: number
) {
  // JSON array encoding keeps the fields unambiguous ("ab"+"c" != "a"+"bc")
  const salt = sha256(
    JSON.stringify(["crypto-pass-v2", phrase, normalizeSite(site), counter])
  )

  // Memory-hard Argon2id, run natively off the JS thread
  return new Promise<string>((resolve, reject) => {
    argon2(
      "argon2id",
      { message: utf8(password), nonce: salt, ...V2_ARGON2ID },
      (err, tag) => (err ? reject(err) : resolve(tag.toString("base64")))
    )
  })
}
