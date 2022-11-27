import axios from "axios";
import { handleError } from "@/services/handleError";
import * as acs from "@/store/modules/consts";
import { SET_RECOMMEND_CODE_MUTATION } from "@/store/modules/consts";

const baseUrl = "http://localhost:5098/api/v1/employees";

const customConfig = {
  headers: { "Content-Type": "application/json; charset=utf-8" },
};

const state = {
  data: {},
  paging: {
    pageNumber: 1,
    pageSize: 20,
    filters: {},
    sorts: {},
  },
  recommendCode: "",
};

const mutations = {
  SET_EMPLOYEES(state, payload) {
    state.data = payload;
  },
  SET_PAGING(state, payload) {
    state.paging = payload;
  },
  SET_RECOMMEND_CODE(state, payload) {
    state.recommendCode = payload;
  },
};

const actions = {
  async getEmployees({ commit }, { pageNumber, pageSize, filters, sorts }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.post(
        `${baseUrl}/paging?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          filters: filters,
          sorts: sorts,
        },
        customConfig
      );
      commit(acs.SET_EMPLOYEES_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
    }
  },
  async removeEmployee({ commit }, employeeID) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.delete(`${baseUrl}/${employeeID}`, customConfig);
      handleError(res);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
    }
  },
  async removeEmployees({ commit }, employeeIDs) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.delete(`${baseUrl}/multiple`, {
        data: employeeIDs,
      });
      handleError(res);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
    }
  },
  async createEmployee({ commit }, employee) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.post(baseUrl, employee);
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(res);
    } catch (e) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(e.response);
      throw new Error(JSON.stringify(e.response.data));
    }
  },
  async updateEmployee({ commit }, employee) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.put(
        `${baseUrl}/${employee.employeeID}`,
        employee
      );
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(res);
    } catch (e) {
      debugger;
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(e.message);
      throw new Error(JSON.stringify(e.response.data));
    }
  },
  setPaging({ commit }, paging) {
    commit(acs.SET_PAGING_MUTATION, paging);
  },
  reloadPaging({ commit, state }) {
    var newPaging = {
      pageNumber: state.data.pageNumber,
      pageSize: state.data.pageSize,
      filters: state.paging.filters,
      sorts: state.paging.sorts,
    };
    commit(acs.SET_PAGING_MUTATION, newPaging);
  },
  async loadEmployees({ commit, state }) {
    try {
      const paging = state.paging;
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.post(
        `${baseUrl}/paging?pageNumber=${paging.pageNumber}&pageSize=${paging.pageSize}`,
        {
          filters: paging.filters,
          sorts: paging.sorts,
        },
        customConfig
      );
      commit(acs.SET_EMPLOYEES_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.message);
    }
  },
  async getRecommendCode({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}/code`);
      commit(acs.SET_RECOMMEND_CODE_MUTATION, res.data);
    } catch (error) {
      handleError(error.message);
    }
  },
};

const getters = {
  employees: (state) => state.data,
  employeePaging: (state) => state.paging,
  recommendCode: (state) => state.recommendCode,
};

const employeeModule = {
  state,
  mutations,
  actions,
  getters,
};

export default employeeModule;
