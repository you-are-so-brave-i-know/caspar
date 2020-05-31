<template>
  <div class="app-container">
    <div ref="operateCon" class="operate-con">
      <!-- <div class="operate-con-left">用户管理</div> -->
      <div class="operate-con-right">
        <!-- <el-button>导出</el-button> -->
      </div>
    </div>
    <el-form
      ref="searchForm"
      class="search-con"
      size="mini"
      inline
      :model="searchForm"
      label-width="85px"
    >
      <div class="top-container">
        <div class="top-container-left">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="searchForm.userName" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="searchForm.email" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="getListData">查询</el-button>
          </el-form-item>
        </div>

        <!-- <div class="top-container-right">
          <el-button
            size="mini"
            @click="clickMoreOptions"
            :icon="isShowOtherRow? 'el-icon-caret-bottom':'el-icon-caret-top'"
          >更多筛选</el-button>
        </div>-->
      </div>
      <!-- <div class="top-container-more">
        <transition name="fade">
          <div v-if="isShowOtherRow" class="search-cont-top-otherrow">
            <el-form-item label="1231">
              <el-input size="mini"></el-input>
            </el-form-item>
          </div>
        </transition>
      </div>-->
    </el-form>
    <el-table
      :data="listData"
      element-loading-text="loading"
      fit
      stripe
      border
      highlight-current-row
      class="table-con"
      v-loading="listLoading"
    >
      <el-table-column show-overflow-tooltip prop="id" label="id" min-width="50"></el-table-column>
      <el-table-column show-overflow-tooltip prop="username" label="用户名称" min-width="120"></el-table-column>
      <el-table-column show-overflow-tooltip prop="email" label="邮箱地址" min-width="120"></el-table-column>
      <el-table-column show-overflow-tooltip prop="state" label="登录状态" min-width="120">
        <template slot-scope="scope">{{scope.row.state?'已登录':'未登录'}}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="root" label="是否管理员" min-width="120">
        <template slot-scope="scope">{{scope.row.root?'是':'否'}}</template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="create_time"
        label="创建时间"
        min-width="120"
        :formatter="formmatTime"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="240" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" plain>查看</el-button> -->
          <!-- <el-button size="small" type="primary" plain @click="onOperate(scope.row,'edit')">编辑</el-button> -->
          <el-button size="small" type="warning" plain @click="onOperate(scope.row,'reset')">重置密码</el-button>
          <el-button size="small" type="danger" plain @click="onOperate(scope.row,'del')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-con"
      background
      layout="total,sizes,prev,pager,next,jumper"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10,20,30,50]"
      :total="total"
      @size-change="handleSizeChange"
      @current-cahnge="handleCurrentChange"
    ></el-pagination>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="400px"
      class="dialog-con"
    >
      <div v-loading="dialog.loding">
        <el-form ref="dialogForm" inline :model="dialog.form">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="dialog.form.username"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog.visible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialog.visible = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getParam } from "@/utils/validate"
import { formatSqlDate } from "@/utils/formatter"
export default {
  data() {
    return {
      isShowOtherRow: false,
      searchForm: {
        email: '',
        userName: '',
      },
      listData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      listLoading: false,
      dialog: {
        visible: false,
        title: '用户编辑',
        form: {
          username: '',
          password: '',
          email: ''
        },
        loading: false
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getListData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getListData()
    },
    clickMoreOptions() {
      this.isShowOtherRow = !this.isShowOtherRow
    },
    formmatTime(row) {
      return formatSqlDate(row.create_time)
    },
    onReset() {
      this.currentPage = 1
      this.getListData()
    },
    onOperate(row, type) {
      if (type == 'edit') {
        this.dialog.visible = true
        this.dialog.title = "用户信息编辑"
        this.dialog.form = row
      } else if (type == "reset") {
        this.$confirm('确认重置该用户密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = getParam({ id: row.id })
          this.$axios.get('/api/manage/resetUser' + param).then(res => {
            if (res.data.status == 200) {
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          }).finally(() => {
            this.getListData()
          })
        }).catch(() => {
        });
      } else if (type == "del") {
        this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = getParam({ id: row.id })
          this.$axios.get('/api/manage/delUser' + param).then(res => {
            if (res.data.status == 200) {
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          }).finally(() => {
            this.getListData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    getListData() {
      const params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        email: this.searchForm.email,
        username: this.searchForm.userName,
      }
      const param = getParam(params)
      this.listLoading = true
      this.$axios.get('/api/manage/userList' + param).then(res => {
        if (res.data.status == 200) {
          this.listData = res.data.list
          this.total = res.data.count
        }

      }).catch(err => {
        this.$message(err.msg)
      }).finally(() => {
        this.listLoading = false
      })
    },
  },
  mounted() {
    this.getListData()
  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>