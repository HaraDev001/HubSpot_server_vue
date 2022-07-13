<template>
  <div class="component-container">
    <el-steps :active="currentTabStep" finish-status="success">
      <el-step title="General" />
      <el-step title="Install Services" />
      <el-step title="Submit Endpoints" />
      <el-step title="Payment" />
      <el-step title="Install Extension" />
    </el-steps>
    <general v-if="currentTabStep === 0" />
    <discuss v-if="currentTabStep === 1" />
    <submit-endpoints v-if="currentTabStep === 2" />
    <payment v-if="currentTabStep === 3" />
    <install-extension v-if="currentTabStep === 4" />
    <!-- <el-button style="margin-top: 12px;" @click="next">Next step</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import PanThumb from '@/components/PanThumb';
// import GithubCorner from '@/components/GithubCorner';
import Discuss from './components/Discuss';
import General from './components/General';
import InstallExtension from './components/InstallExtension.vue';
import Payment from './components/Payment.vue';
import SubmitEndpoints from './components/SubmitEndpoints.vue';

export default {
  name: 'ClientEnvironment',
  components: {
    Discuss,
    General,
    Payment,
    InstallExtension,
    SubmitEndpoints,
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapGetters([
      'customer',
    ]),
    currentTabStep() {
      return this.$store.state.clientView.setUpEnvironmentStep;
    },
  },
  created() {
    if (this.customer && this.customer.current_step > 4) {
      // this.$store.dispatch('clientView/setEnvironmentSetupStep', this.customer.current_step);
      this.$router.push('/client/payment/index');
      // window.location.href = '/#/client/payment/index/';
    }
  },
  methods: {
    next() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep + 1;
      this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
      if (this.active++ > 4) {
        this.active = 0;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-container {
    padding: 50px 60px 0px;
  }
</style>
