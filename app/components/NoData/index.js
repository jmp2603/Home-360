/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Aicon from "react-native-vector-icons/AntDesign";
import { BaseColors } from "../../config/theme";

export default function NoData(props) {
  const { iconSize } = props;
  const colors = useTheme();

  const styles = StyleSheet.create({
    emptydata: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    cleardatatxt: {
      fontSize: 14,
      color: BaseColors.secondary,
      fontWeight: "800",
    },
  });

  return (
    <View style={styles.emptydata}>
      <Aicon
        name="folder1"
        size={iconSize || 50}
        color={BaseColors.secondary}
      />
      <Text style={styles.cleardatatxt}>No Data</Text>
    </View>
  );
}
