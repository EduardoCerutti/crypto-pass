import type { Translations } from "./en"

const es: Translations = {
  home: {
    versionFast: "v2 rápida",
    versionStandard: "v2",
    showTour: "Mostrar el recorrido de la app",
    passphrase: "Frase secreta",
    password: "Contraseña",
    site: "Nombre del sitio (ej.: gmail)",
    generate: "Generar",
    finalPassword: "Contraseña final",
    copied: "Copiada. El portapapeles se borrará en %{seconds} s.",
    generateError: "No se pudo generar la contraseña",
  },
  tour: {
    welcomeTitle: "Bienvenido a Crypto Pass",
    welcomeBody:
      "Crypto Pass crea contraseñas seguras a partir de cosas que puedes recordar. Escribe los mismos datos y obtendrás la misma contraseña, en cualquier teléfono, siempre.",
    v2Title: "v2 (recomendada)",
    v2Body:
      "Usa tu frase secreta, tu contraseña, el nombre del sitio y un contador, así cada sitio tiene su propia contraseña. Para cambiar la contraseña de un sitio, aumenta su contador. Puede tardar entre 1 y 2 segundos en teléfonos más antiguos.",
    v2FastTitle: "v2 rápida",
    v2FastBody:
      "Funciona como la v2 con la mitad de memoria: es unas dos veces más rápida y un poco menos resistente a ataques. Genera contraseñas distintas a las de la v2, así que usa siempre la misma versión para cada sitio.",
    warningTitle: "No se guarda nada",
    warningBody:
      "Crypto Pass nunca guarda ni envía nada: ni tu frase secreta, contraseña o nombres de sitios, ni las contraseñas que crea.",
    warningLoss:
      "Si olvidas cualquiera de ellos, o qué versión y contador usaste, la contraseña se perderá para siempre. Nadie puede recuperarla.",
    warningTip:
      "Consejo: anota la versión y el contador que usas en cada sitio. No son secretos. Nunca anotes tu frase secreta ni tu contraseña.",
    acknowledge: "Entiendo que olvidar un dato significa perder la contraseña",
    start: "Empezar a usar Crypto Pass",
    next: "Siguiente",
    back: "Atrás",
    skip: "Omitir",
  },
}

export default es
