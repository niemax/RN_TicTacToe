import { Text, TouchableOpacity, StyleSheet } from "react-native"

interface CellProps {
  item: string | null
  index: number
  cellSize: number
  makeMove: () => void
}

const Cell = ({ item, index, cellSize, makeMove }: CellProps) => (
  <TouchableOpacity
    key={index}
    testID="cell"
    style={[styles.cell, { width: cellSize, height: cellSize }]}
    onPress={makeMove}
  >
    <Text style={styles.text}>{item ?? ""}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
})

export default Cell
