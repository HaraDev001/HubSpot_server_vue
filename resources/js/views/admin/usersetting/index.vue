<template>
  <div class="component-container">
    <div class="container">
      <div class="userSetting" :span="18">
        <div class="header">
          User Setting
        </div>
        <div class="content">
          <el-input v-model="password.oldPassword" type="password" class="general-input" placeholder="Old Password" />
          <el-input v-model="password.newPassword" type="password" class="general-input" placeholder="New Password" />
          <el-input v-model="password.confirmPassword" type="password" class="general-input" placeholder="Confirm Password" />
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="info" style="width: 180px; height: 35px;">Save</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminUserSetting',
  data() {
    return {
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
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
    .container {
      display:  flex;
      height: calc(100vh - 270px);
      width: 100%;
      .header {
        padding-bottom: 10px;
        font-size: 20px;
        color: gray;
        border-bottom: 1px solid rgb(229, 229, 229);
      }
      .userSetting {
        width: calc(60%);
      }
      .general-input {
        margin-top: 20px;
      }
    }
  }
</style>
