/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useReducer, useEffect} from 'react';
import {Platform, View, Text, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  // BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import {EventRegister} from 'react-native-event-listeners';
import SplashScreen from '../screens/SplashScreen';
import {NotificationContext, NoInternet} from '../components';
import RemotePushController from '../components/Common/RemotePushController';
import notificationReducer from '../redux/reducers/notificationReducer';
import {store} from '../redux/store/configureStore';
import AuthAction from '../redux/reducers/auth/actions';
import {BaseColors, DarkBaseColor} from '../config/theme';
import {navigationRef} from './NavigationService';
import Intro from '../screens/Intro';
import Dashbaord from '../screens/Dashboard';
import ForgotPassword from '../screens/ForgotPassword';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideDrawer from './SideDrawer';
import {CustomIcon} from '../config/LoadIcons';
import SignIn from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import ScheduleTrip from '../screens/ScheduleTrip/ScheduleTrip';
import OfflineMyTrip from '../screens/OfflineMyTrip/OfflineMyTrip';
import ScheduleForm from '../screens/ScheduleTrip/ScheduleForm';
import Ports from '../screens/Ports/Ports';
import PortsForm from '../screens/Ports/PortsForm';
import Configuration from '../screens/Configuration';
import PersonalCertificates from '../screens/PersonalCertificates/PersonalCertificates';
import PersonalCertificatesForm from '../screens/PersonalCertificates/PersonalCertificatesForm';
import TrainingTrackerForm from '../screens/TrainingTracker/TrainingTrackerForm';
import DrillTrackerForm from '../screens/DrillTracker/DrillTrackerForm';
import TrainingTracker from '../screens/TrainingTracker/TrainingTracker';
import DrillTracker from '../screens/DrillTracker/DrillTracker';
import Vessels from '../screens/Vessels/Vessels';
import BottomTabBar from './BottomTabbar';
import CreateVesselForm from '../screens/Vessels/CreateVesselForm';
import VesselsViewComponent from '../components/VesselsViewComponent';
import SafteyDocViewPage from '../screens/SafteyDocViewPage';
import SeaTimeTracker from '../screens/SeaTimeTracker';
import ActivityLog from '../screens/ActivityLog';
import ManagePosition from '../screens/ManagePostion';
import addPositionList from '../screens/ManagePostion/addPositionList';
import MyTrip from '../screens/MyTrip/Mytrip';
import VesselType from '../screens/VesselType/VesselType';
import FisheriesElog from '../screens/FisheriesElog';
import Notification from '../screens/Notification';
import Drills from '../screens/Drills/Drills';
import ManageDepartment from '../screens/Manage Department';
import ManageLocation from '../screens/ManageLocation';
import AddDepartment from '../screens/Manage Department/AddDepartment';
import AddLocation from '../screens/ManageLocation/AddLocation';
import UserManagement from '../screens/UserManagement';
import UserForm from '../screens/UserManagement/UserForm';
import VoyageReporting from '../screens/VoyageReporting/index';
import Deficiencies from '../screens/Deficiencies/index';
import RoleManagement from '../screens/RoleManagement/index';
import GeneralForms from '../screens/GeneralForms/index';
import Audit from '../screens/Audit/Audit';
import Inspection from '../screens/Inspection/Inspection';
import CategorySchedule from '../screens/CategorySchedule/CategorySchedule';
import HowtoVideo from '../screens/HowtoVideo';
import DeficiencyView from '../screens/DeficiencyView/index';
import MytripDetail from '../screens/MyTrip/MytripDetail';
import UserDetailView from '../screens/UserManagement/UserDetailView';
import VesselTypeForm from '../screens/VesselType/VesselTypeForm';
import RoleManagementForm from '../screens/RoleManagement/RoleManagementForm';
import SafteyForm from '../screens/SafteyForms/SafteyForm';
import GoalForm from '../screens/Goals/GoalForm';
import AddMenuForm from '../screens/SafteyForms/AddMenuForm';
import AddCategoryForm from '../screens/SafteyForms/AddCategoryForm';
import VesselTypesForm from '../screens/VesselType/VesselTypeForm';
import AuditForm from '../screens/AuditForms/AuditForm';
import SmsMenu from '../screens/MenuForm/SmsMenu';
import InspectionForm from '../screens/InspectionForm/InspectionForm';
import DrillReportForm from '../screens/DrillsReportForm/DrillReportForm';
import VoyageForm from '../screens/VoyageForms/VoyageForm';
import CreateCategoryForm from '../screens/CreateCategoryForm';
import ManageNotification from '../screens/ManageNotification';
import SmsEditor from '../screens/SafteyManagementSystem/SmsEditor';
import SmsTitle from '../screens/SmsTitle.js';
import ManageHeader from '../screens/ManageHeader';
import SafetyDocEdit from '../screens/SafetyDocEditPage';
import CustomeForm from '../screens/CustomeForm/CustomeForm';
import AddDeficiencies from '../screens/Deficiencies/AddDeficiency';
import AddFisheriesForm from '../screens/FisheriesElog/AddFisheriesForm';
import AddInactivityReport from '../screens/InactivityReport/AddInacivityReport';
import AddDrills from '../screens/Drills/AddDrills';
import AddAuditForm from '../screens/Audit/AddAuditForm';
import AddInspection from '../screens/Inspection/AddInspection';
import AddVoyageReporting from '../screens/VoyageReporting/AddVoyageReporting';
import AddMenuForms from '../screens/MenuForm/AddMenuForm';
import AddCategorySchedule from '../screens/CategorySchedule/AddCategorySchedule';
import AddTrip from '../screens/MyTrip/AddTrip';
import DeficiencyFormList from '../screens/DeficiencyFormList/index';
import ViewWorkingHours from '../screens/ViewWorkingHours';
import UserCalnderList from '../screens/ViewWorkingHours/UserCalenderList';
import DynamicFormView from '../screens/DynamicFormView';
import AddVesselForm from '../screens/AddVesselForm';
import AnnouncemetData from '../screens/Announcements/index';
import HistoryModal from '../screens/Audit/HistoryModal';
import Reason from '../screens/RevertModal/Reason';
import RevertReasonModal from '../screens/RevertModal/RevertReasonModal';
import RevertModal from '../screens/RevertModal/RevertModal';
import AgreementDetails from '../screens/AgreementDetails/AgreementDetails';
import UserManuals from '../screens/UserModules/UserManuals';
import ExportList from '../screens/ExportList/ExportList';
import SubScription from '../screens/SubScription/SubScription';
import ShowSubscriptionList from '../screens/SubScription/ShowSubscriptionList';
import MyEvaluations from '../screens/MyEvaluations';
import Goals from '../screens/Goals';
import QuizDetails from '../screens/QuizDetails/QuizDetails';
import {Dimensions} from 'react-native';
import PerformanceEvaluations from '../screens/PerformanceEvaluations/PerformanceEvaluations';
import CourseQuiz from '../screens/QuizDetails/CourseQuiz';
import AddEvalutionForm from '../screens/PerformanceEvaluations/AddEvalutionForm';
import AddGoalList from '../screens/PerformanceEvaluations/AddGoalList';
import AddGoal from '../screens/Goals/AddGoal';
import GoalView from '../screens/GoalView/GoalView';
import ComplienceTab from '../screens/ComplianceDashboard/ComplieTabList';
import VesselsDashTab from '../screens/VesselDashboard/VesselDashboardTab';
import MapTabList from '../screens/MapDashboard/MapTabList';
import PersonnelDashboard from '../screens/PersonnalDashboard/PersonnalDashboard';
import LMSDashboard from '../screens/LMSDashboard/LMSDashboard';
import HSEQTabList from '../screens/HseqDashboard/HseqDashboardList';
import CourseStructure from '../screens/CourseStructure/CourseStructure';
import LMSCourseTab from '../screens/LMSCourse/LMSCourseTab';
import AddSectionModal from '../screens/CourseStructure/AddSectionModal';
import LMSCourseDetail from '../screens/LMSCourseDetail/LMSCourseDetail';
import LessonEdit from '../screens/LessonEdit';
import TrainingMetrix from '../screens/TrainingMetrix/TrainingMetrix';
import MyLearning from '../screens/Mylearning/Mylearning';
import AllCourse from '../screens/AllCourse/AllCourse';
import MyLearningPage from '../screens/MyLearningPage';
import LMSCoursePreview from '../screens/LMSCoursePreview';
import ModuleDetails from '../screens/ModuleDetails/ModuleDetails';
import MarathonDetails from '../screens/MarathonDetails/MarathonDetails';
import QuizQuestion from '../screens/LMSquiz/QuizQuestion';
import MoreDetailQuiz from '../screens/LMSquiz/MoreDetailQuiz';
import AddQuiz from '../screens/QuizDetails/AddQuiz';
import SignatureTab from '../screens/Signature/SignatureTab';
import CommonVesselForm from '../screens/CommonVesselForm';
import ViewGoalForm from '../screens/Goals/ViewGoalForm';
import EvalutionForm from '../screens/EvalutionForm.js/EvalutionForm';
import SignatureForm from '../screens/Signature/SignatureForm';
import Syncronize from '../screens/Syncronize/Syncronize';
import OfflineUserManagement from '../screens/OfflineUserManagement/OfflineUserManagement';
import OfflineScheduleTrip from '../screens/OfflineScheduleTrip/OfflineScheduleTrip';
import OfflineVesselType from '../screens/OfflineVesselType/OfflineVesselType';
import OfflineVesssel from '../screens/OfflineVessels/OfflineVessels';
import OfflineDrills from '../screens/OfflineDrills/OfflineDrills';
import OfflineDeficiencies from '../screens/OfflineDeficiencies/OfflineDeficiencies';
import OfflinePort from '../screens/OfflinePort/OfflinePort';
import OfflineRoleManagement from '../screens/OfflineRoleManagement/OfflineRoleManagement';
import OfflinePosition from '../screens/OfflinePosition/OfflinePosition';
import OfflienDepartment from '../screens/OfflineDepartment/OfflineDepartment';
import OfflienLocation from '../screens/OfflineLocation/OfflineLocation';
import OfflineManageNotification from '../screens/OfflineManageNotification/OfflineManageNotification';
import OfflineActivityLog from '../screens/OfflineActivityLog/OfflineActivityLog';
import OfflineHowtoVideo from '../screens/OfflineHowToVideo/OfflineHowToVideo';
import OfflineTripForm from '../screens/OfflineScheduleTrip/OfflineTripForm';
import OfflineDeficiencyList from '../screens/OfflineDeficiencyList/OfflineDeficiencyList';
import OfflineSafteyForm from '../screens/OfflineSafetyForm/OfflineSafetyForm';
import OfflineAuditReport from '../screens/OfflineAuditReport/OfflineAuditReport';
import OfflineAudit from '../screens/OfflineAudit/OfflineAudit';
import OfflineInspection from '../screens/OfflineInspection/OfflineInspection';
import OfflineAddAuditForm from '../screens/OfflineAudit/OfflineAddAuditForm';
import OfflineTimeTracker from '../screens/offlineTimeTracker/OfflineTimeTracker';
import OfflineTrainingTracker from '../screens/OfflineTrainingTracker/OfflineTrainingTracker';
import OfflineVoyageReporting from '../screens/OfflineVoyageReporting/OfflineVoyageReporting';
import OfflineAddVoage from '../screens/OfflineVoyageReporting/OfflineAddVoyage';
import OfflineAddInspectionForm from '../screens/OfflineInspection/OfflineAddInspectionForm';
import OfflineCertificate from '../screens/OfflineCertificate/OfflineCertificate';
import OffllineSmsEditor from '../screens/OfflineSmsEditor/OfflineSmsEditor';
import OfflineVesselsView from '../components/OfflineVesselView';
import OfflineTripDetail from '../screens/OfflineMyTrip/OfflineTripDetail';
import OfflineScheduleForm from '../screens/OfflineScheduleTrip/OfflineScheduleForm';
import OfflineCategorySchedule from '../screens/OfflineCategorySchedule/OfflineCategorySchedule';
import OfflineAddCategorySchedule from '../screens/OfflineCategorySchedule/OfflineAddCategorySchedule';
import OfflineSafteyDocViewPage from '../screens/OfflineSafeDocViewPage/OfflineSafeDocViewPage';
import OfflineSmsMenu from '../screens/OfflineMenuForm/OfflineSmsMenu';
import OfflineAddMenuForms from '../screens/OfflineMenuForm/OfflineAddMenuForm';
import OfflineAddVoayegTrip from '../screens/OfflineMyTrip/OfflineAddVoyageTrip';
import OfflineInspectionForm from '../screens/OfflineInspectionForm/OfflineInspectionForm';
import OfflineDrillReportForm from '../screens/OfflineDrillReportForm/OfflineDrillReportForm';
import OfflineVoyageForm from '../screens/OfflineVoyageForm/OfflineVoyageForm';
import OfflineDrillTracker from '../screens/OfflineDrillTracker/OfflineDrillTracker';
import OfflineProfile from '../screens/OfflineProfile';
import OfflineNotifications from '../screens/OfflineNotifications/OfflineNotifications';
import OfflineTripDashboard from '../screens/OfflineTripDashboard/OfflineTripDashboard';
import OfflineVesselDashboard from '../screens/OfflineVesselDashboard/OfflineVesselDashboard';
import OfflineHseqDashboard from '../screens/OfflineHseqDashboard/OfflineHseqDashboard';
import OfflineLmsDashboard from '../screens/OfflineLmsDashboard/OfflineLmsDashboard';
import OfflinePersonnelDashboard from '../screens/OfflinePersonnelDashboard/OfflinePersonnelDash';
import AutoLogout from '../components/AutoLogout/AutoLogout';
// import BottomTabBar from './BottomTabBar';

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === 'ios';

function App() {
  const dispatch = useDispatch();
  const {setBaseColor, setDarkmode, setActiveScreen} = AuthAction;
  const {isOnline} = useSelector(state => state.offline);
  const [Notifystate, dispatchState] = useReducer(
    notificationReducer,
    intitialNotificationState,
  );
  const notiValue = useMemo(() => {
    return {Notifystate, dispatchState};
  }, [Notifystate, dispatchState]);

  const [darkApp, setDarkApp] = useState(null);

  useEffect(() => {
    const initialDarkmode = store.getState().auth.darkmode;
    setDarkApp(initialDarkmode);
  }, []);

  useEffect(() => {
    const eventListener = EventRegister.addEventListener(
      'changeAppTheme',
      data => {
        setDarkApp(data);
        dispatch(setDarkmode(data));
      },
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  function getTheme() {
    return {
      ...DefaultTheme,
      colors: darkApp ? {...DarkBaseColor} : {...BaseColors},
    };
  }

  const appTheme = getTheme();

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const HomeStack = createStackNavigator();
  const FisheryStack = createStackNavigator();
  const NotificationStack = createStackNavigator();
  const ProfileStack = createStackNavigator();

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Dashbaord}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };

  const FisheryStackNavigator = () => {
    return (
      <FisheryStack.Navigator>
        <FisheryStack.Screen
          name="announcemet"
          component={AnnouncemetData}
          options={{headerShown: false, headerTransparent: ''}}
        />
      </FisheryStack.Navigator>
    );
  };

  const NotificationStackNavigator = () => {
    return (
      <NotificationStack.Navigator>
        <NotificationStack.Screen
          name="Notification"
          component={isOnline ? Notification : OfflineNotifications}
          options={{headerShown: false}}
        />
      </NotificationStack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </ProfileStack.Navigator>
    );
  };

  const BottomTabsNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={'Home'}
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
        <Tab.Screen
          name="FisheryStackNavigator"
          component={FisheryStackNavigator}
        />
        <Tab.Screen
          name="NotificationStackNavigator"
          component={NotificationStackNavigator}
        />
        <Tab.Screen
          // options={{ tabBarHideOnKeyboard: true }}
          name="ProfileStackNavigator"
          component={ProfileStackNavigator}
        />
      </Tab.Navigator>
    );
  };

  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="BottomTabsNavigator"
      detachInactiveScreens={IOS ? true : false}
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
        drawerStyle: {width: '80%'},
      }}
      drawerContent={props => <SideDrawer {...props} />}
      defaultStatus="closed">
      <Drawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
    </Drawer.Navigator>
  );

  return (
    <NotificationContext.Provider value={notiValue}>
      <AutoLogout>
        <RemotePushController />
        <NavigationContainer ref={navigationRef} theme={appTheme}>
          <Stack.Navigator
            initialRouteName={'SplashScreen'}
            detachInactiveScreens={IOS ? true : false}
            screenOptions={{
              animationEnabled: true,
              gestureEnabled: IOS ? true : false,
            }}>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false, animationEnabled: false}}
            />
            <Stack.Screen
              name="Intro"
              component={Intro}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="Dashbaord"
              component={DrawerNavigator}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
                animationEnabled: false,
                // gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: false,
                animationEnabled: false,
                // gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={isOnline ? Profile : OfflineProfile}
              options={{
                headerShown: false,
                animationEnabled: false,
                // gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ScheduleTrip"
              component={isOnline ? ScheduleTrip : OfflineScheduleTrip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyTrip"
              component={isOnline ? MyTrip : OfflineMyTrip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ScheduleForm"
              component={isOnline ? ScheduleForm : OfflineScheduleForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Ports"
              component={isOnline ? Ports : OfflinePort}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PortsForm"
              component={PortsForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Configuration"
              component={Configuration}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SeaTimeTracker"
              component={isOnline ? SeaTimeTracker : OfflineTimeTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PersonalCertificates"
              component={isOnline ? PersonalCertificates : OfflineCertificate}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PersonalCertificatesForm"
              component={PersonalCertificatesForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AllCourse"
              component={AllCourse}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TrainingTrackerForm"
              component={TrainingTrackerForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DrillTracker"
              component={isOnline ? DrillTracker : OfflineDrillTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DrillTrackerForm"
              component={DrillTrackerForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TrainingTracker"
              component={isOnline ? TrainingTracker : OfflineTrainingTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserManuals"
              component={UserManuals}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SubScription"
              component={SubScription}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ShowSubscriptionList"
              component={ShowSubscriptionList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ExportList"
              component={ExportList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Vessels"
              component={isOnline ? Vessels : OfflineVesssel}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VesselType"
              component={isOnline ? VesselType : OfflineVesselType}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VesselTypeForm"
              component={VesselTypeForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Drills"
              component={isOnline ? Drills : OfflineDrills}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddDrills"
              component={AddDrills}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Audit"
              component={isOnline ? Audit : OfflineAudit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ModuleDetails"
              component={ModuleDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MarathonDetails"
              component={MarathonDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddAuditForm"
              component={isOnline ? AddAuditForm : OfflineAddAuditForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddTrip"
              component={isOnline ? AddTrip : OfflineAddVoayegTrip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Inspection"
              component={isOnline ? Inspection : OfflineInspection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddInspection"
              component={isOnline ? AddInspection : OfflineAddInspectionForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CategorySchedule"
              component={isOnline ? CategorySchedule : OfflineCategorySchedule}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddCategorySchedule"
              component={
                isOnline ? AddCategorySchedule : OfflineAddCategorySchedule
              }
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateVesselForm"
              component={CreateVesselForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AgreementDetails"
              component={AgreementDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VesselsViewComponent"
              component={isOnline ? VesselsViewComponent : OfflineVesselsView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoalForm"
              component={GoalForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViewGoalForm"
              component={ViewGoalForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EvalutionForms"
              component={EvalutionForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ActivityLog"
              component={isOnline ? ActivityLog : OfflineActivityLog}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManagePostion"
              component={isOnline ? ManagePosition : OfflinePosition}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageDepartment"
              component={isOnline ? ManageDepartment : OfflienDepartment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageLocation"
              component={isOnline ? ManageLocation : OfflienLocation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPosition"
              component={addPositionList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddDepartment"
              component={AddDepartment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddLocation"
              component={AddLocation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notification"
              component={isOnline ? Notification : OfflineNotifications}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FisheriesElog"
              component={FisheriesElog}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddFisheriesForm"
              component={AddFisheriesForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddInactivityReport"
              component={AddInactivityReport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserManagement"
              component={isOnline ? UserManagement : OfflineUserManagement}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserForm"
              component={UserForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VoyageReporting"
              component={isOnline ? VoyageReporting : OfflineVoyageReporting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Deficiencies"
              component={isOnline ? Deficiencies : OfflineDeficiencies}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddDeficiencies"
              component={isOnline ? AddDeficiencies : OfflineDeficiencyList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DeficiencyView"
              component={DeficiencyView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RoleManagement"
              component={isOnline ? RoleManagement : OfflineRoleManagement}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RoleManagementForm"
              component={RoleManagementForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GeneralForm"
              component={GeneralForms}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HowtoVideo"
              component={isOnline ? HowtoVideo : OfflineHowtoVideo}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserDetailView"
              component={UserDetailView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MytripDetail"
              component={isOnline ? MytripDetail : OfflineTripDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SafteyForm"
              component={isOnline ? SafteyForm : OfflineSafteyForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddMenuForm"
              component={AddMenuForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddCategoryForm"
              component={AddCategoryForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VesselTypesForm"
              component={VesselTypesForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AuditForm"
              component={isOnline ? AuditForm : OfflineAuditReport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InspectionForm"
              component={isOnline ? InspectionForm : OfflineInspectionForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DrillReportForm"
              component={isOnline ? DrillReportForm : OfflineDrillReportForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VoyageForm"
              component={isOnline ? VoyageForm : OfflineVoyageForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddVoyageReporting"
              component={isOnline ? AddVoyageReporting : OfflineAddVoage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateCategoryForm"
              component={CreateCategoryForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageNotification"
              component={
                isOnline ? ManageNotification : OfflineManageNotification
              }
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SmsEditor"
              component={isOnline ? SmsEditor : OffllineSmsEditor}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SafetyEditor"
              component={SafetyDocEdit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SmsTitle"
              component={SmsTitle}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QuizDetails"
              component={QuizDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CourseQuiz"
              component={CourseQuiz}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageHeader"
              component={ManageHeader}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SafteyDocViewPage"
              component={
                isOnline ? SafteyDocViewPage : OfflineSafteyDocViewPage
              }
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SmsMenu"
              component={isOnline ? SmsMenu : OfflineSmsMenu}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddMenuForms"
              component={isOnline ? AddMenuForms : OfflineAddMenuForms}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CustomeForm"
              component={CustomeForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViewWorkingHours"
              component={ViewWorkingHours}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserCalnderList"
              component={UserCalnderList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DeficiencyFormlList"
              component={isOnline ? DeficiencyFormList : OfflineDeficiencyList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DynamicFormView"
              component={isOnline ? DynamicFormView : OfflineTripForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddVesselForm"
              component={AddVesselForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="announcemet"
              component={AnnouncemetData}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HistoryModal"
              component={HistoryModal}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Reason"
              component={Reason}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RevertReasonModal"
              component={RevertReasonModal}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RevertModal"
              component={RevertModal}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PerformanceEvaluations"
              component={PerformanceEvaluations}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyEvaluations"
              component={MyEvaluations}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Goals"
              component={Goals}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CourseStructure"
              component={CourseStructure}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LMSCourseTab"
              component={LMSCourseTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddSectionModal"
              component={AddSectionModal}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LMSCourseDetail"
              component={LMSCourseDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LessonEdit"
              component={LessonEdit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TrainingMetrix"
              component={TrainingMetrix}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyLearning"
              component={MyLearning}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyLearningPage"
              component={MyLearningPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LMSCoursePreview"
              component={LMSCoursePreview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QuizQuestion"
              component={QuizQuestion}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddQuiz"
              component={AddQuiz}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MoreDetailQuiz"
              component={MoreDetailQuiz}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddGoalList"
              component={AddGoalList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddEvalutionForm"
              component={AddEvalutionForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddGoal"
              component={AddGoal}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoalView"
              component={GoalView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ComplianceDashbaord"
              component={ComplienceTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VesselsDashboard"
              component={isOnline ? VesselsDashTab : OfflineVesselDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MapDashboard"
              component={isOnline ? MapTabList : OfflineTripDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PersonnelDashboard"
              component={
                isOnline ? PersonnelDashboard : OfflinePersonnelDashboard
              }
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LMSDashboard"
              component={isOnline ? LMSDashboard : OfflineLmsDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HseqDashboard"
              component={isOnline ? HSEQTabList : OfflineHseqDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signature"
              component={SignatureTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CommonVesselForm"
              component={CommonVesselForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignatureForm"
              component={SignatureForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Syncronize"
              component={Syncronize}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AutoLogout>
    </NotificationContext.Provider>
  );
}

export default App;
