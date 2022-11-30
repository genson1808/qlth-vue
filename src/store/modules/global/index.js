import * as acs from "@/store/modules/consts.js";
import * as rs from "@/router/consts.js";
const state = {
  loading: false,
  toasts: [],
  noData: {
    overview: true,
    device: true,
    borrowAndGiveBack: true,
    report: false,
    system: false,
  },
  errs: [],
};

const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERRORS(state, payload) {
    state.errs = payload;
  },
  ADD_TOAST(state, payload) {
    state.toasts.push(payload);
  },
  CLEAR_TOAST(state, payload) {
    const index = state.toasts.findIndex((toast) => toast.title === payload); // find toast
    state.toasts.splice(index, 1); // remove toast from array
    state.toasts = [];
  },
  SET_NO_DATA(state, payload) {
    switch (payload.name) {
      case rs.OVERVIEW_NAME:
        state.noData.overview = payload.value;
        break;
      case rs.DEVICE_NAME:
        state.noData.device = payload.value;
        break;
      case rs.BORROW_AND_GIVE_BACK_NAME:
        state.noData.borrowAndGiveBack = payload.value;
        break;
      case rs.SYSTEM_NAME:
        state.noData.system = payload.value;
        break;
      case rs.REPORT_NAME:
        state.noData.report = payload.value;
        break;
    }
  },
};

const actions = {
  setLoading({ commit }, isLoading) {
    commit(acs.GET_EMPLOYEES_MUTATION, isLoading);
  },
  setErrors({ commit }, errors) {
    commit(acs.SET_ERRORS_MUTATION, errors);
  },
  addToast({ commit }, toast) {
    commit(acs.ADD_TOAST_MUTATION, toast);
  },
  clearToast({ commit }, title) {
    commit(acs.CLEAR_TOAST_MUTATION, title);
  },
  setNoData({ commit }, { name, value }) {
    commit(acs.SET_NO_DATA_MUTATION, { name, value });
  },
};

const getters = {
  isLoading: (state) => state.loading,
  toasts: (state) => state.toasts,
  noData: (state) => state.noData,
  errs: (state) => state.errs,
};

const globalModule = {
  state,
  mutations,
  actions,
  getters,
};

export default globalModule;
