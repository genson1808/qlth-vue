import axios from "axios";

const baseUrl = "http://localhost:5098/api/v1/rooms";

const state = {
  data: {},
};

const mutations = {
  GET_ROOMS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getRooms({ commit }) {
    try {
      commit("SET_LOADING", true);
      const res = await axios.get(baseUrl);

      commit("GET_ROOMS", res.data);
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
  rooms: (state) => state.data,
};

const roomModule = {
  state,
  mutations,
  actions,
  getters,
};

export default roomModule;
