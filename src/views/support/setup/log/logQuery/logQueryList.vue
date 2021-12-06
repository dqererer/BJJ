<template>
  <div class="tab-list-content">
    <div class="box-body">
      <el-form :model="geoCategoryParams" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作菜单：">
              <el-input placeholder="请输入操作菜单" v-model="geoCategoryParams.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日志类型：">
              <el-select
                v-model="geoCategoryParams.type"
                placeholder="请选择日志类型"
              >
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in logTypeData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="请求地址：">
              <el-input placeholder="请输入请求地址" v-model="geoCategoryParams.requestUri"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          
          <el-col :span="8">
            <el-form-item label="日志时间：">
              <el-date-picker
                v-model="issueDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="issueDateChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-checkbox
              style="margin-left:34px;margin-top:8px;"
              v-model="geoCategoryParams.exception"
              >只查询异常信息</el-checkbox
            >
          </el-col>
          <el-form-item style="float:right;margin:0px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onClear">清空</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="spaceTableData"
      v-loading="loading"
      border
      style="width: 100%"
      :stripe="true"
    >
      <el-table-column
        prop="title"
        min-width="200"
        :show-overflow-tooltip="true"
        label="操作菜单"
      >
      </el-table-column>
      <el-table-column
        prop="createName"
        label="操作用户"
        width="180"
      ></el-table-column>
      <el-table-column label="类型" width="140">
        <template slot-scope="scope">
          {{ typeChange(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="params"
        :show-overflow-tooltip="true"
        label="参数"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="requestUri"
        :show-overflow-tooltip="true"
        label="请求地址"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="exception"
        label="异常信息"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="remoteAddr"
        label="操作者IP"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="操作时间"
        width="180"
      ></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :pageNo.sync="geoCategoryParams.pageNo"
      :limit.sync="geoCategoryParams.pageSize"
      @pagination="getLogList"
    />
  </div>
</template>
  
<script>
import { logList } from "@/api/styem/log";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      loading: true,
      spaceTableData: [],
      total: 0,
      logTypeData: [
        { value: "LOGIN", name: "登录" },
        { value: "INSERT", name: "添加" },
        { value: "UPDATE", name: "更新" },
        { value: "DELETE", name: "删除" },
        { value: "QUERY", name: "查询" },
        { value: "PERMS", name: "权限修改" },
        { value: "ERROR", name: "错误日志" },
        { value: "OTHER", name: "其他" }
      ],
      geoCategoryParams: {
        pageNo: 1,
        pageSize: 15,
        title: undefined,
        type: undefined,
        requestUri: undefined,
        beginDate: undefined,
        endDate: undefined,
        exception: undefined
      },
      issueDate: undefined
    };
  },
  created() {
    this.getLogList();
    this.createTime();
    this.onClear();
  },
  activated () {
    this.onClear();
  },
  methods: {
    createTime() {
      const end = new Date();
      const nowMonth = end.getMonth(); //当前月 
      const nowYear = end.getFullYear(); //当前年 
      const monthStartDate = new Date(nowYear, nowMonth, 1); 
      const monthEndDate = new Date(nowYear, nowMonth+1, 0);
      this.issueDate = [monthStartDate, monthEndDate];
      this.geoCategoryParams.beginDate = this.format(monthStartDate,"yyyy-MM-dd");//yyyy-MM-dd hh:mm:ss
      this.geoCategoryParams.endDate = this.format(monthEndDate,"yyyy-MM-dd");
    },
    async getLogList() {
      this.loading = true;
      const reponse = await logList(this.geoCategoryParams);
      this.spaceTableData = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    onSubmit() {
      if (this.geoCategoryParams.exception === true) {
        this.geoCategoryParams.exception = 1;
      } else {
        this.geoCategoryParams.exception = undefined;
      }
      this.geoCategoryParams.pageNo = 1;
      this.getLogList();
    },
    onClear() {
      this.geoCategoryParams.pageNo = 1;
      this.geoCategoryParams.title = undefined;
      this.geoCategoryParams.type = undefined;
      this.geoCategoryParams.requestUri = undefined;
      this.geoCategoryParams.beginDate = undefined;
      this.geoCategoryParams.endDate = undefined;
      this.geoCategoryParams.exception = undefined;
      this.issueDate = undefined;
      this.getLogList();
    },
    typeChange(val) {
      if (val === "LOGIN") {
        return "登录";
      } else if (val === "INSERT") {
        return "添加";
      }
      if (val === "UPDATE") {
        return "更新";
      }
      if (val === "DELETE") {
        return "删除";
      }
      if (val === "QUERY") {
        return "查询";
      }
      if (val === "PERMS") {
        return "权限修改";
      }
      if (val === "ERROR") {
        return "错误日志";
      } else {
        return "其他";
      }
    },
    issueDateChange(picker) {
      if (picker == null) {
        this.geoCategoryParams.beginDate = undefined;
        this.geoCategoryParams.endDate = undefined;
      } else {
        this.geoCategoryParams.beginDate = picker[0];
        this.geoCategoryParams.endDate = picker[1];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>