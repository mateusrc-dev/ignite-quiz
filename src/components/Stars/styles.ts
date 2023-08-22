import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    canvas: {
        width: 257, // width and heigh of trophy (look in figma)
        height: 249,
        position: "absolute",
        zIndex: 1
    }
})