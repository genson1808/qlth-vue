import axios from "axios";

const baseUrl = "http://localhost:5098/api/v1/departments";

const state = {
  data: {},
};

const mutations = {
  GET_DEPARTMENTS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getDepartments({ commit }) {
    try {
      commit("SET_LOADING", true);
      const res = await axios.get(baseUrl);

      commit("GET_DEPARTMENTS", res.data);
      commit("SET_LOADING", false);
    } catch (error) {
      commit("SET_LOADING", false);
      commit("ADD_TOAST", {
        title: error.response.status,
        type: "error",
        message: error.message,
      });
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
