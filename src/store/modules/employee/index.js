import axios from "axios";
import { handleError } from "@/services/handleError";
import * as acs from "@/store/modules/consts";
import FileSaver from "file-saver";

// const baseUrl = "http://localhost:5098/api/v1/employees";
const baseUrl =
  `${acs.BASE_URL}/api/v1/employees`;

const customConfig = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "ngrok-skip-browser-warning": "any",
  },
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
      handleError(error.response);
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
      handleError(error.response);
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
      handleError(error.response);
    }
  },
  async createEmployee({ commit }, employee) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.post(baseUrl, employee, customConfig);
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
        employee,
        customConfig
      );
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(res);
    } catch (e) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(e.response);
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
      handleError(error.response);
    }
  },
  async getRecommendCode({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}/code`, customConfig);
      commit(acs.SET_RECOMMEND_CODE_MUTATION, res.data);
    } catch (error) {
      handleError(error.response);
    }
  },
  async exportEmployees({ commit }, listIds) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await axios.post(
        `${baseUrl}/export`,
        {
          employeeIds: listIds,
        },
        {
          responseType: "blob",
          timeout: 30000,
        }
      );
      commit(acs.SET_LOADING_MUTATION, false);
      if (res.status == 200) {
        await FileSaver(res.data, "Danh-sach-can-bo-giao-vien.xlsx");
      }
      handleError(res);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.response);
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
