import { Modal, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { colors } from "../../themes/Dark"
import { globalStyles } from "../../styles/Global"
import { tourStyles } from "./Tour.styles"
import { t } from "../../i18n"

type TourStep = {
  icon: React.ComponentProps<typeof Feather>["name"]
  titleKey: string
  bodyKey: string
}

const steps: TourStep[] = [
  { icon: "key", titleKey: "tour.welcomeTitle", bodyKey: "tour.welcomeBody" },
  { icon: "shield", titleKey: "tour.v2Title", bodyKey: "tour.v2Body" },
  { icon: "zap", titleKey: "tour.v2FastTitle", bodyKey: "tour.v2FastBody" },
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
              <Text style={tourStyles.title}>{t("tour.warningTitle")}</Text>
              <Text style={tourStyles.body}>{t("tour.warningBody")}</Text>
              <Text style={[tourStyles.body, tourStyles.warningText]}>
                {t("tour.warningLoss")}
              </Text>
              <Text style={tourStyles.tip}>{t("tour.warningTip")}</Text>

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
                  {t("tour.acknowledge")}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Feather name={step.icon} size={56} color={colors.text} />
              <Text style={tourStyles.title}>{t(step.titleKey)}</Text>
              <Text style={tourStyles.body}>{t(step.bodyKey)}</Text>
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
            {isWarning ? t("tour.start") : t("tour.next")}
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
              {t("tour.back")}
            </Text>
          </TouchableOpacity>

          {!isWarning && (
            <TouchableOpacity onPress={() => setStepIndex(warningIndex)}>
              <Text style={tourStyles.secondaryText}>{t("tour.skip")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default Tour
