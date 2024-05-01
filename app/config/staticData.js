import moment from 'moment';
import {BaseColors} from './theme';

const currentDate = new Date();
export const selectedCartData = [
  {
    id: 1,
    // label: "Name",
    text: '123456',
    // Detail: "25 Nov 2023",
    status: 'Completed',
    title: [
      {label: 'Name', Detail: 'Rudra'},
      {label: 'Publish Date', Detail: '25 Nov 2023'},
      {label: 'Document Cerification', Detail: 'AQ!'},
    ],
  },
  {
    id: 2,
    // label: "Name",
    text: '23456',
    // Detail: "25 Nov 2023",
    status: 'Cancelled',
    title: [
      {label: 'Name', Detail: 'John'},
      {label: 'Publish Date', Detail: '29 Nov 2023'},
      {label: 'Document Cerification', Detail: 'AC!'},
    ],
  },
  {
    id: 2,
    // label: "Name",
    text: '23456',
    // Detail: "25 Nov 2023",
    status: 'Cancelled',
    title: [
      {label: 'Name', Detail: 'John'},
      {label: 'Publish Date', Detail: '29 Nov 2023'},
      {label: 'Document Cerification', Detail: 'AC!'},
    ],
  },
];

export const activeSubScriptionoptions = [
  {
    id: 9999,
    key: 'oceanaut',
    label: 'Oceanaut Basics',

    role: 'oceanaut basic',
    title: 'Oceanaut Basics', // for activity tree select we add the options
    value: 'Oceanaut Basic', // for activity tree select we add the options
  },
  {
    key: 'dashboard',
    label: 'dashboard.title',

    role: 'dashboard',
    title: 'Dashboard', // for activity tree select we add the options
    value: 'dashboard', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'agreements', url: 'cms/cms-list'},
      {name: 'subscriptions', url: 'payment/get-active-subscription'},
      {name: 'user_menuals', url: 'admin/user-manuals'},
      {name: 'exports', url: 'user/export-list?allData=1&isOffline=1'},
      {
        name: 'critical_notifications',
        url: 'common/get-notification?type=critical&status=0',
      },
      {
        name: 'normal_notifications',
        url: 'common/get-notification?type=normal&status=0',
      },
      {
        name: 'background-images',
        url: 'admin/get-background-image',
      },
      {
        name: 'static_dashboard_vessels',
        url: 'static-dashboard/get-vessel-data',
      },
      {
        name: 'static_dashboard_deficiency',
        url: 'vessels/deficiency-count',
      },
      {
        name: 'static_dashboard_voyage_time',
        url: 'static-dashboard/get-voyage-time',
      },
      {
        name: 'static_dashboard_out_of_service',
        url: 'static-dashboard/get-off-service-vessel-data',
      },
      {
        name: 'static_dashboard_voyage_reporting',
        url: 'static-dashboard/get-voyage-reporting-data',
      },
      {
        name: 'static_dashboard_trip',
        url: 'static-dashboard/get-trip-data',
      },
      {
        name: 'static_dashboard_audit',
        url: 'vessels/audit-count?category_type=audit',
      },
      {
        name: 'static_dashboard_inspection',
        url: 'vessels/audit-count?category_type=inspection',
      },
      {
        name: 'static_dashboard_drills',
        url: 'vessels/audit-count?category_type=drills',
      },
      {
        name: 'static_dashboard_certificate',
        url: 'vessels/vessel-certificate-count',
      },
      {
        name: 'static_dashboard_vessels_count',
        url: 'vessels/vessels-count',
      },
      {
        name: 'static_dashboard_vessels_audit_break',
        url: 'vessels/audit-break?category_type=audit',
      },
      {
        name: 'static_dashboard_vessels_inspection_break',
        url: 'vessels/audit-break?category_type=inspection',
      },
      {
        name: 'static_dashboard_vessels_drills_break',
        url: 'vessels/audit-break?category_type=drills',
      },
      {
        name: 'dynamic_dashboard_compliance',
        url: 'dashboard-master/get-dynamic-data?category=compliance&offline=1',
      },
      {
        name: 'dynamic_dashboard_vessels',
        url: 'dashboard-master/get-dynamic-data?category=vessels&offline=1',
      },
      {
        name: 'dynamic_dashboard_hseq',
        url: 'dashboard-master/get-dynamic-data?category=hseq&offline=1',
      },
      {
        name: 'static_dashboard_hseq_documents',
        url: 'hseq-dashboard/get-document-data',
      },
      {
        name: 'static_dashboard_hseq_reporting',
        url: 'hseq-dashboard/get-forms-reporting-data',
      },
      {
        name: 'static_dashboard_hseq_search_documents',
        url: 'hseq-dashboard/get-search-documents?allData=1',
      },

      {
        name: 'static_dashboard_hseq_menu_card',
        url: 'hseq-dashboard/get-dynamic-menu-data?allData=1',
      },
      {
        name: 'static_dashboard_hseq_menu_id',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },
      {
        name: 'user_details',
        url: 'user/views?id=',
        isUserId: true,
      },
      {
        name: 'personnel_static_certificates',
        url: 'personnel-certificates/list?member_id=',
        isUserId: true,
      },
      {
        name: 'personnel_static_certificates_chart',
        url: 'static-dashboard/get-personnel-certificate-count?user_id=',
        isUserId: true,
      },
    ],
    children: [
      {
        key: 'dashboard/compliance',
        label: 'dashboard.compliance',
        role: 'view_compliance',
        title: 'View Compliance',
        value: 'View Compliance',
        api_url: [],
        parent_key: 'dashboard',
      },
      {
        key: 'dashboard/vessels',
        label: 'dashboard.manage _vessels',
        role: 'view_vessels',
        title: 'View Vessels',
        value: 'View Vessels',
        api_url: [],
        parent_key: 'dashboard',
      },
      {
        key: 'dashboard/voyages',
        label: 'dashboard.map',
        role: 'view_map',
        title: 'View Map',
        value: 'View Map',
        api_url: [],
        parent_key: 'dashboard',
      },
      {
        key: 'dashboard/personnel',
        label: 'dashboard.personnel',
        role: 'view_personnel',
        title: 'View Personnel',
        value: 'View Personnel',
        api_url: [],
        parent_key: 'dashboard',
      },
      {
        key: 'dashboard/hseq',
        label: 'dashboard.hseq',
        role: 'view_hseq',
        title: 'View HSEQ',
        value: 'View HSEQ',
      },
      {
        key: 'dashboard/lms',
        label: 'dashboard.lms',
        role: 'view_lms',
        title: 'View lms',
        value: 'View lms',
        api_url: [],
        parent_key: 'dashboard',
      },
    ],
  },
  {
    key: 'users',
    label: 'Users',
    role: 'users',
    title: 'Users', // for activity tree select we add the options
    value: 'User', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'users', url: 'user-list/users-list?allData=1'},
      {name: 'userdetail', url: `user/user-detail`},
      {
        name: 'userlist',
        url: `user/role-management-list?allData=1&isOffline=1`,
      },
    ],
    // api_url: "user-list/users-list",
  },
  {
    key: 'Voyage',
    label: 'Trips.title',
    role: 'trips',
    title: 'Voyage', // for activity tree select we add the options
    value: 'Voyage', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'schedule_trip', url: 'trip/trip-list?ready_for_offline=1'},
      {name: 'my_trip', url: 'trip/my-trip-list'},
      {
        name: 'port_of_departure',
        url: 'database-generation/table-data?tableName=mv_port&fields=id,desc_eng',
      },
      {name: 'all_trip_details', url: 'trip/all-trip-data?isOffline=1'},
      {
        name: 'all_voyage_reporting_submited_forms',
        url: 'trip/all-trip-form-json?isOffline=1',
      },
    ],
    children: [
      {
        key: 'schedule-a-voyage',
        label: 'scheduleATrip.title',
        role: 'schedule_trip',
        title: 'Schedule a Voyage', // for activity tree select we add the options
        value: 'Schedule a  Voyage', // for activity tree select we add the options
        api_url: 'trip/trip-list',
        parent_key: 'trips',
      },
      {
        key: 'my-voyage',
        label: 'Mytrip.title',
        role: 'my_trip',
        title: 'My Voyage', // for activity tree select we add the options
        value: 'My Voyage', // for activity tree select we add the options
        api_url: 'trip/my-trip-list',
        parent_key: 'trips',
      },
    ],
  },

  {
    key: 'vessels-management',
    label: 'VesselsManagement.title',
    role: 'vessels_management',
    title: 'Vessel Management', // for activity tree select we add the options
    value: 'Vessel Management', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'vm_vessles_type',
        url: 'vessels-type/vessels-type-list?showAll=1',
      },
      {
        name: 'vessles',
        url: 'vessels/vessel-list',
      },
      {
        name: 'vessels_list',
        url: 'vessels/assign-user?allData=1',
      },
      {
        name: 'drills',
        url: 'vessels/audit-form-list?category_type=drills&isOffline=1',
      },
      {
        name: 'drills_type',
        url: 'custom-category/lists?category_type=drills&isOffline=1',
      },
      {
        name: 'schedule_list',
        url: 'vessels/audit-schedule-list?category_type=drills&isOffline=1&ready_for_offline=1',
      },
      {
        name: 'audit_schedule_list',
        url: 'vessels/audit-schedule-list?category_type=audit&isOffline=1&ready_for_offline=1',
      },
      {
        name: 'inspection_schedule_list',
        url: 'vessels/audit-schedule-list?category_type=inspection&isOffline=1&ready_for_offline=1',
      },
      {
        name: 'category_schedule_list',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },
      {
        name: 'audit_report',
        url: 'vessels/audit-form-list?category_type=audit&isOffline=1',
      },
      {
        name: 'inspection_report',
        url: 'vessels/audit-form-list?category_type=inspection&isOffline=1',
      },
      {
        name: 'punch_list',
        url: 'vessels/punch-list',
      },
      {
        name: 'punch_details',
        url: 'vessels/deficiency-comment-list?allData=1',
      },
      {
        name: 'closed_forms',
        url: 'vessels/offline-closure-form?allData=1',
      },
      {
        name: 'vessel_related_forms_audit_category',
        url: 'custom-category/lists?category_type=audit&isOffline=1',
      },
      {
        name: 'vessel_related_forms_inspect_category',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },
      {
        name: 'audit_vessels_list',
        url: 'vessels/vessel-list?allData=1',
      },
      {
        name: 'vessles_details',
        url: 'vessels/all-vessel',
      },
      {
        name: 'organization_image',
        url: 'common/get-all-images',
      },
    ],
    children: [
      {
        key: 'vessles-type',
        label: 'sidebar.vesselsTypes',
        role: 'vm_vessles_type',
        title: 'Vessel Types', // for activity tree select we add the options
        value: 'Vessel Types', // for activity tree select we add the options
        api_url: 'vessels-type/vessels-type-list?showAll=1',
      },
      {
        key: 'vessels',
        label: 'sidebar.vessels',
        role: 'vessles',
        title: 'Vessels', // for activity tree select we add the options
        value: 'Vessels', // for activity tree select we add the options
        api_url: 'vessels/vessel-list',
      },
      {
        key: 'drills',
        label: 'sidebar.drills',
        role: 'drills',
        title: 'Drills', // for activity tree select we add the options
        value: 'Drills', // for activity tree select we add the options
        api_url: 'custom-category/lists?category_type=drills&isOffline=1',
      },
      {
        key: 'audit-and-inspection',
        label: 'sidebar.auditInspection',
        role: 'audit_and_inspection_report',
        title: 'Audits & Inspections', // for activity tree select we add the options
        value: 'Audits & Inspections', // for activity tree select we add the options
        api_url: 'vessels/audit-form-list?category_type=audit&isOffline=1',
      },
      {
        key: 'punch-list',
        label: 'sidebar.puchList',
        role: 'punch_list',
        title: 'Deficiencies', // for activity tree select we add the options
        value: 'Deficiencies', // for activity tree select we add the options
        api_url: 'vessels/punch-list',
      },
    ],
  },
  {
    key: 'voyage-reporting',
    label: 'VoyageReporting.title',
    role: 'voyage_reporting',
    title: 'Voyage Reporting', // for activity tree select we add the options
    value: 'Voyage Reporting', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'voyage_reporting_list',
        url: 'vessels/voyage-list?allData=1&isOffline=1',
      },
      // {
      //   name: "voyage_categories",
      //   url: "custom-category/lists?category_type=voyage_reporting&isOffline=1",
      // },
    ],
    // api_url: "custom-category/lists?category_type=voyage_reporting&isOffline=1",
  },
  {
    key: 'personnel',
    label: 'personnel.title',
    role: 'personnel',
    title: 'Personnel', // for activity tree select we add the options
    value: 'Personnel', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'sea_time_tracker',
        url: 'trip/sea-time-tracker-lists?isOffline=1',
      },
      {
        name: 'training_tracker',
        url: 'training-tracker/list?isOffline=1',
      },
      {
        name: 'certificates',
        url: 'personnel-certificates/list?isOffline=1',
      },
      {
        name: 'drill_tracker',
        url: 'vessels/drill-tracker-list',
      },
      {
        name: 'view_working_hours',
        url: 'user/user-calender',
        method: 'POST',
        passData: {filterDate: moment(new Date()).format('YYYY-MM-DD')},
      },
    ],
    children: [
      {
        key: 'user-calender',
        label: 'sidebar.viewWorkingHours',
        role: 'view_working_hours',
        title: 'View Working Hours', // for activity tree select we add the options
        value: 'View Working Hours', // for activity tree select we add the options
        //api_url: 'user/user-calender'
      },
      {
        key: 'sea-time-tracker',
        label: 'sidebar.sea_time_tracker',
        role: 'sea_time_tracker',
        title: 'Sea Time Tracker', // for activity tree select we add the options
        value: 'Sea Time Tracker', // for activity tree select we add the options
        api_url: 'trip/sea-time-tracker-lists?isOffline=1',
      },
      {
        key: 'training-tracker',
        label: 'sidebar.training_tracker',
        role: 'training_tracker',
        title: 'Training Tracker', // for activity tree select we add the options
        value: 'Training Tracker', // for activity tree select we add the options
        api_url: 'training-tracker/list?isOffline=1',
      },
      {
        key: 'drill-tracker',
        label: 'sidebar.drill.tracker',
        role: 'drill_tracker',
        title: 'Drill Tracker', // for activity tree select we add the options
        value: 'Drill Tracker', // for activity tree select we add the options
        api_url: 'drill-tracker/list',
      },
      {
        key: 'certificates',
        label: 'sidebar.certificates',
        role: 'certificates',
        title: 'Certificates', // for activity tree select we add the options
        value: 'Certificates', // for activity tree select we add the options
        api_url: 'personnel-certificates/list?isOffline=1',
      },
    ],
  },
  {
    key: 'hseq_sms',
    label: 'hseq.title',
    role: 'hseq',
    title: 'HSEQ', // for activity tree select we add the options
    value: 'HSEQ', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'safety_management',
        url: 'safety-management-system/safety-tree',
      },
      {
        name: 'safety_document_list_viewer',
        url: `safety-management-system/safety-document-list?allData=1&editor=0&isOffline=1`,
      },
      {
        name: 'safety_document_list_editor',
        url: `safety-management-system/safety-document-list?allData=1&editor=1&isOffline=1`,
      },
      {
        name: 'safety_menu_list',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },
      {
        name: 'safety_document_list',
        url: 'safety-management-system/safety-document-data?allData=1&isOffline=1',
      },
      {
        name: 'safety_document_details',
        url: 'safety-management-system/safety-document-all-data',
      },
      {
        name: 'safety_document_view',
        url: 'safety-management-system/get-safety-forms-data',
      },
    ],
    children: [
      {
        key: 'safety-management-system',
        label: 'sidebar.sms_viewer',
        role: 'safety_management',
        title: 'SMS Viewer', // for activity tree select we add the options
        value: 'SMS Viewer', // for activity tree select we add the options
        api_url: '',
      },
      {
        key: 'safety-management-system-editor',
        label: 'sidebar.sms_editor',
        role: 'safety_management_editor',
        title: 'SMS Editor', // for activity tree select we add the options
        value: 'SMS Editor', // for activity tree select we add the options
        api_url: '',
      },
    ],
  },
  {
    key: 'learning_management',
    label: 'LMS.title',
    role: 'learning_management',
    title: 'Learning Management',
    value: 'Learning Management',
    sync_status: 'completed',
    api_url: [],
    children: [
      {
        key: 'manage-categories',
        label: 'sidebar.Manage.categories',
        role: 'manage_categories',
        title: 'Manage Categories',
        value: 'Manage Categories',
      },
      {
        key: 'manage-courses',
        label: 'sidebar.Manage.courses',
        role: 'manage_courses',
        title: 'Manage Courses',
        value: 'Manage Courses',
      },
      {
        key: 'all-courses',
        label: 'sidebar.AllCourses',
        role: 'learning_management',
        title: 'All Courses',
        value: 'All Courses',
      },
      {
        key: 'my-learning',
        label: 'sidebar.MyLearning',
        role: 'learning_management',
        title: 'My Learnings',
        value: 'My Learning',
      },
      {
        key: 'training-metrix',
        label: 'sidebar.Training.Metrix',
        role: 'training_metrix',
        title: 'Training Matrix',
        value: 'Training Matrix',
      },
      {
        key: 'performance-evalution',
        label: 'sidebar.Performance.Evalution',
        role: 'performance_evalution',
        title: 'Performance Evaluations',
        value: 'Performance Evalution',
      },
      {
        key: 'my-evalution',
        label: 'sidebar.MyEvalution',
        role: 'my_evalution',
        title: 'My Evaluations',
        value: 'My Evalution',
      },
      {
        key: 'goal',
        label: 'sidebar.Goal',
        role: 'goal',
        title: 'Goals',
        value: 'Goal',
      },
    ],
  },
  {
    id: 999,
    key: 'activity-logs',
    label: 'ActivityLogs.title',
    role: 'activity_log',
    title: 'Activity Logs', // for activity tree select we add the options
    value: 'Activity Logs', // for activity tree select we add the options
    api_url: [
      {
        name: 'activity_log',
        url: 'user/get-activity?allData=1&isOffline=1',
      },
    ],
  },
  {
    key: 'forms',
    label: 'Forms.title',
    role: 'forms',
    title: 'Forms', // for activity tree select we add the options
    value: 'Forms', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      // trip forms
      {
        name: 'trip_form',
        url: 'custom-forms/get-offline-form?type=schedule_a_trip',
      },

      // Safety forms
      {
        name: 'safety_form_menu',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },

      {
        name: 'safety_form_category',
        url: 'custom-category/lists?category_type=safety_document&allData=1&isOffline=1',
      },

      {
        name: 'safety_form_forms',
        url: 'custom-forms/vessel-forms?category_type=safety_document&allData=1&isOffline=1',
      },

      // Vessel Replated Forms

      {
        name: 'vessel_create_form',
        url: 'custom-forms/get-offline-form?type=vessel_custom_form',
      },

      {
        name: 'vessel_related_forms_audit_category',
        url: 'custom-category/lists?category_type=audit&isOffline=1',
      },

      {
        name: 'vessel_related_forms_audit_forms',
        url: 'custom-forms/vessel-forms?category_type=audit&isOffline=1',
      },

      {
        name: 'vessel_related_forms_audit_vessels',
        url: 'vessel-forms/lists?category_type=audit&offline=1',
      },

      // Inspection Form
      {
        name: 'vessel_related_forms_inspection_category',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },

      {
        name: 'vessel_related_forms_inspection_forms',
        url: 'custom-forms/vessel-forms?category_type=inspection&isOffline=1',
      },

      {
        name: 'vessel_related_forms_inspection_vessels',
        url: 'vessel-forms/lists?category_type=inspection&offline=1',
      },

      // Deficiency Forms

      {
        name: 'vessel_related_forms_deficiency_forms',
        url: 'custom-forms/deficiency-form-list?type=deficiency_form',
      },

      // Drill Report Forms

      {
        name: 'vessel_related_forms_drills_category',
        url: 'custom-category/lists?category_type=drills&isOffline=1',
      },

      {
        name: 'vessel_related_forms_drills_forms',
        url: 'custom-forms/vessel-forms?category_type=drills&isOffline=1',
      },

      {
        name: 'vessel_related_forms_drills_vessels',
        url: 'vessel-forms/lists?category_type=drills&offline=1',
      },

      // Voyage forms

      {
        name: 'vessel_related_forms_voyage_forms_category',
        url: 'custom-category/lists?category_type=voyage_reporting&isOffline=1',
      },

      {
        name: 'vessel_related_forms_voyage_forms_forms',
        url: 'custom-forms/vessel-forms?category_type=voyage_reporting&isOffline=1&ready_for_offline=1',
      },

      {
        name: 'vessel_related_forms_voyage_forms_vessels',
        url: 'vessel-forms/lists?category_type=voyage_reporting&offline=1',
      },

      // Evaluation Forms

      {
        name: 'evaluation_forms_category',
        url: 'custom-category/lists?category_type=evalution&isOffline=1',
      },

      {
        name: 'evaluation_forms_forms',
        url: 'custom-forms/vessel-forms?category_type=evalution&isOffline=1',
      },

      {
        name: 'evaluation_forms_roles',
        url: 'user/evalution-forms-lists?category_type=evalution&isOffline=1',
      },
      // Goal forms
      {
        name: 'goal_forms',
        url: 'custom-forms/deficiency-form-list?type=goal_form',
      },
    ],
    children: [
      {
        key: 'schedule-voyage-form',
        label: 'TripForms.title',
        role: 'trip_form',
        title: 'Voyage Forms', // for activity tree select we add the options
        value: 'Voyage Forms', // for activity tree select we add the options
        api_url: 'custom-forms/custom-form-list',
      },

      {
        key: 'safety-form',
        label: 'safety_forms.title',
        role: 'safety_forms',
        title: 'Safety Forms', // for activity tree select we add the options
        value: 'Safety Forms', // for activity tree select we add the options
        api_url: '',
      },

      {
        key: 'lms-forms',
        label: 'sidebar.lms_forms',
        role: 'lms_forms',
        title: 'LMS Forms', // for activity tree select we add the options
        value: 'LMS Forms', // for activity tree select we add the options
        children: [
          {
            key: 'evalution-forms',
            label: 'sidebar.EvalutionForms',
            role: 'evalution_forms',
            title: 'Evalution Forms', // for activity tree select we add the options
            value: 'Evalution Forms', // for activity tree select we add the options
          },

          {
            key: 'goals-forms',
            label: 'sidebar.Goal.forms',
            role: 'goals_forms',
            title: 'Goal Forms', // for activity tree select we add the options
            value: 'Goal Forms', // for activity tree select we add the options
          },
        ],
      },

      {
        key: 'voyage-reporting-form',
        label: 'sidebar.voyageReportingForm',
        role: 'vessel_related_forms',
        title: 'Vessel Related Form', // for activity tree select we add the options
        value: 'Vessel Related Form', // for activity tree select we add the options
        children: [
          {
            key: 'create-vessel-form',
            label: 'CreateVessel.title',
            role: 'create_vessel_form',
            title: 'Create Vessel Forms', // for activity tree select we add the options
            value: 'Create Vessel Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/audit-report',
            label: 'sidebar.auditReport',
            role: 'audit_report',
            title: 'Audit Forms', // for activity tree select we add the options
            value: 'Audit Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/inspection-report',
            label: 'sidebar.inspectionReport',
            role: 'inspection_report',
            title: 'Inspection Forms', // for activity tree select we add the options
            value: 'Inspection Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/deficiency-forms',
            label: 'sidebar.deficiencyForms',
            role: 'deficiency_forms',
            title: 'Deficiency Forms', // for activity tree select we add the options
            value: 'Deficiency Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/drills-report',
            label: 'sidebar.drillsReport',
            role: 'drill_forms',
            title: 'Drills Report', // for activity tree select we add the options
            value: 'Drills Report', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/voyage-report',
            label: 'sidebar.voyageReport',
            role: 'voyage_forms',
            title: 'Voyage Repoting Forms', // for activity tree select we add the options
            value: 'Voyage Repoting Forms', // for activity tree select we add the options
          },
        ],
      },
    ],
  },
  {
    key: 'how-to-videos',
    label: 'Howtovideos.title',
    role: 'how_to_videos',
    title: 'Video Tutorials', // for activity tree select we add the options
    value: 'Video Tutorials', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'how_to_videos',
        url: 'how-to-videos/videos-list?isOffline=1',
      },
      {
        name: 'how_to_videos_category',
        url: 'how-to-category/category-list',
      },
    ],
  },
  {
    key: 'eLOG-preference',
    label: 'ELOGPreference.title',
    role: 'elog_preference_gear_types',
    title: 'ELOG Preference', // for activity tree select we add the options
    value: 'ELOG Preference', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'ports',
        url: 'ports/user-port-list?isOffline=1',
      },
    ],
    children: [
      {
        key: 'ports',
        label: 'sidebar.ports',
        role: 'ports',
        title: 'Ports', // for activity tree select we add the options
        value: 'Ports', // for activity tree select we add the options
        api_url: 'ports/user-port-list?isOffline=1',
      },
    ],
  },

  {
    key: 'role-manage',
    label: 'role.manage.title',
    role: 'role',
    title: 'Role Management', // for activity tree select we add the options
    value: 'Role Management', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'role',
        url: 'user/role-management-list?isOffline=1',
      },
    ],
  },
  {
    key: 'configuration',
    label: 'Configuration.title',
    role: 'configuration',
    title: 'Configuration', // for activity tree select we add the options
    value: 'Configuration', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'position',
        url: 'configuration/position-list?allData=1&isOffline=1',
      },
      {
        name: 'departments',
        url: 'configuration/department-list?allData=1&isOffline=1',
      },
      {
        name: 'locations',
        url: 'configuration/location-list?allData=1&isOffline=1',
      },
      {
        name: 'notification',
        url: 'common/get-matrix-data',
      },
      {
        name: 'manage_dashboard_vessels',
        url: 'dashboard-master/dashboard-list?category=vessels',
      },
      {
        name: 'manage_dashboard_compliance',
        url: 'dashboard-master/dashboard-list?category=compliance',
      },
    ],
    children: [
      {
        key: 'position',
        label: 'sidebar.position',
        role: 'positions',
        title: 'Manage Positions', // for activity tree select we add the options
        value: 'Manage Position', // for activity tree select we add the options
        api_url: 'configuration/position-list',
      },
      {
        key: 'department',
        label: 'sidebar.department',
        role: 'departments',
        title: 'Manage Departments', // for activity tree select we add the options
        value: 'Manage Department', // for activity tree select we add the options
        api_url: 'configuration/department-list',
      },
      {
        key: 'location',
        label: 'sidebar.location',
        role: 'locations',
        title: 'Manage Locations', // for activity tree select we add the options
        value: 'Manage Location', // for activity tree select we add the options
        api_url: 'configuration/location-list',
      },
      {
        key: 'notification',
        label: 'sidebar.notification',
        role: 'notification',
        title: 'Manage Notifications', // for activity tree select we add the options
        value: 'Manage Notification', // for activity tree select we add the options
        api_url: '',
      },

      {
        key: 'manage-dashboard',
        label: 'sidebar.dashboard',
        role: 'manage_dashboard',
        title: 'Manage Dashboard',
        value: 'Manage Dashboard',
        children: [
          {
            key: 'manage-dashboard/compliance',
            label: 'dashboard.compliance',
            role: 'manage_compliance',
            title: 'Manage Compliance',
            value: 'Manage Compliance',
          },
          {
            key: 'manage-dashboard/vessels',
            label: 'dashboard.manage _vessels',
            role: 'manage_vessels',
            title: 'Manage Vessels',
            value: 'Manage Vessels',
          },
          {
            key: 'manage-dashboard/hseq',
            label: 'dashboard.hseq',
            role: 'manage_hseq',
            title: 'Manage HSEQ',
            value: 'Manage HSEQ',
          },
        ],
      },
    ],
  },
  {
    key: 'signature',
    label: 'Signatures',

    role: 'signature',
    title: 'Signature', // for activity tree select we add the options
    value: 'Signature', // for activity tree select we add the options
    sync_status: 'completed',
    api_url: [],
  },
];

