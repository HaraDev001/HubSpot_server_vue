<template>
  <div class="general-container">
    <div class="content">
      <el-input v-model="generalForm.businessName" class="business-name" placeholder="Business Name" />
      <el-input v-model="generalForm.websiteLink" class="website-link" placeholder="Website Link" />
      <el-input v-model="generalForm.description" type="textarea" :rows="7" class="description" placeholder="Description" />
    </div>
    <div class="action">
      <el-button style="margin-top: 12px; width: 180px; height: 35px;" type="info" @click="save">Next</el-button>
      <el-button style="margin-top: 12px; margin-left: 10px; width: 180px; height: 35px;" type="info" plain>Cancel</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      generalForm: {
        businessName: '',
        websiteLink: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  created() {
    this.fetch();
  },
  methods: {
    next() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep + 1;
      this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
    },
    save() {
      const params = {
        business_name: this.generalForm.businessName,
        website_link: this.generalForm.websiteLink,
        description: this.generalForm.description,
        current_step: this.$store.state.clientView.setUpEnvironmentStep + 1,
      };
      axios.post('/api/customer', params).then((response) => {
        if (response.data.status === 'success') {
          this.next();
        }
      });
    },
    fetch() {
      axios.get('/api/customer/' + this.userId).then((response) => {
        this.generalForm.businessName = response.data.business_name;
        this.generalForm.description = response.data.description;
        this.generalForm.websiteLink = response.data.website_link;
        this.generalForm.current_step = response.data.current_step;
        this.$store.dispatch('clientView/setEnvironmentSetupStep', this.generalForm.current_step || 0);
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .general-container {
    padding-left: 50px;
    padding-right: 50px;
    .content {
       height: calc(100vh - 270px);
      .business-name {
        margin-top: 20px;
      }
      .website-link {
        margin-top: 20px;
      }
      .description {
        margin-top: 20px;
        height: 200px;
      }
    }
    .action {
      display: flex;
    }
  }
</style>
