<template>
  <div class="app-container">
    <div ref="operateCon" class="operate-con">
      <div class="operate-con-left">全部列表</div>
      <div class="operate-con-right">
        <el-button>导出</el-button>
      </div>
    </div>
    <el-form ref="searchForm" class="search-con" size="mini" inline :model="searchForm">
      <div class="top-container">
        <div class="top-container-left">
          <el-form-item label="名字" prop="input">
            <el-input v-model="searchForm.input" size="mini"></el-input>
          </el-form-item>
        </div>

        <div class="top-container-right">
          <el-button
            size="mini"
            @click="clickMoreOptions"
            :icon="isShowOtherRow? 'el-icon-caret-bottom':'el-icon-caret-top'"
          >更多筛选</el-button>
        </div>
      </div>
      <div class="top-container-more">
        <transition name="fade">
          <div v-if="isShowOtherRow" class="search-cont-top-otherrow">
            <el-form-item label="1231">
              <el-input size="mini"></el-input>
            </el-form-item>
          </div>
        </transition>
      </div>
    </el-form>
    <el-table
      :data="listData"
      element-loading-text="loading"
      fit
      stripe
      border
      highlight-current-row
      class="table-con"
    >
      <el-table-column show-overflow-tooltip prop label="hhh" min-width="120"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowOtherRow: false,
      searchForm: {
        input: ""
      },
      listData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
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
    onReset() {
      this.currentPage = 1
      this.getListData()
    },
    getListData() {

    }


  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>