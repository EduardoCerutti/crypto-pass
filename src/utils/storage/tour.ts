import { File, Paths } from "expo-file-system"

// An empty marker file: the only thing the app ever writes to the device
const tourSeenFile = new File(Paths.document, "tour-seen")

export function hasSeenTour() {
  try {
    return tourSeenFile.exists
  } catch {
    return false
  }
}

export function markTourSeen() {
  try {
    if (!tourSeenFile.exists) tourSeenFile.create()
  } catch {
    // Not critical: the tour just shows again next launch
  }
}
