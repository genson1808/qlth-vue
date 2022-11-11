import axios from "axios";

const baseUrl = "http://localhost:5098/api/v1/employees";

const state = {
    loading: false,
    toasts: [],
    noData: {
        overview: true,
        device: true,
        borrowAndGiveBack: true,
        report: false,
        system: false,
    },
};

const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    ADD_TOAST(state, payload) {
        state.toasts.push(payload);
    },
    CLEAR_TOAST(state, payload) {
        const index = state.toasts.findIndex(
            (toast) => toast.title === payload
        ); // find toast
        state.toasts.splice(index, 1); // remove toast from array
        state.toasts = [];
    },
    SET_NO_DATA(state, payload) {
        switch (payload.name) {
            case "overview":
                state.noData.overview = payload.value;
                break;
            case "device":
                state.noData.device = payload.value;
                break;
            case "borrowAndGiveBack":
                state.noData.borrowAndGiveBack = payload.value;
                break;
            case "system":
                state.noData.system = payload.value;
                break;
        }
    },
};

const actions = {
    setLoading({ commit }, isLoading) {
        commit("GET_EMPLOYEES", isLoading);
    },
    addToast({ commit }, toast) {
        commit("ADD_TOAST", toast);
    },
    clearToast({ commit }, title) {
        commit("CLEAR_TOAST", title);
    },
    SET_NO_DATA({commit}, {name, value}){
        commit("SET_NO_DATA", {name, value});
    }
};

const getters = {
    isLoading: (state) => state.loading,
    toasts: (state) => state.toasts,
    noData: (state) => state.noData,
};

const globalModule = {
    state,
    mutations,
    actions,
    getters,
};

export default globalModule;
