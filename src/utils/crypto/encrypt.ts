import { argon2, createHash } from "react-native-quick-crypto"

// Changing any of these values changes every generated password
const V2_ARGON2ID = { passes: 3, parallelism: 4, tagLength: 32 }
// Memory is the main cost for an attacker's GPU. On a Galaxy M53, the slowest
// phone in use, v2-fast takes ~0.75 s and v2 ~1.4 s.
const V2_MEMORY_KIB = {
  "v2-fast": 256 * 1024,
  v2: 512 * 1024,
}

export type AlgorithmVersion = keyof typeof V2_MEMORY_KIB

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

/** One password per site; bump the counter to rotate a single site's password. */
export function generateHashV2(
  password: string,
  phrase: string,
  site: string,
  counter: number,
  version: AlgorithmVersion
) {
  // JSON array encoding keeps the fields unambiguous ("ab"+"c" != "a"+"bc")
  const salt = sha256(
    JSON.stringify(["crypto-pass-v2", phrase, normalizeSite(site), counter])
  )

  // Memory-hard Argon2id, run natively off the JS thread. The memory size is an
  // Argon2 input, so v2 and v2-fast derive different passwords from one salt.
  return new Promise<string>((resolve, reject) => {
    argon2(
      "argon2id",
      {
        message: utf8(password),
        nonce: salt,
        memory: V2_MEMORY_KIB[version],
        ...V2_ARGON2ID,
      },
      (err, tag) => (err ? reject(err) : resolve(tag.toString("base64")))
    )
  })
}
