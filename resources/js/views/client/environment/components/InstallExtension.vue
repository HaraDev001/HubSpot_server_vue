<template>
  <div class="install-extension-container">
    <div class="container">
      <div class="notify">
        Please install the chrome extension to setup the App into your Hubspot
      </div>
      <div class="action">
        <el-button type="info">Download Chrome Extension</el-button>
        <el-button style="margin-left: 20px;" type="info">Download Guide</el-button>
      </div>
    </div>
    <div class="footer">
      <el-button style="margin-top: 12px; width: 180px; height: 35px;" type="info" plain @click="previous">Prev</el-button>
      <el-button style="margin-top: 12px; margin-left: 10px; width: 180px; height: 35px;" type="info" @click="next">Next</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import PanThumb from '@/components/PanThumb';
// import GithubCorner from '@/components/GithubCorner';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters([
      'userId',
    ]),
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
      this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);

      const params = {
        user_id: this.userId,
        current_step: currentTabStep,
      };

      axios.post('api/customer/setup-done', params).then(() => {
        // window.location.href = '/#/client/payment/index';
        this.$router.push('/client/payment/index');
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .install-extension-container {
    padding-left: 50px;
    padding-right: 50px;
    .container {
      height: calc(100vh - 270px);
      .notify {
        font-size: 14px;
        padding-top: 50px;
      }
      .action {
        margin-top: 30px;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
