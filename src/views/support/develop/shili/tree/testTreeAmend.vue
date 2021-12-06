<template>
  <div class="amend-content">
    <el-form ref="amendForm" :rules="rules" :model="form" label-width="160px">
      <el-row>
        <el-col :span="20">
          <el-form-item prop="parentId" label="上级parent_id：">
            <treeselect
              v-model="form.parentId"
              :options="testTreeOptions"
              :disable-branch-nodes="true"
              :disableBranchNodes="false"
              :normalizer="normalizer"
              noChildrenText="无"
              placeholder="请选择parent_id"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="name" label="name：">
            <el-input v-model="form.name" placeholder="请输入name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="sort" label="sort：">
            <el-input v-model="form.sort" placeholder="请输入sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="remarks" label="remarks：">
            <el-input
              type="textarea"
              v-model="form.remarks"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="tab-list-state">
          <el-button v-if="buttonShow" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <el-button @click="handleBackClick">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type.js";
import { testTreeSave, testTreeSee, testTreeList } from "@/api/case/tree";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      form: {
        parentId: null,
        name: undefined,
        sort: undefined,
        remarks: undefined
      },
      testTreeOptions: [],
      delFlagArry: [],
      buttonShow: true,
      rules: {
        parent: [
          { required: true, message: "请输入parent_id", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
        sort: [{ required: true, message: "请输入sort", trigger: "blur" }]
      },
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
    this.testTreeTree();
  },
  mounted() {
    Bus.$on("outComeId", obj => {
      this.resetFieldsTap("amendForm");
      if (obj == "" || obj == undefined) {
        this.form.id = undefined;
        this.form.parentId = null;
      } else if (obj.state == "amend") {
        this.form.id = obj.id;
        this.buttonShow = obj.buttonShow;
        this.getListSee(obj.id);
      } else if (obj.state == "addNext") {
        this.form.parentId = obj.id;
      }
    });
  },
  methods: {
    async getDictList() {
      const delFlagReponse = await dictListType({ type: "del_flag" });
      this.delFlagArry = delFlagReponse.data;
    },
    async testTreeTree() {
      const reponse = await testTreeList();
      if (!reponse.data) {
        this.testTreeOptions = [];
        return;
      }
      const menu = this.handleTree(
        reponse.data,
        "id",
        "parentId",
        "children",
        "0"
      );
      this.testTreeOptions = menu;
    },
    async getListSee(id) {
      const reponse = await testTreeSee({ id });
      const subject = reponse.data;
      this.form.parentId = subject.parentId == "0" ? null : subject.parentId;
      this.form.name = subject.name;
      this.form.sort = subject.sort;
      this.form.remarks = subject.remarks;
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
          if (!this.form.parentId) {
            this.form.parentId = 0;
          }
          const reponse = await testTreeSave(this.form);
          if (reponse.code == 200) {
            this.resetFieldsTap("amendForm");
            this.$emit("backHandle", "update");
            loading.close();
          } else {
            loading.close();
          }
        } else {
          return false;
        }
      });
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
</style>