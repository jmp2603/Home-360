// CustomDrawerContent.js
import * as React from "react";
// import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { BaseColors } from "../config/theme";
import { TouchableOpacity } from "react-native";
import { CustomIcon } from "../config/LoadIcons";
import { ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const IOS = Platform.OS === "ios";
export default function SideDrawer({ navigation }) {
  // drawerItems.js
  const drawerItems = [
    {
      category: "General",
      items: [
        {
          label: "View Tasks",
          onPress: () => {
            navigation.navigate("ViewTask");
            navigation.closeDrawer();
          },
        },
        // {
        //   label: "View Attendance",
        //   onPress: () => console.log("View Attendance Pressed"),
        // },
        // {
        //   label: "Leave Application",
        //   onPress: () => console.log("Leave Application Pressed"),
        // },
      ],
    },
    // {
    //   category: "Finance",
    //   items: [
    //     {
    //       label: "View Salary History",
    //       onPress: () => console.log("View Salary History Pressed"),
    //     },
    //     {
    //       label: "Add Expenses",
    //       onPress: () => console.log("Add Expenses Pressed"),
    //     },
    //     {
    //       label: "Link UPI Account",
    //       onPress: () => console.log("Link UPI Account Pressed"),
    //     },
    //     { label: "Loan", onPress: () => console.log("Loan Pressed") },
    //   ],
    // },
    // {
    //   category: "Settings",
    //   items: [
    //     { label: "Profile", onPress: () => console.log("Profile Pressed") },
    //     {
    //       label: "App Language",
    //       onPress: () => console.log("App Language Pressed"),
    //     },
    //     { label: "Tutorials", onPress: () => console.log("Tutorials Pressed") },
    //   ],
    // },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderColor: BaseColors.yellow,
            backgroundColor: BaseColors.yellow,
          }}
        >
          <CustomIcon name="Close" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.drawerContent}>
        <FlatList
          data={drawerItems}
          renderItem={({ item, ind }) => {
            return (
              <View key={ind}>
                <Text style={styles.sectionTitle}>{item.category}</Text>
                {item.items.map((li) => {
                  {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ padding: 12 }}
                        onPress={() => li.onPress()}
                      >
                        <Text style={styles.drawerItemLabel}>{li.label}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.primary,
    paddingTop: getStatusBarHeight() + (IOS ? 40 : 20),
  },
  closeIconContainer: {
    alignItems: "flex-start",
    padding: 16,
  },
  drawerContent: {
    flex: 1,
    paddingLeft: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "700",
  },
  drawerItemLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
  drawerHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    marginLeft: 10,
  },
});
