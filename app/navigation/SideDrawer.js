/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Text,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import Image from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { CustomIcon } from "../config/LoadIcons";
import { logout } from "../utils/CommonFunc";
import { BaseColors } from "../config//theme";
import authActions from "../redux/reducers/auth/actions";
import Aicon from "react-native-vector-icons/AntDesign";
import BaseSetting from "../config/setting";
import { getApiData } from "../utils/apiHelper";
import { translate } from "../lang/Translate";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { EventRegister } from "react-native-event-listeners";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { isEmpty } from "lodash";
import { Images } from "../config";
import DeviceInfo from "react-native-device-info";

const isTabletDevice = DeviceInfo.isTablet();
const IOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.primary,
    paddingTop: Dimensions.get("window").height / 9,
  },
  profileView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height / 20,
    paddingBottom: 30,
  },
  usrImgSty: {
    width: "100%",
    height: 65,
    borderRadius: 10,
  },
  usrNameTxt: {
    fontSize: 20,
    letterSpacing: 1,
    color: BaseColors.white,
    alignContent: "center",
  },
  usrPhoneTxt: {
    fontSize: 12,
    color: BaseColors.white,
    marginTop: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingLeft: Dimensions.get("window").width / 35,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  listIconView: {
    minWidth: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  subIconSty: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: Dimensions.get("window").width / 20,
    color: BaseColors.white,
  },
  listIconSty: {
    color: BaseColors.white,
  },
  listItemTxt: {
    fontSize: isTabletDevice ? 20 : 14,
    color: BaseColors.white,
    alignSelf: "center",
  },
  heading: {
    fontSize: 20,
    color: BaseColors.sidebartext,
  },
  barView: {
    width: "100%",
    height: 1,
    marginVertical: 25,
    opacity: 0.4,
    backgroundColor: BaseColors.white,
  },
  listWrapper: {
    paddingVertical: 20, // add paddingBottom here
  },
  profilePic: {
    height: 80,
    width: 80,
    marginTop: IOS ? getStatusBarHeight() + 20 : getStatusBarHeight(),
    borderRadius: 40,
    // marginRight: 15,
  },
});

/**
 * SideDrawer screen
 * @module  SideDrawer
 *
 */

