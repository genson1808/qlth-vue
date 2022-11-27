import axios from "axios";
import * as acs from "@/store/modules/consts"
import {handleError} from "@/services/handleError";

const baseUrl = "http://localhost:5098/api/v1/rooms";

const state = {
  data: {},
};

const mutations = {
  SET_ROOMS(state, payload) {
    state.data = payload;
  },
};

const actions = {
  async getRooms({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.get(baseUrl);

      commit(acs.SET_ROOMS_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message)
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
