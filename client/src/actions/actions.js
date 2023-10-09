import axios from "axios";

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

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});
// request

// response

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const displayAlert = () => async (dispatch, getState) => {
  dispatch({ type: DISPLAY_ALERT });
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};

export const clearAlert = () => async (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 3000);
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const setupUser =
  ({ currentUser, endPoint, alertText }) =>
  async (dispatch, getState) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    dispatch(clearAlert());
    localStorage.setItem("dataItems", JSON.stringify(getState().data));
  };
export const toggleSidebar = () => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_SIDEBAR });
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const logoutUser = () => async (dispatch, getState) => {
  // await authFetch.get("/auth/logout");
  dispatch({ type: LOGOUT_USER });
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const updateUser = (currentUser) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_BEGIN });
  try {
    const { data } = await authFetch.patch("/auth/updateUser", currentUser);
    const { user, location } = data;

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { user, location },
    });
  } catch (error) {
    if (error.response.status !== 401) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  }
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const handleChange =
  ({ name, value }) =>
  async (dispatch, getState) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    localStorage.setItem("dataItems", JSON.stringify(getState().data));
  };
export const clearValues = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_VALUES });
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const createJob = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_JOB_BEGIN });
  try {
    const { position, company, jobLocation, jobType, status } = getState().data;
    await authFetch.post("/jobs", {
      position,
      company,
      jobLocation,
      jobType,
      status,
    });
    dispatch({ type: CREATE_JOB_SUCCESS });
    dispatch({ type: CLEAR_VALUES });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: CREATE_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const getJobs = () => async (dispatch, getState) => {
  const { page, search, searchStatus, searchType, sort } = getState().data;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  dispatch({ type: GET_JOBS_BEGIN });
  try {
    const { data } = await authFetch(url);
    const { jobs, totalJobs, numOfPages } = data;
    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: {
        jobs,
        totalJobs,
        numOfPages,
      },
    });
  } catch (error) {
    dispatch(logoutUser());
  }
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const setEditJob = (id) => async (dispatch, getState) => {
  dispatch({ type: SET_EDIT_JOB, payload: { id } });
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const editJob = () => async (dispatch, getState) => {
  dispatch({ type: EDIT_JOB_BEGIN });

  try {
    const { position, company, jobLocation, jobType, status, editJobId } =
      getState().data;
    await authFetch.patch(`/jobs/${editJobId}`, {
      company,
      position,
      jobLocation,
      jobType,
      status,
    });
    dispatch({ type: EDIT_JOB_SUCCESS });
    dispatch({ type: CLEAR_VALUES });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: EDIT_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const deleteJob = (jobId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_JOB_BEGIN });
  try {
    await authFetch.delete(`/jobs/${jobId}`);
    localStorage.setItem("dataItems", JSON.stringify(getState().data));
    dispatch(getJobs());
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: DELETE_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  dispatch(clearAlert());
};
export const showStats = () => async (dispatch, getState) => {
  dispatch({ type: SHOW_STATS_BEGIN });
  try {
    const { data } = await authFetch("/jobs/stats");
    dispatch({
      type: SHOW_STATS_SUCCESS,
      payload: {
        stats: data.defaultStats,
        monthlyApplications: data.monthlyApplications,
      },
    });
  } catch (error) {
    dispatch(logoutUser());
  }
  dispatch(clearAlert());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const clearFilters = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_FILTERS });
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const changePage = (page) => async (dispatch, getState) => {
  dispatch({ type: CHANGE_PAGE, payload: { page } });
  dispatch(getJobs());
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
export const getCurrentUser = () => async (dispatch, getState) => {
  dispatch({ type: GET_CURRENT_USER_BEGIN });
  try {
    const { data } = await authFetch("/auth/getCurrentUser");
    const { user, location } = data;

    dispatch({
      type: GET_CURRENT_USER_SUCCESS,
      payload: { user, location },
    });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch(logoutUser());
  }
  localStorage.setItem("dataItems", JSON.stringify(getState().data));
};
