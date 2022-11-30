import axios from "axios";
import { handleError } from "@/services/handleError";
import * as acs from "@/store/modules/consts";

// const baseUrl = "http://localhost:5098/api/v1/departments";
const baseUrl =
  `${acs.BASE_URL}/api/v1/departments`;

const customConfig = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "ngrok-skip-browser-warning": "any",
  },
};

const state = {
  data: {},
};

const mutations = {
  SET_DEPARTMENTS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getDepartments({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.get(baseUrl, customConfig);

      commit(acs.SET_DEPARTMENTS_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
    }
  },
};

const getters = {
  departments: (state) => state.data,
};

const departmentModule = {
  state,
  mutations,
  actions,
  getters,
};

export default departmentModule;
