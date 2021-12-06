<template>
  <div>
    <div class="tab-list-content">
      <div class="box-body">
        <el-form :model="queryParams" label-width="68px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户名：">
                <treeselect
                  v-model="queryParams.user"
                  :options="userOptions"
                  :load-options="loadOptions"
                  :disable-branch-nodes="true"
                  noChildrenText="无"
                  :autoLoadRootOptions="false"
                  :searchable="false"
                  placeholder="请选择用户名"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="部门：">
                <treeselect
                  v-model="queryParams.office"
                  :options="officeOptions"
                  :disable-branch-nodes="true"
                  :disableBranchNodes="false"
                  :normalizer="normalizer"
                  noChildrenText="无"
                  placeholder="请选择部门"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="日期：">
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
          </el-row>
          <el-row>
            <el-form-item class="pull-right">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <el-table
        v-loading="loading"
        :data="testDataDemoData"
        border
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column
          prop="user.name"
          label="用户名"
          width="180px"
        ></el-table-column>
        <el-table-column label="名称" min-width="180px">
          <template v-slot="scope">
            <div
              class="linStyle"
              style="padding-left: 20px;"
              @click="handleSee(scope.row)"
              min-width="180px"
            >
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="inDate"
          label="日期"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="fileInfo"
          label="file_info"
          width="180px"
        ></el-table-column>
        <el-table-column label="操作" width="160">
          <template v-if="permissionBolean" slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type.js";
import { testDataDemoList, testDataDemoDelete } from "@/api/case/single";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import { officeTreeData } from "@/api/styem/dept";
import { userTreeData } from "@/api/styem/user";
import { officeList } from "@/api/styem/dept";
import { areaTreeData } from "@/api/styem/dept";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      queryParams: {
        user: undefined,
        office: undefined,
        name: undefined,
        inDate: undefined,
        beginPubDate: undefined,
        endPubDate: undefined,
        pageNo: 1,
        pageSize: 15
      },
      loading: true,
      testDataDemoData: [],
      total: 0,
      userOptions: [],
      officeOptions: [],
      areaOptions: [],
      sexArry: [],
      issueDate: undefined,
      normalizer(node) {
        return {
          label: node.name
        };
      }
    };
  },
  created() {
    this.getList();
    this.getDictList();
    this.getUserOfficeTree();
    this.getOfficeTree();
    this.getAreaTree();
  },
  mounted() {
    this.handlePermission(["test:testDataDemo:edit"]);
  },
  methods: {
    handlePermission(permissionsFlag) {
      const permissionBolean = this.hasPermission(permissionsFlag);
      this.permissionBolean = permissionBolean;
    },
    async getDictList() {
      const sexReponse = await dictListType({ type: "sex" });
      this.sexArry = sexReponse.data;
    },
    async getList() {
      this.loading = true;
      const reponse = await testDataDemoList(this.queryParams);
      if (reponse.code === 500 && reponse.msg === "操作权限不足") {
        this.$emit("handleSeeAmend", { tabState: "noListLimits" });
        return;
      } else {
        this.$emit("handleSeeAmend", {
          tabState: "ListLimits",
          name: this.permissionBolean
        });
      }
      this.testDataDemoData = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async getUserOfficeTree() {
      const reponse = await officeTreeData({ type: 2 });
      const userOptions = [];
      for (const item in reponse.data) {
        const subject = reponse.data[item];
        const temp = {
          id: subject.id,
          label: subject.name,
          children: null
        };
        userOptions.push(temp);
      }
      this.userOptions = userOptions;
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        userTreeData({ officeId: parentNode.id }).then(reponse => {
          const userOptions = [];
          for (const item in reponse.data) {
            const subject = reponse.data[item];
            const temp = {
              id: subject.id,
              label: subject.name
            };
            userOptions.push(temp);
          }
          parentNode.children = userOptions;
          callback();
        });
      }
    },
    async getOfficeTree() {
      const reponse = await officeList();
      const menu = this.handleTree(
        reponse.data,
        "id",
        "parentId",
        "children",
        "0"
      );
      this.officeOptions = menu;
    },
    async getAreaTree() {
      const reponse = await areaTreeData();
      const menu = this.handleTree(reponse.data, "id", "pId", "children", "0");
      this.areaOptions = menu;
    },
    issueDateChange(picker) {
      if (picker == null) {
        this.queryParams.beginPubDate = undefined;
        this.queryParams.endPubDate = undefined;
      } else {
        this.queryParams.beginPubDate = picker[0];
        this.queryParams.endPubDate = picker[1];
      }
    },
    onSubmit() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    handleSee(row) {
      const { id } = row;
      Bus.$emit("outComeSeeId", id);
      this.$emit("handleSeeAmend", { tabState: "see", name: "see" });
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outComeId", id);
      this.$emit("handleSeeAmend", { tabState: "amend", name: "add" });
    },
    handleDelete(row) {
      const { id } = row;
      MessageBox.confirm("是否要删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        testDataDemoDelete({ id }).then(reponse => {
          if (reponse.code == 200) {
            this.queryParams.pageNo = 1;
            this.getList(this.queryParams);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content {
  justify-content: flex-end;
  margin-left: 0px !important;
}
/deep/.el-link--inner {
  font-weight: bold;
  color: red;
}
</style>