const state = {
  setUpEnvironmentStep: 0,
};

const mutations = {
  SET_SETUPENVIRONMENTSTEP: (state, step) => {
    state.setUpEnvironmentStep = step;
  },
};

const actions = {
  setEnvironmentSetupStep({ commit }, step) {
    commit('SET_SETUPENVIRONMENTSTEP', step);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
