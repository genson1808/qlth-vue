import axios from "axios";

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
    GET_EMPLOYEES(state, payload) {
        state.data = payload;
    },
    SET_PAGING(state, payload) {
        state.paging = payload;
    },
    SET_RECOMMENDCODE(state, payload) {
        state.recommendCode = payload;
    },
};

const actions = {
    async getEmployees({ commit }, { pageNumber, pageSize, filters, sorts }) {
        try {
            commit("SET_LOADING", true);
            const res = await axios.post(
                `${baseUrl}/paging?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    filters: filters,
                    sorts: sorts,
                },
                customConfig
            );
            commit("GET_EMPLOYEES", res.data);
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: "call get all",
                type: "info",
                message: "call thanh cong",
            });
        } catch (error) {
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: error.response.status,
                type: "error",
                message: error.response.data.UserMsg,
            });
            throw new Error(error);
        }
    },
    async removeEmployee({ commit }, employeeID) {
        try {
            commit("SET_LOADING", true);
            const res = await axios.delete(
                `${baseUrl}/${employeeID}`,
                customConfig
            );
            if (res.status == 200) {
                commit("ADD_TOAST", {
                    title: "Thành công",
                    type: "success",
                    message: "Xoá cán bộ, giáo viên thành công.",
                });
            } else {
                commit("ADD_TOAST", {
                    title: "Thất bại",
                    type: "error",
                    message: res.data.UserMsg,
                });
            }
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
    async removeEmployees({ commit }, employeeIDs) {
        try {
            commit("SET_LOADING", true);
            const res = await axios.delete(`${baseUrl}/multiple`, {
                data: employeeIDs,
            });
            if (res.status == 200) {
                commit("ADD_TOAST", {
                    title: "Thành công",
                    type: "success",
                    message: "Xoá cán bộ, giáo viên thành công.",
                });
            } else {
                commit("ADD_TOAST", {
                    title: "Thất bại",
                    type: "error",
                    message: res.data.UserMsg,
                });
            }
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
    async createEmployee({ commit }, employee) {
        try {
            commit("SET_LOADING", true);
            const res = await axios.post(baseUrl, employee);
            commit("SET_LOADING", false);
            console.log(res);
            if (res.status == 201) {
                commit("ADD_TOAST", {
                    title: "Thành công",
                    type: "success",
                    message: "thêm mới cán bộ, giáo viên thành công",
                });
            }
        } catch (e) {
            console.log(e);
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: e.response.status,
                type: "error",
                message: e.message,
            });
            throw new Error(JSON.stringify(e.response.data));
        }
    },
    setPaging({ commit }, paging) {
        commit("SET_PAGING", paging);
    },
    async loadEmployees({ commit, state }) {
        try {
            const paging = state.paging;
            commit("SET_LOADING", true);
            const res = await axios.post(
                `${baseUrl}/paging?pageNumber=${paging.pageNumber}&pageSize=${paging.pageSize}`,
                {
                    filters: paging.filters,
                    sorts: paging.sorts,
                },
                customConfig
            );
            commit("GET_EMPLOYEES", res.data);
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: "call get all",
                type: "info",
                message: "call thanh cong",
            });
        } catch (error) {
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: error.response.status,
                type: "error",
                message: error.message,
            });
            throw new Error(error);
        }
    },
    async getRecommendCode({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}/code`);
            commit("SET_RECOMMENDCODE", res.data);
        } catch (error) {
            commit("ADD_TOAST", {
                title: error.response.status,
                type: "error",
                message: error.response.data.UserMsg,
            });
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
