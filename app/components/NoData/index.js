/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BaseColors } from "../../config/theme";
import { CustomIcon } from "../../config/LoadIcons";

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
      marginVertical: 10,
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.45)",
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.emptydata}>
      <CustomIcon name="Empty-File" size={60} color={"rgba(0, 0, 0, 0.25)"} />
      <Text style={styles.cleardatatxt}>No Data</Text>
    </View>
  );
}
