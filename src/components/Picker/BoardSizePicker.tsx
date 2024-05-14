import React, { useCallback } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import SegmentedControl from "@react-native-segmented-control/segmented-control"
import { BoardSize } from "../../hooks/useBoardState"

interface BoardSizePickerProps {
  boardSize: BoardSize
  onValueChange: (value: BoardSize) => void
}

const BoardSizePicker = ({
  boardSize,
  onValueChange,
}: BoardSizePickerProps) => {
  const pickerValue =
    boardSize === BoardSize.NORMAL ? 0 : boardSize === BoardSize.LARGE ? 1 : 2

  const handlePickerValueChange = useCallback(
    (event: any) => {
      let newSize: BoardSize
      switch (event.nativeEvent.selectedSegmentIndex) {
        case 0:
          newSize = BoardSize.NORMAL
          break
        case 1:
          newSize = BoardSize.LARGE
          break
        case 2:
          newSize = BoardSize.XLARGE
          break
        default:
          newSize = BoardSize.NORMAL
      }
      onValueChange(newSize)
    },
    [onValueChange]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Board Size</Text>
      <SegmentedControl
        testID="picker"
        values={["Normal", "Large", "X-Large"]}
        selectedIndex={pickerValue}
        onChange={handlePickerValueChange}
        style={styles.segmentedControl}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  segmentedControl: {
    marginTop: 8,
    width: "100%",
  },
})

export default BoardSizePicker
