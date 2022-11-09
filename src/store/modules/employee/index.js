import axios from "axios";

const baseUrl = "http://localhost:5098/api/v1/employees";

const customConfig = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
};

const state = {
    data: {},
};

const mutations = {
    GET_EMPLOYEES(state, payload) {
        state.data = payload;
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
        } catch (error) {
            commit("SET_LOADING", false);
            commit("ADD_TOAST", {
                title: error.response.statusText,
                type: "error",
                message: error.message,
            });
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
            const res = await axios.delete(
                `${baseUrl}/multiple`,
                { data: employeeIDs },
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
};

const getters = {
    employees: (state) => state.data,
};

const employeeModule = {
    state,
    mutations,
    actions,
    getters,
};

export default employeeModule;
