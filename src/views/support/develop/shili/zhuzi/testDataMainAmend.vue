<template>
  <div class="amend-content">
    <el-form ref="amendForm" :rules="rules" :model="form" label-width="160px">
      <el-row>
        <el-col :span="20">
          <el-form-item prop="user" label="归属用户：">
            <treeselect
              v-model="form.user"
              :options="userOptions"
              :load-options="loadOptions"
              :disable-branch-nodes="true"
              noChildrenText="无"
              :autoLoadRootOptions="false"
              :searchable="false"
              placeholder="请选择归属用户"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="office" label="归属部门：">
            <treeselect
              v-model="form.office"
              :options="officeOptions"
              :disable-branch-nodes="true"
              :disableBranchNodes="false"
              :normalizer="normalizer"
              noChildrenText="无"
              placeholder="请选择归属部门"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="area" label="归属区域：">
            <treeselect
              v-model="form.area"
              :options="areaOptions"
              :disable-branch-nodes="true"
              :disableBranchNodes="false"
              :normalizer="normalizer"
              noChildrenText="无"
              placeholder="请选择归属区域"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="name" label="名称：">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="sex" label="性别：">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in sexArry"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="inDate" label="加入日期：">
            <el-date-picker
              v-model="form.inDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择加入日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="remarks" label="备注信息：">
            <el-input
              type="textarea"
              v-model="form.remarks"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h1 class="business-title">业务数据子表：</h1>

      <el-table
        border
        :data="form.testDataChildList"
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column label="名称" min-width="180px">
          <template v-slot="scope">
            <el-input
              v-model="form.testDataChildList[scope.$index].name"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" min-width="180px">
          <template v-slot="scope">
            <el-input
              v-model="form.testDataChildList[scope.$index].remarks"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="60px">
          <template v-slot="scope">
            <svg-icon
              @click="handleDeleteClick(scope.$index)"
              :iconClass="IconComputed(scope.$index)"
              class="el-input__icon"
              style="height: 32px;width: 32px;"
            ></svg-icon>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="handleChildClick"
        >新增</el-button
      >
      <el-row class="margin20">
        <el-form-item class="tab-list-state">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="handleBackClick">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type.js";
import { testDataMainSave, testDataMainSee } from "@/api/case/master";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import { officeTreeData } from "@/api/styem/dept";
import { userTreeData } from "@/api/styem/user";
import { officeList } from "@/api/styem/dept";
import { areaTreeData } from "@/api/styem/dept";
import Bus from "@/utils/vueBus";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      form: {
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        remarks: undefined,
        testDataChildList: []
      },
      userOptions: [],
      officeOptions: [],
      areaOptions: [],
      sexArry: [],
      delFlagArry: [],
      rules: {},
      normalizer(node) {
        return {
          label: node.name
        };
      }
    };
  },
  created() {
    Bus.$off("outComeId");
    this.getDictList();
    this.getUserOfficeTree();
    this.getOfficeTree();
    this.getAreaTree();
  },
  mounted() {
    Bus.$on("outComeId", id => {
      this.form.testDataChildList = [];
      if (id == "" || id == undefined) {
        this.form.id = undefined;
        this.resetFieldsTap("amendForm");
        return;
      } else {
        this.form.id = id;
        this.getListSee(id);
      }
    });
  },
  methods: {
    async getDictList() {
      const sexReponse = await dictListType({ type: "sex" });
      this.sexArry = sexReponse.data;
      const delFlagReponse = await dictListType({ type: "del_flag" });
      this.delFlagArry = delFlagReponse.data;
    },
    async getListSee(id) {
      const reponse = await testDataMainSee({ id });
      this.form.user = reponse.data.user.id;
      this.form.office = reponse.data.office.id;
      this.form.area = reponse.data.area.id;
      this.form.name = reponse.data.name;
      this.form.sex = reponse.data.sex;
      this.form.inDate = reponse.data.inDate;
      this.form.remarks = reponse.data.remarks;
      const testChildArry = [];
      if (!reponse.data.testDataChildList) {
        this.form.testDataChildList = [];
      } else {
        for (const item in reponse.data.testDataChildList) {
          const subject = reponse.data.testDataChildList[item];
          const temp = {
            name: subject.name,
            remarks: subject.remarks,
            testDataMainId: subject.testDataMain.id,
            id: subject.id,
            delFlag: "0"
          };
          testChildArry.push(temp);
        }
      }
      this.form.testDataChildList = testChildArry;
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
    onSubmit() {
      this.$refs.amendForm.validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存提交，请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)"
          });
          const data = JSON.stringify(this.form);
          const reponse = await testDataMainSave(data);
          loading.close();
          if (reponse.code == 200) {
            this.resetFieldsTap("amendForm");
            this.$emit("backHandle", "update");
          }
        } else {
          return false;
        }
      });
    },
    handleChildClick() {
      this.form.testDataChildList.push({
        name: "",
        remarks: "",
        delFlag: "0"
      });
    },
    handleDeleteClick(index) {
      if (!this.form.id) {
        this.form.testDataChildList.splice(index, 1);
      } else {
        if (this.form.testDataChildList[index].delFlag == 1) {
          this.form.testDataChildList[index].delFlag = 0;
        } else {
          this.form.testDataChildList[index].delFlag = 1;
        }
        this.IconComputed(index);
      }
    },
    IconComputed(index) {
      return this.form.testDataChildList[index].delFlag == 0
        ? "remove"
        : "repeal";
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content {
  justify-content: flex-end;
}
/deep/.el-link--inner {
  font-weight: bold;
  color: red;
}
.business-title {
  font-size: 20px;
  color: #0088cc;
  border-bottom: 1px solid #e5e5e5;
  line-height: 40px;
  margin-bottom: 10px;
}
/deep/.el-table td {
  padding: 6px 0;
}
/deep/.el-table th {
  padding: 6px 0;
}
</style>