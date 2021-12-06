<template>
  <div class="amend-content">
    <el-form
      ref="userManageform"
      :rules="rules"
      :model="form"
      label-width="120px"
    >
      <el-row :gutter="24">
        <el-col :span="12" class="branch-name">
          <el-form-item label="方案名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="branch-name">
          <el-form-item label="模板分类：" prop="category">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option
                v-for="item in categoryListArry"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="help-inline">
              生成结构：{包名}/{模块名}/{分层(dao,entity,service,web)}/{子模块名}/{java类}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生成包路径：" prop="packageName">
            <el-input v-model="form.packageName"></el-input>
            <span class="help-inline">建议模块包：cn.huazx.ebp.modules</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产模块名：" prop="moduleName">
            <el-input v-model="form.moduleName"></el-input>
            <span class="help-inline">可理解为子系统名，例如 sys</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生成子模块名：" prop="subModuleName">
            <el-input v-model="form.subModuleName"></el-input>
            <span class="help-inline">可选，分层下的文件夹，例如 </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生成功能描述：" prop="functionName">
            <el-input v-model="form.functionName"></el-input>
            <span class="help-inline">将设置到类描述</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生成功能名：" prop="functionNameSimple">
            <el-input v-model="form.functionNameSimple"></el-input>
            <span class="help-inline">用作功能提示，如：保存“某某”成功</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生成功能作者：" prop="functionAuthor">
            <el-input v-model="form.functionAuthor"></el-input>
            <span class="help-inline">功能开发者</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="业务表名：" prop="genTableId">
            <el-select v-model="form.genTableId" placeholder="请选择">
              <el-option
                v-for="item in genSchemeTableListArry"
                :key="item.id"
                :label="item.nameAndComments"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="help-inline"
              >生成的数据表，一对多情况下请选择主表。</span
            >
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联菜单：" prop="menuId">
            <treeselect
              v-model="form.menuId"
              :options="relevanceMenu"
              :normalizer="normalizer"
              :disableBranchNodes="false"
              noChildrenText="无"
              placeholder=""
            />
            <span class="help-inline">选择功能链接到到的菜单</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生成选项：" prop="replaceFile">
            <el-checkbox v-model="form.replaceFile" style="margin-top: 10px;"
              >是否替换现有文件</el-checkbox
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="tab-list-state">
          <el-button type="primary" @click="submitForm('userManageform', 0)"
            >保存方案</el-button
          >
          <el-button type="warning" @click="submitForm('userManageform', 1)"
            >保存并生成代码</el-button
          >
          <el-button @click="handleBackClick">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  genSchemeById,
  genSchemeTableList,
  genTableConfig,
  genSchemeSave
} from "@/api/styem/develop";
import { menuTree } from "@/api/styem/menu";
import Bus from "@/utils/vueBus";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      form: {
        id: undefined,
        name: undefined,
        category: undefined,
        packageName: "cn.huazx.ebp.modules",
        moduleName: undefined,
        subModuleName: '',
        functionName: undefined,
        functionNameSimple: undefined,
        functionAuthor: undefined,
        genTableId: undefined,
        officeId: undefined,
        replaceFile: false,
        flag: undefined,
        menuId:undefined
      },
      genSchemeTableListArry: [],
      categoryListArry: [],
      relevanceMenu: [],
      normalizer(node) {
        return {
          label: node.name
        };
      },
      rules: {
        name: [{ required: true, message: "方案名称", trigger: "blur" }]
      }
    };
  },
  created() {
    Bus.$off("outComeId");
    this.getGenTableConfig();
    this.getAreaList();
  },
  mounted() {
    Bus.$on("outComeId", id => {
      this.resetFieldsTap("userManageform");
      this.resetChecked();
      this.getGenSchemeTableList();
      if (id == "" || id == undefined) {
        this.form.id = undefined;
      } else {
        this.form.id = id;
        this.getGenSchemeById(id);
      }
    });
  },
  methods: {
    async getAreaList() {
      const reponse = await menuTree();
      const menu = this.handleTree(reponse.data, "id", "pId", "children", "0");
      this.relevanceMenu = menu;
    },
    async getGenTableConfig() {
      const reponse = await genTableConfig();
      this.categoryListArry = reponse.data.categoryList;
    },
    async getGenSchemeTableList() {
      const reponse = await genSchemeTableList();
      this.genSchemeTableListArry = reponse.data;
    },
    async getGenSchemeById(id) {
      const reponse = await genSchemeById({ id });
      const genSchemeByIdData = reponse.data;
      this.form.name = genSchemeByIdData.name||undefined;
      this.form.category = genSchemeByIdData.category||undefined;
      this.form.packageName = genSchemeByIdData.packageName||undefined;
      this.form.moduleName = genSchemeByIdData.moduleName||undefined;
      this.form.subModuleName = genSchemeByIdData.subModuleName||'';
      this.form.functionName = genSchemeByIdData.functionName||undefined;
      this.form.functionNameSimple = genSchemeByIdData.functionNameSimple||undefined;
      this.form.functionAuthor = genSchemeByIdData.functionAuthor||undefined;
      this.form.genTableId = genSchemeByIdData.genTable.id||undefined;
      if((typeof genSchemeByIdData.menu)==='undefined'){
        this.form.menuId = undefined;
      }else{
        this.form.menuId = genSchemeByIdData.menu.id;
      }
      
    },
    submitForm(formName, flag) {
      this.form.flag = flag;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.stringify(this.form);
          const url = process.env.VUE_APP_BASE_API + "/center/gen/genScheme/save";
          axios({
            url: url,
            method: "post",
            data: data,
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken()
            }
          }).then(reponse => {
            if (reponse.data.code == 200) {
              this.$emit("backHandle", "update");
            }
          });
        } else {
          return false;
        }
      });
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    },
    resetChecked() {
      this.form.id = undefined;
      this.form.name = undefined;
      this.form.category = undefined;
      this.form.packageName = "cn.huazx.ebp.modules";
      this.form.moduleName = undefined;
      this.form.subModuleName = '';
      this.form.functionName = undefined;
      this.form.functionNameSimple = undefined;
      this.form.functionAuthor = undefined;
      this.form.genTableId = undefined;
      this.form.officeId = undefined;
      this.form.replaceFile = false;
      this.form.flag = undefined;
    }
  }
};
</script>

<style lang="scss" scoped>
.help-inline {
  font-size: 12px;
  color: #beb6b6;
  margin-top: 4px;
  display: inline-block;
}
/deep/.el-form-item__content {
  line-height: 1 !important;
}
</style>