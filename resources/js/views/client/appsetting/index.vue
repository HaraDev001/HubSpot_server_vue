<template>
  <div class="component-container">
    <div class="header">
      App Setting
    </div>
    <div class="container" :span="18">
      <el-input v-model="submitEndpointForm.lambda1" class="general-input" placeholder="Pause/Resume Recording Lambda URL" />
      <el-input v-model="submitEndpointForm.lambda2" class="general-input" placeholder="Fetching Call Recording Lambda URL" />
      <el-input v-model="submitEndpointForm.lambda3" class="general-input" placeholder="Fetching Chat Transcripts Lambda URL" />
      <el-input v-model="submitEndpointForm.awsCCPLoginURL" class="general-input" placeholder="AWS CCP Login URL" />
    </div>
    <div class="footer">
      <el-button type="info">Download Chrome Extension</el-button>
      <el-button type="info" style="width: 180px; height: 35px;">Save</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ClientAppSetting',
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
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-container {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    width: calc(70%);
    .header {
      padding-bottom: 10px;
      font-size: 20px;
      color: gray;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
    .container {
      height: calc(100vh - 270px);
      .general-input {
        margin-top: 20px;
      }
    }
    .footer {
    }
  }
</style>