export const moduleOptions = [
  {
    key: 'dashboard',
    label: 'dashboard.title',
    role: 'dashboard',
    title: 'Dashboard', // for activity tree select we add the options
    value: 'dashboard', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'agreements', url: 'cms/cms-list'},
      {name: 'subscriptions', url: 'payment/get-active-subscription'},
      {name: 'user_menuals', url: 'admin/user-manuals'},
      {name: 'exports', url: 'user/export-list?allData=1&isOffline=1'},
      {
        name: 'critical_notifications',
        url: 'common/get-notification?type=critical&status=0',
      },
      {
        name: 'normal_notifications',
        url: 'common/get-notification?type=normal&status=0',
      },
      {
        name: 'background-images',
        url: 'admin/get-background-image',
      },
      {
        name: 'static_dashboard_vessels',
        url: 'static-dashboard/get-vessel-data',
      },
      {
        name: 'static_dashboard_deficiency',
        url: 'vessels/deficiency-count',
      },
      {
        name: 'static_dashboard_voyage_time',
        url: 'static-dashboard/get-voyage-time',
      },
      {
        name: 'static_dashboard_out_of_service',
        url: 'static-dashboard/get-off-service-vessel-data',
      },
      {
        name: 'static_dashboard_voyage_reporting',
        url: 'static-dashboard/get-voyage-reporting-data',
      },
      {
        name: 'static_dashboard_trip',
        url: 'static-dashboard/get-trip-data',
      },
      {
        name: 'static_dashboard_audit',
        url: 'vessels/audit-count?category_type=audit',
      },
      {
        name: 'static_dashboard_inspection',
        url: 'vessels/audit-count?category_type=inspection',
      },
      {
        name: 'static_dashboard_drills',
        url: 'vessels/audit-count?category_type=drills',
      },
      {
        name: 'static_dashboard_certificate',
        url: 'vessels/vessel-certificate-count',
      },
      {
        name: 'static_dashboard_vessels_count',
        url: 'vessels/vessels-count',
      },
      {
        name: 'static_dashboard_vessels_audit_break',
        url: 'vessels/audit-break?category_type=audit',
      },
      {
        name: 'static_dashboard_vessels_inspection_break',
        url: 'vessels/audit-break?category_type=inspection',
      },
      {
        name: 'static_dashboard_vessels_drills_break',
        url: 'vessels/audit-break?category_type=drills',
      },
      {
        name: 'dynamic_dashboard_compliance',
        url: 'dashboard-master/get-dynamic-data?category=compliance&offline=1',
      },
      {
        name: 'dynamic_dashboard_vessels',
        url: 'dashboard-master/get-dynamic-data?category=vessels&offline=1',
      },
      {
        name: 'dynamic_dashboard_hseq',
        url: 'dashboard-master/get-dynamic-data?category=hseq&offline=1',
      },
      {
        name: 'static_dashboard_hseq_documents',
        url: 'hseq-dashboard/get-document-data',
      },
      {
        name: 'static_dashboard_hseq_reporting',
        url: 'hseq-dashboard/get-forms-reporting-data',
      },
      {
        name: 'static_dashboard_hseq_search_documents',
        url: 'hseq-dashboard/get-search-documents?allData=1',
      },

      {
        name: 'static_dashboard_hseq_menu_card',
        url: 'hseq-dashboard/get-dynamic-menu-data?allData=1',
      },
      {
        name: 'static_dashboard_hseq_menu_id',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },
    ],
    children: [
      {
        key: 'dashboard/compliance',
        label: 'dashboard.compliance',
        role: 'view_compliance',
        title: 'View Compliance',
        value: 'View Compliance',
      },
      {
        key: 'dashboard/voyage',
        label: 'dashboard.map',
        role: 'view_map',
        title: 'View Map',
        value: 'View Map',
      },
      {
        key: 'dashboard/vessels',
        label: 'dashboard.manage _vessels',
        role: 'view_vessels',
        title: 'View Vessels',
        value: 'View Vessels',
      },
      {
        key: 'dashboard/personnel',
        label: 'dashboard.personnel',
        role: 'view_personnel',
        title: 'View Personnel',
        value: 'View Personnel',
      },
      {
        key: 'dashboard/hseq',
        label: 'dashboard.hseq',
        role: 'view_hseq',
        title: 'View HSEQ',
        value: 'View HSEQ',
      },
      {
        key: 'dashboard/lms',
        label: 'dashboard.lms',
        role: 'view_lms',
        title: 'View lms',
        value: 'View lms',
      },
    ],
  },
  {
    key: 'users',
    label: 'Users',
    role: 'users',
    title: 'Users', // for activity tree select we add the options
    value: 'User', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'users', url: 'user-list/users-list?allData=1'},
      {name: 'userdetail', url: `user/user-detail`},
      {
        name: 'userlist',
        url: `user/role-management-list?allData=1&isOffline=1`,
      },
    ],
    // api_url: "user-list/users-list",
  },

  {
    key: 'Voyage',
    label: 'Trips.title',
    role: 'trips',
    title: 'Voyage', // for activity tree select we add the options
    value: 'Voyage', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {name: 'schedule_trip', url: 'trip/trip-list?ready_for_offline=1'},
      {name: 'my_trip', url: 'trip/my-trip-list'},
      {
        name: 'port_of_departure',
        url: 'database-generation/table-data?tableName=mv_port&fields=id,desc_eng',
      },
      {name: 'all_trip_details', url: 'trip/all-trip-data?isOffline=1'},
      {
        name: 'all_voyage_reporting_submited_forms',
        url: 'trip/all-trip-form-json?isOffline=1',
      },
      // {
      //   name: "voyage_id",
      //   url: "static-dashboard/get-trip-ids?allData=1",
      // },
      // {
      //   name: "map_table",
      //   url: "static-dashboard/get-map-data?allData=1",
      // },
    ],
    children: [
      {
        key: 'schedule-a-voyage',
        label: 'scheduleATrip.title',
        role: 'schedule_trip',
        title: 'Schedule a Voyage', // for activity tree select we add the options
        value: 'Schedule a  Voyage', // for activity tree select we add the options
        api_url: 'trip/trip-list',
        parent_key: 'trips',
      },
      {
        key: 'my-voyage',
        label: 'Mytrip.title',
        role: 'my_trip',
        title: 'My Voyage', // for activity tree select we add the options
        value: 'My Voyage', // for activity tree select we add the options
        api_url: 'trip/my-trip-list',
        parent_key: 'trips',
      },
    ],
  },

  {
    key: 'vessels-management',
    label: 'VesselsManagement.title',
    role: 'vessels_management',
    title: 'Vessel Management', // for activity tree select we add the options
    value: 'Vessel Management', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'vm_vessles_type',
        url: 'vessels-type/vessels-type-list?showAll=1',
      },
      {
        name: 'vessles',
        url: 'vessels/vessel-list',
      },
      {
        name: 'vessels_list',
        url: 'vessels/assign-user?allData=1',
      },
      {
        name: 'drills',
        url: 'vessels/audit-form-list?category_type=drills&isOffline=1',
      },
      {
        name: 'drills_type',
        url: 'custom-category/lists?category_type=drills&isOffline=1',
      },
      {
        name: 'schedule_list',
        url: 'vessels/audit-schedule-list?category_type=drills&isOffline=1',
      },
      {
        name: 'audit_schedule_list',
        url: 'vessels/audit-schedule-list?category_type=audit&isOffline=1',
      },
      {
        name: 'inspection_schedule_list',
        url: 'vessels/audit-schedule-list?category_type=inspection&isOffline=1',
      },
      {
        name: 'category_schedule_list',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },
      {
        name: 'audit_report',
        url: 'vessels/audit-form-list?category_type=audit&isOffline=1',
      },
      {
        name: 'inspection_report',
        url: 'vessels/audit-form-list?category_type=inspection&isOffline=1',
      },
      {
        name: 'punch_list',
        url: 'vessels/punch-list',
      },
      {
        name: 'punch_details',
        url: 'vessels/deficiency-comment-list?allData=1',
      },
      {
        name: 'closed_forms',
        url: 'vessels/offline-closure-form?allData=1',
      },
      {
        name: 'vessel_related_forms_audit_category',
        url: 'custom-category/lists?category_type=audit&isOffline=1',
      },
      {
        name: 'vessel_related_forms_inspect_category',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },
      {
        name: 'audit_vessels_list',
        url: 'vessels/vessel-list?allData=1',
      },
      {
        name: 'vessles_details',
        url: 'vessels/all-vessel',
      },
      {
        name: 'organization_image',
        url: 'common/get-all-images',
      },
    ],
    children: [
      {
        key: 'vessles-type',
        label: 'sidebar.vesselsTypes',
        role: 'vm_vessles_type',
        title: 'Vessel Types', // for activity tree select we add the options
        value: 'Vessel Types', // for activity tree select we add the options
        api_url: 'vessels-type/vessels-type-list?showAll=1',
      },
      {
        key: 'vessels',
        label: 'sidebar.vessels',
        role: 'vessles',
        title: 'Vessels', // for activity tree select we add the options
        value: 'Vessels', // for activity tree select we add the options
        api_url: 'vessels/vessel-list',
      },
      {
        key: 'drills',
        label: 'sidebar.drills',
        role: 'drills',
        title: 'Drills', // for activity tree select we add the options
        value: 'Drills', // for activity tree select we add the options
        api_url: 'custom-category/lists?category_type=drills&isOffline=1',
      },
      {
        key: 'audit-and-inspection',
        label: 'sidebar.auditInspection',
        role: 'audit_and_inspection_report',
        title: 'Audits & Inspections', // for activity tree select we add the options
        value: 'Audits & Inspections', // for activity tree select we add the options
        api_url: 'vessels/audit-form-list?category_type=audit&isOffline=1',
      },
      {
        key: 'punch-list',
        label: 'sidebar.puchList',
        role: 'punch_list',
        title: 'Deficiencies', // for activity tree select we add the options
        value: 'Deficiencies', // for activity tree select we add the options
        api_url: 'vessels/punch-list',
      },
    ],
  },
  {
    key: 'voyage-reporting',
    label: 'VoyageReporting.title',
    role: 'voyage_reporting',
    title: 'Voyage Reporting', // for activity tree select we add the options
    value: 'Voyage Reporting', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'voyage_reporting_list',
        url: 'vessels/voyage-list?allData=1&isOffline=1',
      },
      // {
      //   name: "voyage_categories",
      //   url: "custom-category/lists?category_type=voyage_reporting&isOffline=1",
      // },
    ],
    // api_url: "custom-category/lists?category_type=voyage_reporting&isOffline=1",
  },
  {
    key: 'personnel',
    label: 'personnel.title',
    role: 'personnel',
    title: 'Personnel', // for activity tree select we add the options
    value: 'Personnel', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'sea_time_tracker',
        url: 'trip/sea-time-tracker-lists?isOffline=1',
      },
      {
        name: 'training_tracker',
        url: 'training-tracker/list?isOffline=1',
      },
      {
        name: 'certificates',
        url: 'personnel-certificates/list?isOffline=1',
      },
      {
        name: 'drill_tracker',
        url: 'vessels/drill-tracker-list',
      },
      {
        name: 'view_working_hours',
        url: 'user/user-calender',
        method: 'POST',
        passData: {filterDate: moment(new Date()).format('YYYY-MM-DD')},
      },
    ],
    children: [
      {
        key: 'user-calender',
        label: 'sidebar.viewWorkingHours',
        role: 'view_working_hours',
        title: 'View Working Hours', // for activity tree select we add the options
        value: 'View Working Hours', // for activity tree select we add the options
        //api_url: 'user/user-calender'
      },
      {
        key: 'sea-time-tracker',
        label: 'sidebar.sea_time_tracker',
        role: 'sea_time_tracker',
        title: 'Sea Time Tracker', // for activity tree select we add the options
        value: 'Sea Time Tracker', // for activity tree select we add the options
        api_url: 'trip/sea-time-tracker-lists?isOffline=1',
      },
      {
        key: 'training-tracker',
        label: 'sidebar.training_tracker',
        role: 'training_tracker',
        title: 'Training Tracker', // for activity tree select we add the options
        value: 'Training Tracker', // for activity tree select we add the options
        api_url: 'training-tracker/list?isOffline=1',
      },
      {
        key: 'drill-tracker',
        label: 'sidebar.drill.tracker',
        role: 'drill_tracker',
        title: 'Drill Tracker', // for activity tree select we add the options
        value: 'Drill Tracker', // for activity tree select we add the options
        api_url: 'drill-tracker/list',
      },
      {
        key: 'certificates',
        label: 'sidebar.certificates',
        role: 'certificates',
        title: 'Certificates', // for activity tree select we add the options
        value: 'Certificates', // for activity tree select we add the options
        api_url: 'personnel-certificates/list?isOffline=1',
      },
    ],
  },
  {
    key: 'hseq_sms',
    label: 'hseq.title',
    role: 'hseq',
    title: 'HSEQ', // for activity tree select we add the options
    value: 'HSEQ', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'safety_management',
        url: 'safety-management-system/safety-tree',
      },
      {
        name: 'safety_document_list_viewer',
        url: `safety-management-system/safety-document-list?allData=1&editor=0&isOffline=1`,
      },
      {
        name: 'safety_document_list_editor',
        url: `safety-management-system/safety-document-list?allData=1&editor=1&isOffline=1`,
      },
      {
        name: 'safety_menu_list',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },
      {
        name: 'safety_document_list',
        url: 'safety-management-system/safety-document-data?allData=1&isOffline=1',
      },
      {
        name: 'safety_document_details',
        url: 'safety-management-system/safety-document-all-data',
      },
      {
        name: 'safety_document_view',
        url: 'safety-management-system/get-safety-forms-data',
      },
    ],
    children: [
      {
        key: 'safety-management-system',
        label: 'sidebar.sms_viewer',
        role: 'safety_management',
        title: 'SMS Viewer', // for activity tree select we add the options
        value: 'SMS Viewer', // for activity tree select we add the options
        api_url: '',
      },
      {
        key: 'safety-management-system-editor',
        label: 'sidebar.sms_editor',
        role: 'safety_management_editor',
        title: 'SMS Editor', // for activity tree select we add the options
        value: 'SMS Editor', // for activity tree select we add the options
        api_url: '',
      },
    ],
  },
  {
    key: 'learning_management',
    label: 'LMS.title',
    role: 'learning_management',
    title: 'Learning Management ',
    value: 'learning_management',
    sync_status: 'completed',
    api_url: [],
    children: [
      {
        key: 'manage-categories',
        label: 'sidebar.Manage.categories',
        role: 'manage_categories',
        title: 'Manage Categories',
        value: 'Manage Categories',
      },
      {
        key: 'manage-courses',
        label: 'sidebar.Manage.courses',
        role: 'manage_courses',
        title: 'Manage Courses',
        value: 'Manage Courses',
      },
      {
        key: 'all-courses',
        label: 'sidebar.AllCourses',
        role: 'learning_management',
        title: 'All Courses',
        value: 'All Courses',
      },
      {
        key: 'my-learning',
        label: 'sidebar.MyLearning',
        role: 'learning_management',
        title: 'My Learnings',
        value: 'My Learning',
      },
      {
        key: 'training-metrix',
        label: 'sidebar.Training.Metrix',
        role: 'training_metrix',
        title: 'Training Matrix',
        value: 'Training Matrix',
      },
      {
        key: 'performance-evalution',
        label: 'sidebar.Performance.Evalution',
        role: 'performance_evalution',
        title: 'Performance Evaluations',
        value: 'Performance Evalution',
      },
      {
        key: 'my-evalution',
        label: 'sidebar.MyEvalution',
        role: 'my_evalution',
        title: 'My Evaluations',
        value: 'My Evalution',
      },
      {
        key: 'goal',
        label: 'sidebar.Goal',
        role: 'goal',
        title: 'Goals',
        value: 'Goal',
      },
    ],
  },

  {
    key: 'forms',
    label: 'Forms.title',
    role: 'forms',
    title: 'Forms', // for activity tree select we add the options
    value: 'Forms', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      // trip forms
      {
        name: 'trip_form',
        url: 'custom-forms/get-offline-form?type=schedule_a_trip',
      },

      // Safety forms
      {
        name: 'safety_form_menu',
        url: 'safety-management-system/safety-menu-list?allData=1&isOffline=1',
      },

      {
        name: 'safety_form_category',
        url: 'custom-category/lists?category_type=safety_document&allData=1&isOffline=1',
      },

      {
        name: 'safety_form_forms',
        url: 'custom-forms/vessel-forms?category_type=safety_document&allData=1&isOffline=1',
      },

      // Vessel Replated Forms

      {
        name: 'vessel_create_form',
        url: 'custom-forms/get-offline-form?type=vessel_custom_form',
      },

      {
        name: 'vessel_related_forms_audit_category',
        url: 'custom-category/lists?category_type=audit&isOffline=1',
      },

      {
        name: 'vessel_related_forms_audit_forms',
        url: 'custom-forms/vessel-forms?category_type=audit&isOffline=1',
      },

      {
        name: 'vessel_related_forms_audit_vessels',
        url: 'vessel-forms/lists?category_type=audit&offline=1',
      },

      // Inspection Form
      {
        name: 'vessel_related_forms_inspection_category',
        url: 'custom-category/lists?category_type=inspection&isOffline=1',
      },

      {
        name: 'vessel_related_forms_inspection_forms',
        url: 'custom-forms/vessel-forms?category_type=inspection&isOffline=1',
      },

      {
        name: 'vessel_related_forms_inspection_vessels',
        url: 'vessel-forms/lists?category_type=inspection&offline=1',
      },

      // Deficiency Forms

      {
        name: 'vessel_related_forms_deficiency_forms',
        url: 'custom-forms/deficiency-form-list?type=deficiency_form',
      },

      // Drill Report Forms

      {
        name: 'vessel_related_forms_drills_category',
        url: 'custom-category/lists?category_type=drills&isOffline=1',
      },

      {
        name: 'vessel_related_forms_drills_forms',
        url: 'custom-forms/vessel-forms?category_type=drills&isOffline=1',
      },

      {
        name: 'vessel_related_forms_drills_vessels',
        url: 'vessel-forms/lists?category_type=drills&offline=1',
      },

      // Voyage forms

      {
        name: 'vessel_related_forms_voyage_forms_category',
        url: 'custom-category/lists?category_type=voyage_reporting&isOffline=1',
      },

      {
        name: 'vessel_related_forms_voyage_forms_forms',
        url: 'custom-forms/vessel-forms?category_type=voyage_reporting&isOffline=1',
      },

      {
        name: 'vessel_related_forms_voyage_forms_vessels',
        url: 'vessel-forms/lists?category_type=voyage_reporting&offline=1',
      },

      // Evaluation Forms

      {
        name: 'evaluation_forms_category',
        url: 'custom-category/lists?category_type=evalution&isOffline=1',
      },

      {
        name: 'evaluation_forms_forms',
        url: 'custom-forms/vessel-forms?category_type=evalution&isOffline=1',
      },

      {
        name: 'evaluation_forms_roles',
        url: 'user/evalution-forms-lists?category_type=evalution&isOffline=1',
      },
      // Goal forms
      {
        name: 'goal_forms',
        url: 'custom-forms/deficiency-form-list?type=goal_form',
      },
    ],
    children: [
      {
        key: 'schedule-voyage-form',
        label: 'TripForms.title',
        role: 'trip_form',
        title: 'Voyage Forms', // for activity tree select we add the options
        value: 'Voyage Forms', // for activity tree select we add the options
        api_url: 'custom-forms/custom-form-list',
      },

      {
        key: 'safety-form',
        label: 'safety_forms.title',
        role: 'safety_forms',
        title: 'Safety Forms', // for activity tree select we add the options
        value: 'Safety Forms', // for activity tree select we add the options
        api_url: '',
      },

      {
        key: 'lms-forms',
        label: 'sidebar.lms_forms',
        role: 'lms_forms',
        title: 'LMS Forms', // for activity tree select we add the options
        value: 'LMS Forms', // for activity tree select we add the options
        children: [
          {
            key: 'evalution-forms',
            label: 'sidebar.EvalutionForms',
            role: 'evalution_forms',
            title: 'Evalution Forms', // for activity tree select we add the options
            value: 'Evalution Forms', // for activity tree select we add the options
          },

          {
            key: 'goals-forms',
            label: 'sidebar.Goal.forms',
            role: 'goals_forms',
            title: 'Goal Forms', // for activity tree select we add the options
            value: 'Goal Forms', // for activity tree select we add the options
          },
        ],
      },

      {
        key: 'voyage-reporting-form',
        label: 'sidebar.voyageReportingForm',
        role: 'vessel_related_forms',
        title: 'Vessel Related Form', // for activity tree select we add the options
        value: 'Vessel Related Form', // for activity tree select we add the options
        children: [
          {
            key: 'create-vessel-form',
            label: 'CreateVessel.title',
            role: 'create_vessel_form',
            title: 'Create Vessel Forms', // for activity tree select we add the options
            value: 'Create Vessel Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/audit-report',
            label: 'sidebar.auditReport',
            role: 'audit_report',
            title: 'Audit Forms', // for activity tree select we add the options
            value: 'Audit Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/inspection-report',
            label: 'sidebar.inspectionReport',
            role: 'inspection_report',
            title: 'Inspection Forms', // for activity tree select we add the options
            value: 'Inspection Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/deficiency-forms',
            label: 'sidebar.deficiencyForms',
            role: 'deficiency_forms',
            title: 'Deficiency Forms', // for activity tree select we add the options
            value: 'Deficiency Forms', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/drills-report',
            label: 'sidebar.drillsReport',
            role: 'drill_forms',
            title: 'Drills Report', // for activity tree select we add the options
            value: 'Drills Report', // for activity tree select we add the options
          },
          {
            key: 'voyage-reporting-form/voyage-report',
            label: 'sidebar.voyageReport',
            role: 'voyage_forms',
            title: 'Voyage Forms', // for activity tree select we add the options
            value: 'Voyage Forms', // for activity tree select we add the options
          },
        ],
      },
    ],
  },
  {
    key: 'how-to-videos',
    label: 'Howtovideos.title',
    role: 'how_to_videos',
    title: 'Video Tutorials', // for activity tree select we add the options
    value: 'Video Tutorials', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'how_to_videos',
        url: 'how-to-videos/videos-list?isOffline=1',
      },
      {
        name: 'how_to_videos_category',
        url: 'how-to-category/category-list',
      },
    ],
  },
  {
    key: 'eLOG-preference',
    label: 'ELOGPreference.title',
    role: 'elog_preference_gear_types',
    title: 'ELOG Preference', // for activity tree select we add the options
    value: 'ELOG Preference', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'ports',
        url: 'ports/user-port-list?isOffline=1',
      },
    ],
    children: [
      {
        key: 'ports',
        label: 'sidebar.ports',
        role: 'ports',
        title: 'Ports', // for activity tree select we add the options
        value: 'Ports', // for activity tree select we add the options
        api_url: 'ports/user-port-list?isOffline=1',
      },
    ],
  },

  {
    key: 'role-manage',
    label: 'role.manage.title',
    role: 'role',
    title: 'Role Management', // for activity tree select we add the options
    value: 'Role Management', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'role',
        url: 'user/role-management-list?isOffline=1',
      },
    ],
  },
  {
    key: 'configuration',
    label: 'Configuration.title',
    role: 'configuration',
    title: 'Configuration', // for activity tree select we add the options
    value: 'Configuration', // for activity tree select we add the options
    sync_status: 'pending',
    api_url: [
      {
        name: 'position',
        url: 'configuration/position-list?allData=1&isOffline=1',
      },
      {
        name: 'departments',
        url: 'configuration/department-list?allData=1&isOffline=1',
      },
      {
        name: 'locations',
        url: 'configuration/location-list?allData=1&isOffline=1',
      },
      {
        name: 'notification',
        url: 'common/get-matrix-data',
      },
      {
        name: 'manage_dashboard_vessels',
        url: 'dashboard-master/dashboard-list?category=vessels',
      },
      {
        name: 'manage_dashboard_compliance',
        url: 'dashboard-master/dashboard-list?category=compliance',
      },
    ],
    children: [
      {
        key: 'position',
        label: 'sidebar.position',
        role: 'positions',
        title: 'Manage Positions', // for activity tree select we add the options
        value: 'Manage Position', // for activity tree select we add the options
        api_url: 'configuration/position-list',
      },
      {
        key: 'department',
        label: 'sidebar.department',
        role: 'departments',
        title: 'Manage Departments', // for activity tree select we add the options
        value: 'Manage Department', // for activity tree select we add the options
        api_url: 'configuration/department-list',
      },
      {
        key: 'location',
        label: 'sidebar.location',
        role: 'locations',
        title: 'Manage Locations', // for activity tree select we add the options
        value: 'Manage Location', // for activity tree select we add the options
        api_url: 'configuration/location-list',
      },
      {
        key: 'notification',
        label: 'sidebar.notification',
        role: 'notification',
        title: 'Manage Notifications', // for activity tree select we add the options
        value: 'Manage Notification', // for activity tree select we add the options
        api_url: '',
      },

      {
        key: 'manage-dashboard',
        label: 'sidebar.dashboard',
        role: 'manage_dashboard',
        title: 'Manage Dashboard',
        value: 'Manage Dashboard',
        children: [
          {
            key: 'manage-dashboard/compliance',
            label: 'dashboard.compliance',
            role: 'manage_compliance',
            title: 'Manage Compliance',
            value: 'Manage Compliance',
          },
          {
            key: 'manage-dashboard/vessels',
            label: 'dashboard.manage _vessels',
            role: 'manage_vessels',
            title: 'Manage Vessels',
            value: 'Manage Vessels',
          },
          {
            key: 'manage-dashboard/hseq',
            label: 'dashboard.hseq',
            role: 'manage_hseq',
            title: 'Manage HSEQ',
            value: 'Manage HSEQ',
          },
        ],
      },
    ],
  },
  {
    key: 'signature',
    label: 'Signatures',
    role: 'signature',
    title: 'Signature', // for activity tree select we add the options
    value: 'Signature', // for activity tree select we add the options
    sync_status: 'completed',
    api_url: [],
  },
];

