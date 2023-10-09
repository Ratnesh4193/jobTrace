import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "../constant/userConstants";

import {
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from "../constant/jobConstants";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "../constant/uiConstants";
export const initialState = {
  userLoading: false,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        data: {
          ...state.data,

          showAlert: true,
          alertType: "danger",
          alertText: "Please provide all values!",
        },
      };
    case CLEAR_ALERT:
      return {
        data: {
          ...state.data,
          showAlert: false,
          alertType: "",
          alertText: "",
        },
      };
    case SETUP_USER_BEGIN:
      return { data: { ...state.data, isLoading: true } };

    case SETUP_USER_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          userLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: "success",
          alertText: action.payload.alertText,
        },
      };
    case SETUP_USER_ERROR:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        },
      };
    case TOGGLE_SIDEBAR:
      return {
        data: {
          ...state.data,
          showSidebar: !state.data.showSidebar,
        },
      };
    case LOGOUT_USER:
      return {
        data: {
          ...initialState,
          userLoading: false,
        },
      };
    case UPDATE_USER_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
        },
      };
    case UPDATE_USER_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: "success",
          alertText: "User Profile Updated!",
        },
      };
    case UPDATE_USER_ERROR:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        },
      };
    case HANDLE_CHANGE:
      return {
        data: {
          ...state.data,
          page: 1,
          [action.payload.name]: action.payload.value,
        },
      };
    case CLEAR_VALUES:
      const initState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.data.userLocation,
        jobType: "full-time",
        status: "pending",
      };

      return {
        data: {
          ...state.data,
          ...initState,
        },
      };
    case CREATE_JOB_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
        },
      };
    case CREATE_JOB_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "New Job Created!",
        },
      };
    case CREATE_JOB_ERROR:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        },
      };
    case GET_JOBS_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
          showAlert: false,
        },
      };
    case GET_JOBS_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          jobs: action.payload.jobs,
          totalJobs: action.payload.totalJobs,
          numOfPages: action.payload.numOfPages,
        },
      };
    case SET_EDIT_JOB:
      const job = state.data.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        data: {
          ...state.data,
          isEditing: true,
          editJobId: _id,
          position,
          company,
          jobLocation,
          jobType,
          status,
        },
      };
    case DELETE_JOB_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
        },
      };
    case DELETE_JOB_ERROR:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        },
      };
    case EDIT_JOB_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
        },
      };
    case EDIT_JOB_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "Job Updated!",
        },
      };
    case EDIT_JOB_ERROR:
      return {
        data: {
          ...state.data,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        },
      };
    case SHOW_STATS_BEGIN:
      return {
        data: {
          ...state.data,
          isLoading: true,
          showAlert: false,
        },
      };
    case SHOW_STATS_SUCCESS:
      return {
        data: {
          ...state.data,
          isLoading: false,
          stats: action.payload.stats,
          monthlyApplications: action.payload.monthlyApplications,
        },
      };
    case CLEAR_FILTERS:
      return {
        data: {
          ...state.data,
          search: "",
          searchStatus: "all",
          searchType: "all",
          sort: "latest",
        },
      };
    case CHANGE_PAGE:
      return {
        data: {
          ...state.data,
          page: action.payload.page,
        },
      };
    case GET_CURRENT_USER_BEGIN:
      return {
        data: {
          ...state.data,
          userLoading: true,
          showAlert: false,
        },
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        data: {
          ...state.data,
          userLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
        },
      };
    default:
      return state;
  }
};
