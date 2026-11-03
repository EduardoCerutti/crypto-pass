const en = {
  home: {
    versionFast: "v2 fast",
    versionStandard: "v2",
    showTour: "Show the app tour",
    passphrase: "Passphrase",
    password: "Password",
    site: "Site name (e.g. gmail)",
    generate: "Generate",
    finalPassword: "Final password",
    copied: "Copied. Clipboard will be cleared in %{seconds}s.",
    generateError: "Could not generate password",
  },
  tour: {
    welcomeTitle: "Welcome to Crypto Pass",
    welcomeBody:
      "Crypto Pass creates strong passwords from things you can remember. Type the same inputs and you get the same password, on any phone, every time.",
    v2Title: "v2 (recommended)",
    v2Body:
      "Uses your passphrase, password, the site name and a counter, so every site gets its own password. To change one site's password, raise its counter. It can take 1–2 seconds on older phones.",
    v2FastTitle: "v2 fast",
    v2FastBody:
      "Works like v2 with half the memory: about twice as fast, slightly less resistant to attacks. It creates different passwords than v2, so always use the same version for a site.",
    warningTitle: "Nothing is saved",
    warningBody:
      "Crypto Pass never stores or sends anything: not your passphrase, password or site names, and not the passwords it creates.",
    warningLoss:
      "If you forget any of them, or which version and counter you used, the password is lost forever. Nobody can recover it.",
    warningTip:
      "Tip: write down the version and counter you use for each site. They are not secret. Never write down your passphrase and password.",
    acknowledge: "I understand that a forgotten input means a lost password",
    start: "Start using Crypto Pass",
    next: "Next",
    back: "Back",
    skip: "Skip",
  },
}

export type Translations = typeof en

export default en
