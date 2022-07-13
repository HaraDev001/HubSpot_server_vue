<template>
  <div class="component-container">
    <div class="header">
      <P>USER</P>
      <el-button type="info" style="width: 30px; height:39px; margin-top: 11px;" plain><i class="el-icon-s-tools" style="margin-left: -6px;" /></el-button>
    </div>
    <div class="paymentHistory">
      <div class="content">
        <el-table
          :data="tableData"
          :show-header="false"
          style="width: 100%;"
        >
          <el-table-column
            width="calc(33.33%)"
          >
            <template slot-scope="scope">
              <span style="">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="calc(33.33%)"
          >
            <template slot-scope="scope">
              <span style="">{{ scope.row.joinedDate }}<br>Joined</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span style="">{{ scope.row.phoneNumber }}<br>Phone Number</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span style="">{{ scope.row.userStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button v-if="scope.row.userStatus === 'Hold'" style="margin-left: 15px; width: 80px;" type="info">Active</el-button>
              <el-button v-if="scope.row.userStatus !== 'Hold'" style="margin-left: 15px; width: 80px;" type="info">Hold</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminUserPage',
  data() {
    return {
      tableData: [{
        name: 'Jerry Mattedi',
        joinedDate: '13 aug 2018',
        phoneNumber: '251-661-5362',
        userStatus: 'All Setted',
      }, {
        name: 'ElianoraVasilov',
        joinedDate: '13 aug 2018',
        phoneNumber: '351-661-3252',
        userStatus: 'All Setted',
      }, {
        name: 'Marcos Anguiano',
        joinedDate: '13 aug 2018',
        phoneNumber: '251-661-5362',
        userStatus: 'Hold',
      }, {
        name: 'Alvis Daen',
        joinedDate: '13 aug 2018',
        phoneNumber: '351-661-3252',
        userStatus: 'All Setted',
      }, {
        name: 'Lissa Shipsey',
        joinedDate: '13 aug 2018',
        phoneNumber: '251-661-5362',
        userStatus: "Payment didn't subscibe",
      }],
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-container {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    .header {
      padding-bottom: 10px;
      font-size: 20px;
      color: gray;
      border-bottom: 1px solid rgb(229, 229, 229);
      display: flex;
      justify-content: space-between;
    }
    .action {
      margin-top: 50px;
    }
    .paymentHistory {
      margin-top: 20px;
      .header {
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 14px;
          color: rgb(107, 107, 107);
        }
      }
      .content {
        margin-top: 10px;
      }
    }
  }
</style>