export default function SideDrawer({ navigation }) {
  const isFocused = useIsFocused();
  const colors = useTheme();
  const [clicked, setClickID] = useState(null);
  const [btnloader, setButtonLoader] = useState(false);
  const { userData, subscriptionArr, darkmode, userPermission, isDemo } =
    useSelector((state) => state.auth);
  const { fcmToken } = useSelector((state) => state.notification);
  const { isOnline } = useSelector((state) => state.offline);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [safetymenusUpdated, setSafetyMenusUpdated] = useState(false);
  const [safetymenus, setSafetyMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [cAlert, setCAlert] = useState({
    title: "",
    message: "",
    showAlert: false,
  });
  const iconSize = isTabletDevice ? 27 : 20;
  const isOpen = (id) => id === open;
  const [isLightMode, setIsLightMode] = useState(darkmode);
  const [clickedEvent, setIsClickedEvent] = useState(false);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      logout();
    } catch (error) {
      console.error(error);
    }
  };
  // End

  // Side drawer Array...
  const drawerData = [
    {
      id: "dashboard",
      role: "dashboard",
      title: translate("dashboardtitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon size={iconSize} name="home" style={styles.listIconSty} />
        </View>
      ),
      submenu: [
        {
          id: "dashboard/compliance",
          role: "view_compliance",
          title: "Compliance",
          action: () => {
            navigation.navigate("HomeStackNavigator");
            navigation.closeDrawer();
          },
        },
        ...(isOnline
          ? [
              {
                id: "dashboard/map",
                role: "view_map",
                title: "Voyage",
                action: () => {
                  navigation.navigate("MapDashboard");
                  navigation.closeDrawer();
                },
              },
            ]
          : []),

        {
          id: "dashboard/vessels",
          role: "view_vessels",
          title: "Vessels",
          action: () => {
            navigation.navigate("VesselsDashboard");
            navigation.closeDrawer();
          },
        },
        {
          id: "dashboard/personnel",
          role: "view_personnel",
          title: "Personnel",
          action: () => {
            navigation.navigate("PersonnelDashboard");
            navigation.closeDrawer();
          },
        },
        {
          id: "dashboard/hseq",
          role: "view_hseq",
          title: "HSEQ",
          action: () => {
            navigation.navigate("HseqDashboard");
            navigation.closeDrawer();
          },
        },
        {
          id: "dashboard/lms",
          role: "view_lms",
          title: "LMS",
          action: () => {
            navigation.navigate("LMSDashboard");
            navigation.closeDrawer();
          },
        },
      ],
    },

    {
      id: "users",
      role: "users",
      title: translate("Users"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="User-Management"
            style={styles.listIconSty}
          />
        </View>
      ),
      action: () => {
        navigation.navigate("UserManagement");
        navigation.closeDrawer();
      },
    },

    {
      id: "trips",
      role: "trips",
      title: translate("Voyage Management"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="ScheduleTrip"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "schedule-a-trip",
          role: "schedule_trip",
          title: translate("Schedule a Voyage"),
          action: () => {
            navigation.navigate("ScheduleTrip");
            navigation.closeDrawer();
          },
        },
        {
          id: "my-trip",
          role: "my_trip",
          title: translate("My Voyages"),
          action: () => {
            navigation.navigate("MyTrip");
            navigation.closeDrawer();
          },
        },
      ],
    },
    {
      id: "vessels-management",
      role: "vessels_management",
      title: translate("VesselsManagementtitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="Vessele-Management"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "vessles-type",
          role: "vm_vessles_type",
          title: translate("vesselsTypes"),
          action: () => {
            navigation.navigate("VesselType");
            navigation.closeDrawer();
          },
        },
        {
          id: "vessles",
          role: "vessles",
          title: translate("sidebarvessels"),
          action: () => {
            navigation.navigate("Vessels");
            navigation.closeDrawer();
          },
        },
        {
          id: "drills",
          role: "drills",
          title: translate("sidebardrills"),
          action: () => {
            navigation.navigate("Drills");
            navigation.closeDrawer();
          },
        },
        {
          id: "audit",
          role: "audit_and_inspection_report",
          title: translate("SidebarAudit"),
          action: () => {
            navigation.navigate("Audit");
            navigation.closeDrawer();
          },
        },
        {
          id: 54,
          title: translate("inspections"),
          role: "audit_and_inspection_report",
          action: () => {
            navigation.navigate("Inspection");
            navigation.closeDrawer();
          },
        },
        {
          id: "punch-list",
          role: "punch_list",
          title: translate("sidebarpuchList"),
          action: () => {
            navigation.navigate("Deficiencies");
            navigation.closeDrawer();
          },
        },
      ],
    },
    {
      id: "voyage-reporting",
      role: "voyage_reporting",
      title: translate("VoyageReportingtitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="VoyageReporting"
            style={styles.listIconSty}
          />
        </View>
      ),

      action: () => {
        navigation.navigate("VoyageReporting");
        navigation.closeDrawer();
      },
    },
    {
      // id: 8,
      id: "personnel",
      role: "personnel",
      title: translate("personneltitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="Personnel"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        ...(isOnline
          ? [
              {
                id: "view_working_hours",
                role: "view_working_hours",
                title: "View Working Hours",
                action: () => {
                  navigation.navigate("ViewWorkingHours");
                  navigation.closeDrawer();
                },
              },
            ]
          : []),
        {
          id: "sea-time-tracker",
          role: "sea_time_tracker",
          title: translate("sidebarsea_time_tracker"),
          action: () => {
            navigation.navigate("SeaTimeTracker");
            navigation.closeDrawer();
          },
        },
        {
          id: "training-tracker",
          role: "training_tracker",
          title: translate("sidebartraining_tracker"),
          action: () => {
            navigation.navigate("TrainingTracker");
            navigation.closeDrawer();
          },
        },
        {
          id: "drill-tracker",
          role: "drill_tracker",
          title: translate("Drill Tracker"),
          action: () => {
            navigation.navigate("DrillTracker");
            navigation.closeDrawer();
          },
        },
        {
          id: "certificates",
          role: "certificates",
          title: translate("sidebarcertificates"),
          action: () => {
            navigation.navigate("PersonalCertificates");
            navigation.closeDrawer();
          },
        },
      ],
      action: () => {
        // navigation.navigate("ReportIssue");
        navigation.closeDrawer();
      },
    },
    {
      id: "hseq_sms",
      role: "hseq",
      title: translate("hseqtitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="SafetyManagement"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "safety-management-system",
          role: "safety_management",
          title: translate("sidebarsms_viewer"),
          action: () => {
            navigation.navigate("SmsEditor", { type: "viewer" });
            // navigation.closeDrawer();
          },
        },
      ],
    },
    {
      id: "learning_management",
      role: "learning_management",
      title: "Learning Management",
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="ScheduleTrip"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "all-courses",
          role: "learning_management",
          title: "All Courses",
          action: () => {
            navigation.navigate("AllCourse");
            navigation.closeDrawer();
          },
        },
        {
          id: "my-learning",
          role: "learning_management",
          title: "My Learnings",
          action: () => {
            navigation.navigate("MyLearning");
            navigation.closeDrawer();
          },
        },
        {
          id: "training-metrix",
          role: "training_metrix",
          title: "Training Metrix",
          action: () => {
            navigation.navigate("TrainingMetrix");
            navigation.closeDrawer();
          },
        },
        {
          id: "performance-evalution",
          role: "performance_evalution",
          title: "Performance Evaluations",
          action: () => {
            navigation.navigate("PerformanceEvaluations");
            navigation.closeDrawer();
          },
        },
        {
          id: "my-evalution",
          role: "my_evalution",
          title: "My Evaluations",
          action: () => {
            navigation.navigate("MyEvaluations");
            navigation.closeDrawer();
          },
        },
        {
          id: "goal",
          role: "goal",
          title: "Goals",
          action: () => {
            navigation.navigate("Goals");
            navigation.closeDrawer();
          },
        },
      ],
      action: () => {
        // navigation.navigate("FAQs");
        navigation.closeDrawer();
      },
    },

    {
      id: "activity-logs",
      role: "activity_log",
      title: translate("ActivityLogstitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="ActivityLog"
            style={styles.listIconSty}
          />
        </View>
      ),
      action: () => {
        navigation.navigate("ActivityLog");
        navigation.closeDrawer();
      },
    },
    {
      id: "forms",
      role: "forms",
      title: translate("Formstitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon size={iconSize} name="Forms" style={styles.listIconSty} />
        </View>
      ),
      submenu: [
        {
          id: "schedule-trip-form",
          role: "trip_form",
          title: translate("Voyage Form"),
          action: () => {
            navigation.navigate("DynamicFormView", {
              slug: "schedule_a_trip",
            });
            navigation.closeDrawer();
          },
        },
        {
          id: "safety-form",
          role: "safety_forms",
          title: translate("safetyformstitle"),
          action: () => {
            navigation.navigate("SafteyForm");
            navigation.closeDrawer();
          },
        },
        {
          id: "goals-forms",
          role: "goals_forms",
          title: translate("Goal Forms"),
          action: () => {
            navigation.navigate("GoalForm");
            navigation.closeDrawer();
          },
        },
        {
          id: "evalution-forms",
          role: "evalution_forms",
          title: translate("Evalution Forms"),
          action: () => {
            navigation.navigate("EvalutionForms");
            navigation.closeDrawer();
          },
        },
        {
          id: "create-vessel-form",
          role: "create_vessel_form",
          title: translate("CreateVesseltitle"),
          action: () => {
            navigation.navigate("DynamicFormView", {
              slug: "vessel_custom_form",
            });
            navigation.closeDrawer();
          },
        },
        {
          id: "voyage-reporting-form/audit-report",
          role: "audit_report",
          title: translate("sidebarauditReport"),
          action: () => {
            navigation.navigate("AuditForm");
            navigation.closeDrawer();
          },
        },
        {
          id: "voyage-reporting-form/inspection-report",
          role: "inspection_report",
          title: translate("sidebarinspectionReport"),
          action: () => {
            navigation.navigate("InspectionForm");
            navigation.closeDrawer();
          },
        },
        {
          id: "voyage-reporting-form/deficiency-forms",
          role: "deficiency_forms",
          title: translate("sidebardeficiencyForms"),
          action: () => {
            navigation.navigate("DeficiencyFormlList");
            navigation.closeDrawer();
          },
        },
        {
          id: "voyage-reporting-form/drills-report",
          role: "drill_forms",
          title: translate("sidebardrillsReport"),
          action: () => {
            navigation.navigate("DrillReportForm");
            navigation.closeDrawer();
          },
        },
        {
          id: "voyage-reporting-form/voyage-report",
          role: "voyage_forms",
          title: translate("sidebarvoyageReport"),
          action: () => {
            navigation.navigate("VoyageForm");
            navigation.closeDrawer();
          },
        },
      ],
      action: () => {
        // navigation.navigate("TermsAndConditions");
        navigation.closeDrawer();
      },
    },

    {
      id: "how-to-videos",
      role: "how_to_videos",
      title: translate("Howtovideostitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="How-to-Video"
            style={styles.listIconSty}
          />
        </View>
      ),
      action: () => {
        navigation.navigate("HowtoVideo");
        navigation.closeDrawer();
      },
    },

    {
      id: "eLOG-preference",
      role: "elog_preference_gear_types",
      title: translate("ELOGPreferencetitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="ElogPreference"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "ports",
          role: "ports",
          title: translate("sidebarports"),
          action: () => {
            navigation.navigate("Ports");
            navigation.closeDrawer();
          },
        },
      ],
      action: () => {
        // navigation.navigate("FAQs");
        navigation.closeDrawer();
      },
    },
    {
      id: "role-manage",
      role: "role",
      title: translate("rolemanagetitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="Analytics"
            style={styles.listIconSty}
          />
        </View>
      ),
      action: () => {
        navigation.navigate("RoleManagement");
        navigation.closeDrawer();
      },
    },
    {
      id: "configuration",
      role: "configuration",
      title: translate("Configurationtitle"),
      icon: (
        <View style={styles.listIconView}>
          <CustomIcon
            size={iconSize}
            name="Configuration"
            style={styles.listIconSty}
          />
        </View>
      ),
      submenu: [
        {
          id: "position",
          role: "positions",
          title: translate("sidebarposition"),
          action: () => {
            navigation.navigate("ManagePostion");
            navigation.closeDrawer();
          },
        },
        {
          id: "department",
          role: "departments",
          title: translate("sidebardepartment"),
          action: () => {
            navigation.navigate("ManageDepartment");
            navigation.closeDrawer();
          },
        },
        {
          id: "location",
          role: "locations",
          title: translate("sidebarlocation"),
          action: () => {
            navigation.navigate("ManageLocation");
            navigation.closeDrawer();
          },
        },
        {
          id: "notification",
          role: "notification",
          title: translate("sidebarnotification"),
          action: () => {
            navigation.navigate("ManageNotification");
            navigation.closeDrawer();
          },
        },
      ],
      action: () => {
        navigation.navigate("Configuration");
        navigation.closeDrawer();
      },
    },
    {
      id: "signature",
      role: "signature",
      title: "Signature",
      icon: (
        <View style={styles.listIconView}>
          <Aicon size={iconSize} name="form" style={styles.listIconSty} />
        </View>
      ),
      action: () => {
        navigation.navigate("Signature");
        navigation.closeDrawer();
      },
    },
  ];
  //End

  const updateSideBar = [
    {
      id: 17,
      role: "logout",
      title: translate("topbarlogout"),
      icon: (
        <View style={styles.listIconView}>
          <Aicon size={iconSize} name="logout" style={[styles.listIconSty]} />
        </View>
      ),
      action: () => {
        setCAlert({
          title: "Confirm",
          message: "Are you sure you want to logout?",
          showAlert: true,
          type: "logout",
        });
      },
    },
  ];

  // Get Menu List for HSEQ module
  const getMenus = async () => {
    const url = BaseSetting.endpoints.safteyFormList + `?allData=1`;
    try {
      const res = await getApiData(url, "GET");
      setSafetyMenusUpdated(true);
      if (res.status) {
        setSafetyMenus(res.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getMenus();
    setSelectedItemIndex(null);
  }, []);

  const logOutNew = async () => {
    setButtonLoader(true);
    // setCAlert(false);
    await getApiData(
      BaseSetting.endpoints.logout,
      "POST",
      { token: fcmToken },
      "",
      true
    )
      .then(async (resp) => {
        if (resp?.status) {
          setButtonLoader(false);
          setCAlert(false);
          logout();
          signOut();
          navigation.replace("Login");
        } else {
          setButtonLoader(false);
        }
      })
      .catch((err) => {});
  };

  const handlePress = (item, index) => {
    if (clicked === index) {
      setClickID(null);
    } else {
      setClickID(index);
    }
    if (item.submenu) {
      if (item.id === open) {
        setOpen(null); // close the submenu if it's already open
      } else {
        setOpen(item.id); // open the clicked submenu
      }
    } else if (item.title === "Switch") {
      setIsLightMode(isLightMode === "dark" ? "light" : "dark");
    } else {
      item.action();
      setIsClickedEvent(true);
      setOpen(null); // close the submenu if a different item was clicked
      setSelectedItemIndex(null);
    }
    // setSelectedItemIndex(index);
  };

  // Remove Index from Array...
  function removeElementsByIndex(array, indexesToRemove) {
    // Sort the indexesToRemove array in descending order to avoid index shifting
    indexesToRemove.sort((a, b) => b - a);
    // Remove elements by index using splice
    indexesToRemove.forEach((index) => {
      array.splice(index, 1);
    });
    return array;
  }

  const renderItem = (menus) => {
    if (!isEmpty(userPermission)) {
      const index = userPermission.findIndex(
        (li) => li === "logout" || li === "light_mode"
      );
      if (index === -1) {
        userPermission.splice(0, 0, "logout", "light_mode");
      }
    }
    const nArray =
      (subscriptionArr && String(subscriptionArr).split(",")) || [];
    const commonArray = menus.filter((val) => nArray.includes(val.role));
    const menuArray = !isEmpty(commonArray) ? commonArray : menus;
    const newArr = menuArray.concat(updateSideBar);
    let updatedArr = [];
    if (isOnline) {
      updatedArr = newArr;
    } else {
      const signatureIndex = newArr.findIndex((li) => li.role === "signature");
      const lmsIndex = newArr.findIndex(
        (li) => li.role === "learning_management"
      );
      const formIndex = newArr.findIndex((li) => li.role === "forms");
      updatedArr = removeElementsByIndex(newArr, [
        lmsIndex,
        signatureIndex,
        formIndex,
      ]); // For Offline Remove data from Array.
    }
    return updatedArr.map((item, index) => {
      // Here we check if key Editor the we get the menus
      if (item.id === "hseq_sms" && !isEmpty(safetymenus)) {
        safetymenus.map((data) => {
          const haveMenu = item.submenu.findIndex(
            (i) => i.key === `sms-menu/${data.id}`
          );
          if (haveMenu < 0) {
            item.submenu.push({
              id: `sms-menu/${data.id}`,
              title: data.menu_name,
              role: "safety_management_forms",
              action: () => {
                navigation.navigate("SmsMenu", { id: data.id });
                navigation.closeDrawer();
              },
            });
          }
        });
      }
      const fIndex = userPermission.find((li) => li === item.role);

      return (
        <View key={item.id}>
          {fIndex === item?.role && fIndex && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  selectedItemIndex === index ? BaseColors.white10 : null,
              }}
              onPress={(index) => {
                // setSelectedItemIndex(index);
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={clickedEvent}
                onPress={() => {
                  setSelectedItemIndex(index);
                  setTimeout(() => {
                    handlePress(item, index);
                  }, 199);
                }}
                style={[styles.itemContainer]}
              >
                <View style={styles.listItem}>
                  <TouchableOpacity
                    disabled={clickedEvent}
                    activeOpacity={0.7}
                    onPress={() => {
                      handlePress(item);
                    }}
                  >
                    {item.icon}
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.listItemTxt}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View>
                {item.submenu && (
                  <CustomIcon
                    style={styles.subIconSty}
                    name={clicked === index ? "up" : "Down-Vector"}
                    size={
                      clicked === index
                        ? isTabletDevice
                          ? 17
                          : 13
                        : isTabletDevice
                        ? 15
                        : 10
                    }
                    onPress={() => {
                      handlePress(item);
                      if (clicked === index) {
                        setClickID(null);
                      } else {
                        setClickID(index);
                      }
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
          {item.submenu && isOpen(item.id) && (
            <FlatList
              data={item.submenu}
              bounces={false}
              key={`${item.id}`}
              renderItem={({ item: submenuItem }) => {
                const submenuRole = userPermission.find(
                  (li) => li === submenuItem.role
                );
                if (submenuRole === submenuItem?.role) {
                  return (
                    <TouchableOpacity
                      disabled={clickedEvent}
                      onPress={() => {
                        submenuItem.action();
                        setIsClickedEvent(true);
                      }}
                    >
                      <View
                        style={{
                          paddingLeft: isTabletDevice
                            ? Dimensions.get("window").width * 0.08
                            : Dimensions.get("window").width / 8,
                          justifyContent: "flex-start",
                          paddingTop: Dimensions.get("window").height / 100,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {submenuItem.component ? (
                          submenuItem.component
                        ) : (
                          <>
                            <CustomIcon
                              name="information"
                              color="white"
                              size={7}
                            />
                            <Text
                              style={{
                                color: BaseColors.white,
                                paddingLeft: 10,
                                fontSize: isTabletDevice ? 17 : null,
                              }}
                            >
                              {submenuItem.title}
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(submenuItem) => submenuItem.id.toString()}
            />
          )}
        </View>
      );
    });
  };

  useEffect(() => {
    if (!isFocused) {
      setTimeout(() => {
        setIsClickedEvent(false);
      }, 200);
    }
  }, [isFocused]);

  function FocusAwareStatusBar(props) {
    return isFocused ? <StatusBar {...props} /> : null;
  }
  const height = getStatusBarHeight();
  return (
    <>
      <FocusAwareStatusBar />
      <View
        style={{
          backgroundColor: colors.colors.white,
          paddingTop: isTabletDevice ? 20 : 0,
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingTop: isTabletDevice ? 0 : height / 2,
          }}
        >
          <Image
            source={
              userData?.company_logo_url
                ? { uri: userData?.company_logo_url }
                : Images.logo
            }
            style={styles.profilePic}
            resizeMode="contain"
          />
          <Text
            style={{
              paddingVertical: isTabletDevice ? 20 : 10,
              fontSize: isTabletDevice ? 21 : 16,
              textAlign: "center",
              width: "90%",
              color: colors.colors.textColor,
            }}
            numberOfLines={1}
          >
            {userData?.company_name || ""}
          </Text>
          {isDemo ? (
            <View style={{ backgroundColor: "#FFCBCB", marginVertical: 5 }}>
              <Text
                style={{
                  paddingVertical: isTabletDevice ? 20 : 5,
                  paddingHorizontal: 10,
                  fontSize: isTabletDevice ? 18 : 14,
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#FF0000",
                }}
              >
                Demo
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: BaseColors.primary }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.colors.white,
          // overflow: "hidden",
        }}
      >
        <ScrollView
          bounces={false}
          style={{
            opacity: 5,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            // borderRadius: 30,
            backgroundColor: colors.colors.drawerPrimary,
            height: "100%",
          }}
        >
          <View style={styles.listWrapper}>{renderItem(drawerData)}</View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
