<template>
  <div class="component-container">
    <div class="container">
      <div class="userSetting" :span="18">
        <div class="header">
          User Setting
        </div>
        <div class="content">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <el-input v-model="password.oldPassword" type="password" class="general-input" placeholder="Old Password" />
          <el-input v-model="password.newPassword" type="password" class="general-input" placeholder="New Password" />
          <el-input v-model="password.confirmPassword" type="password" class="general-input" placeholder="Confirm Password" />
        </div>
      </div>
      <div class="support" :span="6">
        <div class="header">
          Support
        </div>
        <div class="content">
          Please call to +1 8133037545
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="info" style="width: 180px; height: 35px;" @click="save">Save</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ClientAppSetting',
  data() {
    return {
      errors: [],
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    save: function(e) {
      this.errors = [];
      e.preventDefault();
      axios.post('api/customer/change_password', this.password)
        .then((response) => {
          if (response.data.success) {
            this.password.oldPassword = '';
            this.password.newPassword = '';
            this.password.confirmPassword = '';
            this.$swal('Password Changed!', response.data.success, 'success');
            setTimeout(function(){
              window.location.reload();
            }, 1500);
          }
          if (!this.errors.length) {
            return true;
          }
        }).catch(function(error) {
          if (error.response) {
            if (error.response.data.error.oldPassword) {
              this.errors.push(error.response.data.error.oldPassword[0]);
            }
            if (error.response.data.error.newPassword) {
              this.errors.push(error.response.data.error.newPassword[0]);
            }
            if (error.response.data.error.confirmPassword) {
              this.errors.push(error.response.data.error.confirmPassword[0]);
            }
            if (error.response.data.error.current_password){
              this.errors.push(error.response.data.error.current_password);
            }
          }
        }.bind(this));
    },
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
      .support {
        width: calc(40%);
        padding-left: 30px;
        .content {
          font-size: 14px;
          margin-top: 20px;
        }
      }
      .general-input {
        margin-top: 20px;
      }
    }
  }
</style>
