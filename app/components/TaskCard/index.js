/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import Button from "../../components/Button";

export default function TaskCard(props) {
  //   const { chartState } = props;
  const colors = useTheme();
  const styles = createStyles(colors);

  const TaskArray = [
    {
      task: "Clean the house",
      description:
        "Sweep and mop the floors, dust all surfaces, and organize clutter.",
      date: "02/05/2024",
    },
    {
      task: "Complete homework assignments",
      description:
        "Review the assignments, work on them diligently, and double-check for accuracy.",
      date: "02/05/2024",
    },
    {
      task: "Exercise regularly",
      description:
        "Engage in physical activity such as jogging, cycling, or yoga for at least 30 minutes a day.",
      date: "02/05/2024",
    },
    {
      task: "Read a book",
      description:
        "Select a book of interest, allocate some time daily for reading, and immerse yourself in the content.",
      date: "02/05/2024",
    },
    {
      task: "Prepare healthy meals",
      description:
        "Plan balanced meals with plenty of fruits, vegetables, lean proteins, and whole grains, and avoid processed foods.",
      date: "02/05/2024",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardSty}>
        <View
          style={{
            backgroundColor: BaseColors.white,
            padding: 8,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: BaseColors.primary,
              fontSize: 16,
              paddingVertical: 3,
            }}
          >
            {item.task}
          </Text>
          <Text
            style={{
              color: item.color ? BaseColors.white : BaseColors.black,
              fontSize: 14,
              paddingVertical: 3,
            }}
          >
            {item.description}
          </Text>
          <Text
            style={{
              color: item.color ? BaseColors.white : BaseColors.black,
              paddingVertical: 3,
              fontSize: 14,
            }}
          >
            {item.date}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              txtSty={{ fontSize: 14 }}
              style={{
                borderColor: BaseColors.inactive,
              }}
              containerStyle={{
                backgroundColor: "green",
              }}
            >
              Completed
            </Button>
            <Button
              txtSty={{ fontSize: 14 }}
              style={{
                borderColor: BaseColors.inactive,
              }}
              containerStyle={{
                backgroundColor: BaseColors.primary,
              }}
            >
              View Details
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.colors.white }}>
      <View style={{ marginHorizontal: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={TaskArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: 0,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
}