export const UserList = [
  {lable: 'Rudra', value: 'Rudra', id: 0},
  {lable: 'Mayank', value: 'Mayank', id: 1},
  {lable: 'siya', value: 'siya', id: 1},
];

export const timeData = [
  {
    day: 'Monday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Tuesday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Wednesday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Thursday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Friday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Saturday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
  {
    day: 'Sunday',
    start: moment(currentDate.setHours(9, 0)).format('HH:mm'),
    end: moment(currentDate.setHours(18, 0)).format('HH:mm'),
  },
];
export const fileTypes = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/heic': 'HEIC',
  'image/heif': 'HEIF',
  'application/pdf': 'PDF',
  'text/plain': 'TXT',
  'application/msword': 'DOC',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'DOCX',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'PPTX',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
};

export const roles = [{text: 'Fisher'}, {text: 'Engineering'}, {text: 'Admin'}];

export const detaildata = [
  {
    title: [{name: 'wemnfweko'}, {name: 'kwdnkw'}, {name: ',mdw,'}],
  },
];

export const RoleStructure = [
  {
    key: 'dashboard',
    role: 'dashboard',
    label: 'Dashboard',
    children: [
      {
        key: 'compliance_dashboard',
        label: 'Compliance',
        role: 'compliance_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_compliance',
            label: 'View Compilance',
            role: 'view_compliance',
            infoEng: 'You can view the Compilance dashboard',
            infoFren: 'You can view the Compilance dashboard',
          },
        ],
      },
      {
        key: 'vessels_dashboard',
        label: 'Vessels',
        role: 'vessels_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_vessels',
            label: 'View Vessels',
            role: 'view_vessels',
            infoEng: 'You can view the Vessels dashboard',
            infoFren: 'You can view the Vessels dashboard',
          },
        ],
      },
      {
        key: 'hseq_dashboard',
        label: 'HSEQ',
        role: 'hseq_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_hseq',
            label: 'View HSEQ',
            role: 'view_hseq',
            infoEng: 'You can view the HSEQ dashboard',
            infoFren: 'You can view the HSEQ dashboard',
          },
        ],
      },
      {
        key: 'map_dashboard',
        label: 'Map',
        role: 'map_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_map',
            label: 'View Map',
            role: 'view_map',
            infoEng: 'You can view the Map dashboard',
            infoFren: 'You can view the Map dashboard',
          },
        ],
      },
      {
        key: 'personnel_dashboard',
        label: 'Personnel',
        role: 'personnel_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_personnel',
            label: 'View Personnel',
            role: 'view_personnel',
            infoEng: 'You can view the Personnel dashboard',
            infoFren: 'You can view the Personnel dashboard',
          },
          {
            key: 'access_personnel',
            label: 'Access Personnel',
            role: 'access_personnel',
            infoEng: 'You can access the Personnel dashboard',
            infoFren: 'You can access the Personnel dashboard',
          },
          {
            key: 'admin_personnel',
            label: 'Admin Personnel',
            role: 'admin_personnel',
            infoEng: 'Admin can access the Personnel dashboard',
            infoFren: 'Admin can access the Personnel dashboard',
          },
        ],
      },
      {
        key: 'lms_dashboard',
        label: 'LMS',
        role: 'lms_dashboard',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_lms',
            label: 'View Lms',
            role: 'view_lms',
            infoEng: 'You can view the Lms dashboard',
            infoFren: 'You can view the Lms dashboard',
          },
        ],
      },
    ],
  },
  {
    key: 'users',
    role: 'users',
    label: 'Users',
    selectedRole: [],
    setImmediate: false,
    checkAll: false,
    crud: [
      {
        key: 'users_list',
        label: 'Users List/View',
        role: 'user_management_list',
        infoEng: 'It is used to grant access to the user list/view page.',
        infoFren: 'It is used to grant access to the user list/view page.',
      },
      {
        key: 'users_create',
        label: 'Users Create',
        role: 'user_management_create',
        infoEng: 'It is used to grant access to create the user.',
        infoFren: 'It is used to grant access to create the user.',
      },
      {
        key: 'users_update',
        label: 'Users Update',
        role: 'user_management_update',
        infoEng: 'It is used to grant access to the user update page.',
        infoFren: 'It is used to grant access to the user update page.',
      },
      {
        key: 'users_delete',
        label: 'Users Block',
        role: 'user_management_delete',
        infoEng: 'It is used to grant access to block the user.',
        infoFren: 'It is used to grant access to block the user.',
      },
    ],
  },

  {
    key: 'trips',
    role: 'trips',
    label: 'Voyage',
    children: [
      {
        key: 'schedule_trip',
        role: 'schedule_trip',
        label: 'Schedule Voyage',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'schedule_trip_list',
            label: 'Schedule Voyage List/View',
            role: 'schedule_trip_list',
            infoEng:
              'It is used to grant access to the schedule voyage list / view page.',
            infoFren:
              'It is used to grant access to the schedule voyage list / view page.',
          },
          {
            key: 'schedule_trip_create',
            label: 'Schedule Voyage Create',
            role: 'schedule_trip_create',
            infoEng:
              'It is used to grant access to the schedule voyage list / view page.',
            infoFren:
              'It is used to grant access to the schedule voyage list / view page.',
          },
          {
            key: 'schedule_trip_update',
            label: 'Schedule Voyage Update',
            role: 'schedule_trip_update',
            infoEng:
              'It is used to grant access to update the schedule voyage.',
            infoFren:
              'It is used to grant access to update the schedule voyage.',
          },
          {
            key: 'schedule_trip_delete',
            label: 'Schedule Voyage Delete',
            role: 'schedule_trip_delete',
            infoEng:
              'It is used to grant access to delete the schedule voyage.',
            infoFren:
              'It is used to grant access to delete the schedule voyage.',
          },
        ],
      },
      {
        key: 'my_trip',
        role: 'my_trip',
        label: 'My Voyage',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'my_trip_list',
            label: 'My Voyage List/View',
            role: 'my_trip_list',
            infoEng:
              'It is used to grant access to the my voyage list / view page.',
            infoFren:
              'It is used to grant access to the my voyage list / view page.',
          },
        ],
      },
    ],
  },
  {
    key: 'vessels_management',
    role: 'vessels_management',
    label: 'Vessel Management',
    children: [
      {
        key: 'vm_vessles_type',
        label: 'Vessel Type',
        role: 'vm_vessles_type',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'vm_vessles_type_list',
            label: 'Vessel Type List/View',
            role: 'vm_vessles_type_list',
            infoEng:
              'It is used to grant access to the vessel type list / view page.',
            infoFren:
              'It is used to grant access to the vessel type list / view page.',
          },
          {
            key: 'vm_vessles_type_create',
            label: 'Vessel Type create',
            role: 'vm_vessles_type_create',
            infoEng: 'It is used to grant access to create the vessel type.',
            infoFren: 'It is used to grant access to create the vessel type.',
          },
          {
            key: 'vm_vessles_type_update',
            label: 'Vessel Type update',
            role: 'vm_vessles_type_update',
            infoEng: 'It is used to grant access to update the vessel type.',
            infoFren: 'It is used to grant access to update the vessel type.',
          },
          {
            key: 'vm_vessles_type_delete',
            label: 'Vessel Type delete',
            role: 'vm_vessles_type_delete',
            infoEng: 'It is used to grant access to delete the vessel type.',
            infoFren: 'It is used to grant access to delete the vessel type.',
          },
        ],
      },
      {
        key: 'vessles',
        role: 'vessles',
        label: 'Vessel',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'vessles_list',
            label: 'Vessel List/View',
            role: 'vessles_list',
            infoEng:
              'It is used to grant access to the vessel list / view page.',
            infoFren:
              'It is used to grant access to the vessel list / view page.',
          },
          {
            key: 'vessles_create',
            label: 'Vessel Create',
            role: 'vessles_create',
            infoEng: 'It is used to grant access to create the vessel.',
            infoFren: 'It is used to grant access to create the vessel.',
          },
          {
            key: 'vessles_update',
            label: 'Vessel Update',
            role: 'vessles_update',
            infoEng: 'It is used to grant access to update the vessel.',
            infoFren: 'It is used to grant access to update the vessel.',
          },
          {
            key: 'vessles_delete',
            label: 'Vessel Delete',
            role: 'vessles_delete',
            infoEng: 'It is used to grant access to delete the vessel.',
            infoFren: 'It is used to grant access to delete the vessel.',
          },
        ],
      },
      {
        key: 'audit_and_inspection_report',
        role: 'audit_and_inspection_report',
        label: 'Audit & Inspection Report',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'audit_inspection_report_list',
            label: 'Audit & Inspection Report List & View',
            role: 'audit_inspection_report_list',
            infoEng:
              'It is used to grant access to the audit & inspection report list /  view page.',
            infoFren:
              'It is used to grant access to the audit & inspection report list / view page.',
          },
          {
            key: 'audit_inspection_report_create',
            label: 'Audit & Inspection Create',
            role: 'audit_inspection_report_create',
            infoEng:
              'It is used to grant access to create the audit & inspection report.',
            infoFren:
              'It is used to grant access to create the audit & inspection report.',
          },
          {
            key: 'audit_inspection_report_update',
            label: 'Audit & Inspection Update',
            role: 'audit_inspection_report_update',
            infoEng:
              'It is used to grant access to update the audit & inspection report.',
            infoFren:
              'It is used to grant access to update the audit & inspection report.',
          },
          {
            key: 'audit_inspection_report_delete',
            label: 'Audit & Inspection Delete',
            role: 'audit_inspection_report_delete',
            infoEng:
              'It is used to grant access to delete the audit & inspection report.',
            infoFren:
              'It is used to grant access to delete the audit & inspection report.',
          },
          {
            key: 'audit_inspection_report_revert',
            label: 'Audit & Inspection Revert',
            role: 'audit_inspection_report_revert',
            infoEng:
              'It is used to grant access to revert the audit & inspection form.',
            infoFren:
              'It is used to grant access to revert the audit & inspection form.',
          },
        ],
      },
      {
        key: 'drills',
        role: 'drills',
        label: 'Drills',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'drill_report_list',
            label: 'Drills Report List/View',
            role: 'drill_report_list',
            infoEng:
              'It is used to grant access to the drills report list / view page.',
            infoFren:
              'It is used to grant access to the drills report list / view page.',
          },
          {
            key: 'drill_report_create',
            label: 'Drills Create',
            role: 'drill_report_create',
            infoEng: 'It is used to grant access to create the drills report.',
            infoFren: 'It is used to grant access to create the drills report.',
          },
          {
            key: 'drill_report_update',
            label: 'Drills Update',
            role: 'drill_report_update',
            infoEng: 'It is used to grant access to update the drills report.',
            infoFren: 'It is used to grant access to update the drills report.',
          },
          {
            key: 'drill_report_delete',
            label: 'Drills Delete',
            role: 'drill_report_delete',
            infoEng: 'It is used to grant access to delete the drills report.',
            infoFren: 'It is used to grant access to delete the drills report.',
          },
          {
            key: 'drill_report_revert',
            label: 'Drills Revert',
            role: 'drill_report_revert',
            infoEng:
              'It is used to grant access to revert the drills reporting form.',
            infoFren:
              'It is used to grant access to revert the drills reporting form.',
          },
        ],
      },
      {
        key: 'punch_list',
        role: 'punch_list',
        label: 'Deficiencies',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'punch_list_and_view',
            label: 'Deficiencies List/View',
            role: 'punch_list_and_view',
            infoEng:
              'It is used to grant access to the deficiencies list / view page.',
            infoFren:
              'It is used to grant access to the deficiencies list / view page.',
          },
          {
            key: 'punch_list_create',
            label: 'Deficiencies Create',
            role: 'punch_list_create',
            infoEng:
              'It is used to grant access to create the deficiencies create.',
            infoFren:
              'It is used to grant access to create the deficiencies create.',
          },
          {
            key: 'punch_list_update',
            label: 'Deficiencies Update',
            role: 'punch_list_update',
            infoEng: 'It is used to grant access to update the deficiencies.',
            infoFren: 'It is used to grant access to update the deficiencies.',
          },
          {
            key: 'deficiency_self_assigned',
            label: 'Deficiencies Self Assigned',
            role: 'deficiency_self_assigned',
            infoEng: 'It is used to grant access only self assigned.',
            infoFren: 'It is used to grant access only self assigned.',
          },
        ],
      },
    ],
  },

  {
    key: 'voyage_reporting',
    role: 'voyage_reporting',
    label: 'Voyage Reporting',
    selectedRole: [],
    setImmediate: false,
    checkAll: false,
    crud: [
      {
        key: 'voyage_reporting_list',
        label: 'Voyage Reporting List/View',
        role: 'voyage_reporting_list',
        infoEng: 'It is used to grant access to the voyage report list / view.',
        infoFren:
          'It is used to grant access to the voyage report list / view.',
      },
      {
        key: 'voyage_reporting_create',
        label: 'Voyage Reporting Create',
        role: 'voyage_reporting_create',
        infoEng: 'It is used to grant access to create the voyage report.',
        infoFren: 'It is used to grant access to create the voyage report.',
      },
      {
        key: 'voyage_reporting_update',
        label: 'Voyage Reporting Update',
        role: 'voyage_reporting_update',
        infoEng: 'It is used to grant access to update the voyage report.',
        infoFren: 'It is used to grant access to update the voyage report.',
      },
      {
        key: 'voyage_reporting_revert',
        label: 'Voyage Reporting Revert',
        role: 'voyage_reporting_revert',
        infoEng:
          'It is used to grant access to revert the voyage reporting form.',
        infoFren:
          'It is used to grant access to revert the voyage reporting form.',
      },
    ],
  },
  {
    key: 'personnel',
    label: 'Personnel',
    role: 'personnel',
    children: [
      {
        key: 'sea-time-tracker',
        label: 'Sea Time Tracker',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        role: 'sea_time_tracker',
        crud: [
          {
            key: 'sea_time_tracker_list',
            label: 'Sea Time Tracker List/View',
            role: 'sea_time_tracker_list',
            infoEng:
              'It is used to grant access to the sea time tracker list / view.',
            infoFren:
              'It is used to grant access to the sea time tracker list / view.',
          },
          {
            key: 'sea_time_tracker_self_assigned',
            label: 'Self assigned',
            role: 'sea_time_tracker_self_assigned',
            infoEng: 'It is used to grant access only self assigned.',
            infoFren: 'It is used to grant access only self assigned.',
          },
        ],
      },

      {
        key: 'training-tracker',
        label: 'Training Tracker',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        role: 'training_tracker',
        crud: [
          {
            key: 'training_tracker_list',
            label: 'Training Tracker List/View',
            role: 'training_tracker_list',
            infoEng:
              'It is used to grant access to the training tracker list / view.',
            infoFren:
              'It is used to grant access to the training tracker list / view.',
          },
          {
            key: 'training_tracker_create',
            label: 'Training Tracker Create',
            role: 'training_tracker_create',
            infoEng:
              'It is used to grant access to create the training tracker.',
            infoFren:
              'It is used to grant access to create the training tracker.',
          },
          {
            key: 'training_tracker_update',
            label: 'Training Tracker Update',
            role: 'training_tracker_update',
            infoEng:
              'It is used to grant access to update the training tracker.',
            infoFren:
              'It is used to grant access to update the training tracker.',
          },
          {
            key: 'training_tracker_delete',
            label: 'Training Tracker Delete',
            role: 'training_tracker_delete',
            infoEng:
              'It is used to grant access to delete the training tracker.',
            infoFren:
              'It is used to grant access to delete the training tracker.',
          },
          {
            key: 'training_tracker_self_assigned',
            label: 'Self Assigned',
            role: 'training_tracker_self_assigned',
            infoEng: 'It is used to grant access only self assigned.',
            infoFren: 'It is used to grant access only self assigned.',
          },
        ],
      },
      {
        key: 'drill-tracker',
        role: 'drill_tracker',
        label: 'Drill Tracker',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'drill_tracker_list',
            label: 'Drill Tracker List/View',
            role: 'drill_tracker_list',
            infoEng:
              'It is used to grant access to the drill tracker list / view.',
            infoFren:
              'It is used to grant access to the drill tracker list / view.',
          },
          {
            key: 'drill_tracker_create',
            label: 'Drill Tracker Create',
            role: 'drill_tracker_create',
            infoEng: 'It is used to grant access to the drill tracker create.',
            infoFren: 'It is used to grant access to the drill tracker create.',
          },
          {
            key: 'drill_tracker_self_assigned',
            label: 'Self Assigned',
            role: 'drill_tracker_self_assigned',
            infoEng:
              'It is used to grant access to the drill tracker self assigned.',
            infoFren:
              'It is used to grant access to the drill tracker self assigned.',
          },
        ],
      },

      {
        key: 'certificates',
        label: 'Certificates',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        role: 'certificates',
        crud: [
          {
            key: 'certificates_list',
            label: 'Certificates List',
            role: 'certificates_list',
            infoEng: 'It is used to grant access to the certificates list.',
            infoFren: 'It is used to grant access to the certificates list.',
          },
          {
            key: 'certificates_create',
            label: 'Certificates Create',
            role: 'certificates_create',
            infoEng: 'It is used to grant access to create the certificates.',
            infoFren: 'It is used to grant access to create the certificates.',
          },
          {
            key: 'certificates_update',
            label: 'Certificates Update',
            role: 'certificates_update',
            infoEng: 'It is used to grant access to update the certificates.',
            infoFren: 'It is used to grant access to update the certificates.',
          },
          {
            key: 'certificates_delete',
            label: 'Certificates Delete',
            role: 'certificates_delete',
            infoEng: 'It is used to grant access to delete the certificates.',
            infoFren: 'It is used to grant access to delete the certificates.',
          },
          {
            key: 'certificates_self_assigned',
            label: 'Self Assigned',
            role: 'certificates_self_assigned',
            infoEng: 'It is used to grant access only self assigned.',
            infoFren: 'It is used to grant access only self assigned.',
          },
        ],
      },
      {
        key: 'view-working-hours',
        role: 'view_working_hours',
        label: 'View Working Hours',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'view_working_hours_list',
            label: 'View Working Hours List',
            role: 'view_working_hours_list',
            infoEng:
              'It is used to grant access to the view working hours list.',
            infoFren:
              'It is used to grant access to the view working hours list.',
          },
        ],
      },
    ],
  },

  {
    key: 'hseq',
    role: 'hseq',
    label: 'HSEQ',
    children: [
      {
        key: 'sms_viewer',
        role: 'safety_management',
        label: 'SMS Viewer',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'sms_viewer_list',
            label: 'SMS Viewer List / View',
            role: 'sms_viewer_list',
            infoEng:
              'It is used to grant access to the safety publish document list.',
            infoFren:
              'It is used to grant access to the safety publish document list.',
          },
          // {
          //   key: 'sms_viewer_create',
          //   label: 'SMS Viewer Create',
          //   role: 'sms_viewer_create',
          //   infoEng:
          //     'It is used to grant access to create the safety publish document.',
          //   infoFren:
          //     'It is used to grant access to create the safety publish document.',
          // },
          {
            key: 'sms_viewer_update',
            label: 'SMS Viewer Update',
            role: 'sms_viewer_update',
            infoEng:
              'It is used to grant access to update the safety publish document.',
            infoFren:
              'It is used to grant access to update the safety publish document.',
          },
          {
            key: 'sms_viewer_delete',
            label: 'SMS Viewer Delete',
            role: 'sms_viewer_delete',
            infoEng:
              'It is used to grant access to delete the safety publish document.',
            infoFren:
              'It is used to grant access to delete the safety publish document.',
          },
        ],
      },
      {
        key: 'sms_forms',
        role: 'safety_management_forms',
        label: 'SMS Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'sms_forms_list',
            label: 'SMS Form List / View',
            role: 'sms_forms_list',
            infoEng:
              'It is used to grant access to the safety document list / view.',
            infoFren:
              'It is used to grant access to the safety document list / view.',
          },
          {
            key: 'sms_forms_create',
            label: 'SMS Form Create',
            role: 'sms_forms_create',
            infoEng:
              'It is used to grant access to create the safety document.',
            infoFren:
              'It is used to grant access to create the safety document.',
          },
          {
            key: 'sms_forms_update',
            label: 'SMS Form Update',
            role: 'sms_forms_update',
            infoEng:
              'It is used to grant access to update the safety document.',
            infoFren:
              'It is used to grant access to update the safety document.',
          },
          {
            key: 'sms_forms_delete',
            label: 'SMS Form Delete',
            role: 'sms_forms_delete',
            infoEng:
              'It is used to grant access to delete the safety document.',
            infoFren:
              'It is used to grant access to delete the safety document.',
          },
          {
            key: 'sms_closer_forms',
            label: 'SMS Closure Form',
            role: 'sms_closer_forms',
            infoEng: 'It is used to grant access to submit the closure form.',
            infoFren: 'It is used to grant access to submit the closure form.',
          },
          {
            key: 'sms_forms_revert',
            label: 'SMS Form Revert',
            role: 'sms_forms_revert',
            infoEng: 'It is used to grant access to revert the safety form.',
            infoFren: 'It is used to grant access to revert the safety form.',
          },
        ],
      },
    ],
  },
  {
    key: 'learning_management',
    role: 'learning_management',
    label: 'Learning Management',
    children: [
      {
        key: 'training-metrix',
        role: 'training_metrix',
        label: 'Training Matrix',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'training_metrix_view',
            label: 'View Training Matrix',
            role: 'training_metrix_view',
            infoEng: 'It is used to grant access to view the Training Matrix.',
            infoFren: 'It is used to grant access to view the Training Matrix.',
          },
          {
            key: 'training_metrix_manage',
            label: 'Manage Training Matrix',
            role: 'training_metrix_manage',
            infoEng:
              'It is used to grant access to the Training Matrix Manage.',
            infoFren:
              'It is used to grant access to the Training Matrix Manage.',
          },
        ],
      },
      {
        key: 'performance-evalution',
        role: 'performance_evalution',
        label: 'Performance Evalutions',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'performance_evalution_list',
            label: 'Performance Evalution List/View',
            role: 'performance_evalution_list',
            infoEng:
              'It is used to grant access to the Performance Evalution list / view.',
            infoFren:
              'It is used to grant access to the Performance Evalution list / view.',
          },
          {
            key: 'performance_evalution_create',
            label: 'Performance Evalution Create',
            role: 'performance_evalution_create',
            infoEng:
              'It is used to grant access to create the Performance Evalution.',
            infoFren:
              'It is used to grant access to create the Performance Evalution.',
          },
          {
            key: 'performance_evalution_update',
            label: 'Performance Evalution Update',
            role: 'performance_evalution_update',
            infoEng:
              'It is used to grant access to update the Performance Evalution.',
            infoFren:
              'It is used to grant access to update the Performance Evalution.',
          },
          {
            key: 'performance_evalution_delete',
            label: 'Performance Evalution Delete',
            role: 'performance_evalution_delete',
            infoEng:
              'It is used to grant access to delete the Performance Evalution.',
            infoFren:
              'It is used to grant access to delete the Performance Evalution.',
          },
        ],
      },
      {
        key: 'my_evalution',
        role: 'my_evalution',
        label: 'My Evalutions',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'my_evalution_list',
            label: 'My Evalution List/View',
            role: 'my_evalution_list',
            infoEng:
              'It is used to grant access to the My Evalution list / view.',
            infoFren:
              'It is used to grant access to the My Evalution list / view.',
          },
        ],
      },
      {
        key: 'goal',
        role: 'goal',
        label: 'Goals',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'goal_list',
            label: 'Goal List/View',
            role: 'goal_list',
            infoEng: 'It is used to grant access to the Goal list / view.',
            infoFren: 'It is used to grant access to the Goal list / view.',
          },
          {
            key: 'goal_create',
            label: 'Goal Create',
            role: 'goal_create',
            infoEng: 'It is used to grant access to create the Goal.',
            infoFren: 'It is used to grant access to create the Goal.',
          },
          {
            key: 'goal_update',
            label: 'Goal Update',
            role: 'goal_update',
            infoEng: 'It is used to grant access to update the Goal.',
            infoFren: 'It is used to grant access to update the Goal.',
          },
          {
            key: 'goal_self_assigned',
            label: 'Goal Self Assigned',
            role: 'goal_self_assigned',
            infoEng: 'It is used to grant access only self assigned.',
            infoFren: 'It is used to grant access only self assigned.',
          },
        ],
      },
    ],
  },
  {
    key: 'activity_log',
    role: 'activity_log',
    label: 'Activity Report',
    selectedRole: [],
    setImmediate: false,
    checkAll: false,
    crud: [
      {
        key: 'activity_log_list',
        label: 'Activity Report List/View',
        role: 'activity_log_list',
        infoEng:
          'It is used to grant access to the activity report list / view.',
        infoFren:
          'It is used to grant access to the activity report list / view.',
      },
      {
        key: 'activity_log_self_assigned',
        label: 'Self assigned',
        role: 'activity_log_self_assigned',
        infoEng: 'It is used to grant access only self assigned.',
        infoFren: 'It is used to grant access only self assigned.',
      },
    ],
  },
  {
    key: 'forms',
    role: 'forms',
    label: 'Forms',
    children: [
      {
        key: 'trip_form',
        role: 'trip_form',
        label: 'Voyage Form',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'trip_form_list',
            label: 'Voyage Form List/View',
            role: 'trip_form_list',
            infoEng:
              'It is used to grant access to the Voyage Forms list / view.',
            infoFren:
              'It is used to grant access to the Voyage Forms list / view.',
          },
        ],
      },
      {
        key: 'safety_forms',
        role: 'safety_forms',
        label: 'Safety Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'safety_forms_list',
            label: 'Safety Forms List/View',
            role: 'safety_forms_list',
            infoEng:
              'It is used to grant access to the safety forms list / view.',
            infoFren:
              'It is used to grant access to the safety forms list / view.',
          },
        ],
      },
      {
        key: 'create_vessel_form',
        role: 'create_vessel_form',
        label: 'Create Vessel Form',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'create_vessel_form_view',
            label: 'Vessel Form view',
            role: 'create_vessel_form_view',
            infoEng:
              'It is used to grant access to the vessel forms view page.',
            infoFren:
              'It is used to grant access to the vessel forms view page.',
          },
        ],
      },
      {
        key: 'evalution_forms',
        role: 'evalution_forms',
        label: 'Evalution Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'evalution_forms_list',
            label: 'Evalution Forms List/View',
            role: 'evalution_forms_list',
            infoEng:
              'It is used to grant access to the evalution forms list / view.',
            infoFren:
              'It is used to grant access to the evalution forms list / view.',
          },
        ],
      },
      {
        key: 'audit_report',
        role: 'audit_report',
        label: 'Audit Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'audit_report_list',
            label: 'Audit Report List/View',
            role: 'audit_report_list',
            infoEng:
              'It is used to grant access to the audit report list / view.',
            infoFren:
              'It is used to grant access to the audit report list / view.',
          },
        ],
      },
      {
        key: 'inspection_report',
        role: 'inspection_report',
        label: 'Inspection Report',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'inspection_report_list',
            label: 'Inspection Report List/View',
            role: 'inspection_report_list',
            infoEng:
              'It is used to grant access to the inspection report list / view.',
            infoFren:
              'It is used to grant access to the inspection report list / view.',
          },
        ],
      },
      {
        key: 'goals_forms',
        role: 'goals_forms',
        label: 'Goal Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'goals_forms_list',
            label: 'Goal Forms List/View',
            role: 'goals_forms_list',
            infoEng: 'It is used to grant access to the goals forms list.',
            infoFren: 'It is used to grant access to the goals forms list.',
          },
        ],
      },
      {
        key: 'deficiency_forms',
        role: 'deficiency_forms',
        label: 'Deficiency Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'deficiency_forms_list',
            label: 'Deficiency Forms List/View',
            role: 'deficiency_forms_list',
            infoEng:
              'It is used to grant access to the deficiency forms list / view.',
            infoFren:
              'It is used to grant access to the deficiency forms list / view.',
          },
        ],
      },
      {
        key: 'drill_forms',
        role: 'drill_forms',
        label: 'Drills Report',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'drill_forms_list',
            label: 'Drills Report List/View',
            role: 'drill_forms_list',
            infoEng:
              'It is used to grant access to the Drills report list / view.',
            infoFren:
              'It is used to grant access to the Drills report list / view.',
          },
        ],
      },
      {
        key: 'voyage_forms',
        role: 'voyage_forms',
        label: 'Voyage Forms',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'voyage_forms_list',
            label: 'Voyage Forms List/View',
            role: 'voyage_forms_list',
            infoEng:
              'It is used to grant access to the voyage forms list / view.',
            infoFren:
              'It is used to grant access to the voyage forms list / view.',
          },
        ],
      },
    ],
  },

  {
    key: 'elog_preference_gear_types',
    role: 'elog_preference_gear_types',
    label: 'Elog Preference',
    children: [
      {
        key: 'ports',
        role: 'ports',
        label: 'Ports',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'ports_list',
            label: 'Ports List',
            role: 'ports_list',
            infoEng: 'It is used to grant access to the ports list.',
            infoFren: 'It is used to grant access to the ports list.',
          },
          {
            key: 'ports_create',
            label: 'Ports create',
            role: 'ports_create',
            infoEng: 'It is used to grant access to create the ports.',
            infoFren: 'It is used to grant access to create the ports.',
          },
          {
            key: 'ports_update',
            label: 'Ports update',
            role: 'ports_update',
            infoEng: 'It is used to grant access to update the ports.',
            infoFren: 'It is used to grant access to update the ports.',
          },
          {
            key: 'ports_delete',
            label: 'Ports delete',
            role: 'ports_delete',
            infoEng: 'It is used to grant access to delete the ports.',
            infoFren: 'It is used to grant access to delete the ports.',
          },
        ],
      },
    ],
  },

  {
    key: 'role',
    role: 'role',
    label: 'Role Management',
    selectedRole: [],
    setImmediate: false,
    checkAll: false,
    crud: [
      {
        key: 'role_management_list',
        label: 'Role List',
        role: 'role_management_list',
        infoEng: 'It is used to grant access to the role management list page.',
        infoFren:
          'It is used to grant access to the role management list page.',
      },
      {
        key: 'role_create',
        label: 'Role Create',
        role: 'role_management_create',
        infoEng: 'It is used to grant access to create the user role.',
        infoFren: 'It is used to grant access to create the user role.',
      },
      {
        key: 'role_update',
        label: 'Role Update',
        role: 'role_management_update',
        infoEng: 'It is used to grant access to update the user role detail.',
        infoFren: 'It is used to grant access to update the user role detail.',
      },
      {
        key: 'role_delete',
        label: 'Role Delete',
        role: 'role_management_delete',
        infoEng: 'It is used to grant access to delete the user role.',
        infoFren: 'It is used to grant access to delete the user role.',
      },
    ],
  },

  {
    key: 'configuration',
    role: 'configuration',
    label: 'Configuration',
    children: [
      {
        key: 'configuration_position',
        role: 'positions',
        label: 'Manage Positions',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'position_list',
            label: 'Position List',
            role: 'position_list',
            infoEng:
              'It is used to grant access to the position trip list page.',
            infoFren:
              'It is used to grant access to the position trip list page.',
          },
          {
            key: 'position_create',
            label: 'Positiion Create',
            role: 'position_create',
            infoEng: 'It is used to grant access to create the position.',
            infoFren: 'It is used to grant access to create the position.',
          },
          {
            key: 'position_update',
            label: 'Position update',
            role: 'position_update',
            infoEng: 'It is used to grant access to update the position.',
            infoFren: 'It is used to grant access to update the position.',
          },
          {
            key: 'position_delete',
            label: 'Position Delete',
            role: 'position_delete',
            infoEng: 'It is used to grant access to delete the position.',
            infoFren: 'It is used to grant access to delete the position.',
          },
        ],
      },

      {
        key: 'configuration_department',
        role: 'departments',
        label: 'Manage Departments',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'department_list',
            label: 'Department List',
            role: 'department_list',
            infoEng: 'It is used to grant access to the department list page.',
            infoFren: 'It is used to grant access to the department list page.',
          },
          {
            key: 'department_create',
            label: 'Department Create',
            role: 'department_create',
            infoEng: 'It is used to grant access to create the department.',
            infoFren: 'It is used to grant access to create the department.',
          },
          {
            key: 'department_update',
            label: 'Department update',
            role: 'department_update',
            infoEng: 'It is used to grant access to update the department.',
            infoFren: 'It is used to grant access to update the department.',
          },
          {
            key: 'department_delete',
            label: 'Department Delete',
            role: 'department_delete',
            infoEng: 'It is used to grant access to delete the department.',
            infoFren: 'It is used to grant access to delete the department.',
          },
        ],
      },

      {
        key: 'configuration_locations',
        role: 'locations',
        label: 'Manage Locations',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'location_list',
            label: 'Locations List',
            role: 'location_list',
            infoEng: 'It is used to grant access to the location list page.',
            infoFren: 'It is used to grant access to the location list page.',
          },
          {
            key: 'location_create',
            label: 'Locations Create',
            role: 'location_create',
            infoEng: 'It is used to grant access to create the location.',
            infoFren: 'It is used to grant access to create the location.',
          },
          {
            key: 'location_update',
            label: 'Locations update',
            role: 'location_update',
            infoEng: 'It is used to grant access to update the location.',
            infoFren: 'It is used to grant access to update the location.',
          },
          {
            key: 'location_delete',
            label: 'Locations Delete',
            role: 'location_delete',
            infoEng: 'It is used to grant access to delete the location.',
            infoFren: 'It is used to grant access to delete the location.',
          },
        ],
      },
      {
        key: 'notification',
        role: 'notification',
        label: 'Manage Notifications',
        selectedRole: [],
        setImmediate: false,
        checkAll: false,
        crud: [
          {
            key: 'notifications_manage',
            label: 'Manage Notification Matrix',
            role: 'notifications_manage',
            infoEng: 'It is used to manage the notification matrix.',
            infoFren: 'It is used to manage the notification matrix.',
          },
        ],
      },
    ],
  },
];
