import axios from "axios";

const baseUrl = "http://localhost:5098/api/v1/subjects";

const state = {
  data: {},
};

const mutations = {
  GET_SUBJECTS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getSubjects({ commit }) {
    try {
      commit("SET_LOADING", true);
      const res = await axios.get(baseUrl);

      commit("GET_SUBJECTS", res.data);
      commit("SET_LOADING", false);
    } catch (error) {
      commit("SET_LOADING", false);
      commit("ADD_TOAST", {
        title: error.response.statusText,
        type: "error",
        message: error.message,
      });
    }
  },
};

const getters = {
  subjects: (state) => state.data,
};

const subjectModule = {
  state,
  mutations,
  actions,
  getters,
};

export default subjectModule;
