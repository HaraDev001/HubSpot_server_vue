<template>
  <div class="submit-endpoints-container">
    <div class="container">
      <el-input v-model="submitEndpointForm.lambdaUrl1" class="general-input" placeholder="Pause/Resume Recording Lambda URL" />
      <el-input v-model="submitEndpointForm.lambdaUrl2" class="general-input" placeholder="Fetching Call Recording Lambda URL" />
      <el-input v-model="submitEndpointForm.lambdaUrl3" class="general-input" placeholder="Fetching Chat Transcripts Lambda URL" />
      <el-input v-model="submitEndpointForm.awsConnectUrl" class="general-input" placeholder="AWS Connect URL" />
    </div>
    <div class="action">
      <el-button style="margin-top: 12px; width: 180px; height: 35px;" type="info" plain @click="previous">Prev</el-button>
      <el-button style="margin-top: 12px; margin-left: 10px; width: 180px; height: 35px;" type="info" @click="next">Next</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      submitEndpointForm: {
        lambdaUrl1: '',
        lambdaUrl2: '',
        lambdaUrl3: '',
        awsConnectUrl: '',
      },
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    previous() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep - 1;
      const params = {
        user_id: this.userId,
        current_step: currentTabStep,
      };
      axios.post('api/customer/setup-done', params).then(() => {
        this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
      });
    },
    next() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep + 1;
      const params = {
        user_id: this.userId,
        current_step: currentTabStep,
      };
      axios.post('api/customer/setup-done', params).then(() => {
        this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .submit-endpoints-container {
    padding-left: 50px;
    padding-right: 50px;
    .container {
      height: calc(100vh - 270px);
      .general-input {
        margin-top: 20px;
      }
    }
    .action {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
