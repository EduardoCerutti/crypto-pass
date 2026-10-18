import { Modal, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { colors } from "../../themes/Dark"
import { globalStyles } from "../../styles/Global"
import { tourStyles } from "./Tour.styles"

type TourStep = {
  icon: React.ComponentProps<typeof Feather>["name"]
  title: string
  body: string
}

const steps: TourStep[] = [
  {
    icon: "key",
    title: "Welcome to Crypto Pass",
    body: "Crypto Pass creates strong passwords from things you can remember. Type the same inputs and you get the same password, on any phone, every time.",
  },
  {
    icon: "shield",
    title: "v2 (recommended)",
    body: "Uses your passphrase, password, the site name and a counter, so every site gets its own password. To change one site's password, raise its counter. It can take 1–2 seconds on older phones.",
  },
  {
    icon: "zap",
    title: "v2 fast",
    body: "Works like v2 with half the memory: about twice as fast, slightly less resistant to attacks. It creates different passwords than v2, so always use the same version for a site.",
  },
  {
    icon: "clock",
    title: "v1 (legacy)",
    body: "The original version. It only uses your passphrase and password, so it gives the same password for every site. Use it only for passwords you already created with it.",
  },
]

type TourProps = {
  visible: boolean
  onFinish: () => void
}

const Tour: React.FC<TourProps> = ({ visible, onFinish }: TourProps) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [acknowledged, setAcknowledged] = useState(false)

  // The warning is the last step and cannot be skipped
  const warningIndex = steps.length
  const isWarning = stepIndex === warningIndex
  const step = steps[stepIndex]

  const finish = () => {
    setStepIndex(0)
    setAcknowledged(false)
    onFinish()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => setStepIndex((index) => Math.max(0, index - 1))}
    >
      <View style={tourStyles.container}>
        <View style={tourStyles.content}>
          {isWarning ? (
            <>
              <Feather name="alert-triangle" size={56} color={colors.warning} />
              <Text style={tourStyles.title}>Nothing is saved</Text>
              <Text style={tourStyles.body}>
                Crypto Pass never stores or sends anything: not your passphrase,
                password or site names, and not the passwords it creates.
              </Text>
              <Text style={[tourStyles.body, tourStyles.warningText]}>
                If you forget any of them, or which version and counter you
                used, the password is lost forever. Nobody can recover it.
              </Text>
              <Text style={tourStyles.tip}>
                Tip: write down the version and counter you use for each site.
                They are not secret. Never write down your passphrase and
                password.
              </Text>

              <TouchableOpacity
                style={tourStyles.checkboxRow}
                onPress={() => setAcknowledged(!acknowledged)}
              >
                <Feather
                  name={acknowledged ? "check-square" : "square"}
                  size={24}
                  color={colors.text}
                />
                <Text style={tourStyles.checkboxText}>
                  I understand that a forgotten input means a lost password
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Feather name={step.icon} size={56} color={colors.text} />
              <Text style={tourStyles.title}>{step.title}</Text>
              <Text style={tourStyles.body}>{step.body}</Text>
            </>
          )}
        </View>

        <View style={tourStyles.dots}>
          {[...steps, null].map((_, index) => (
            <View
              key={index}
              style={[
                tourStyles.dot,
                index === stepIndex && tourStyles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            globalStyles.button,
            isWarning && !acknowledged && globalStyles.buttonDisabled,
          ]}
          disabled={isWarning && !acknowledged}
          onPress={() => (isWarning ? finish() : setStepIndex(stepIndex + 1))}
        >
          <Text style={globalStyles.buttonText}>
            {isWarning ? "Start using Crypto Pass" : "Next"}
          </Text>
        </TouchableOpacity>

        <View style={tourStyles.secondaryRow}>
          <TouchableOpacity
            disabled={stepIndex === 0}
            onPress={() => setStepIndex(stepIndex - 1)}
          >
            <Text
              style={[
                tourStyles.secondaryText,
                stepIndex === 0 && tourStyles.hidden,
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>

          {!isWarning && (
            <TouchableOpacity onPress={() => setStepIndex(warningIndex)}>
              <Text style={tourStyles.secondaryText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default Tour
