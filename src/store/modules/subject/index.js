import axios from "axios";
import * as acs from "@/store/modules/consts.js";
import { handleError } from "@/services/handleError";

// const baseUrl = "http://localhost:5098/api/v1/subjects";
const baseUrl = `${acs.BASE_URL}/api/v1/subjects`;

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
  SET_SUBJECTS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getSubjects({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.get(baseUrl, customConfig);

      commit(acs.SET_SUBJECTS_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
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
