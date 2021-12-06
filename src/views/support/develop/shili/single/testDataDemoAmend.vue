<template>
  <div class="amend-content">
    <el-form ref="amendForm" :rules="rules" :model="form" label-width="160px">
      <el-row>
        <el-col :span="20">
          <el-form-item prop="user" label="用户名：">
            <treeselect
              v-model="form.user"
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
        <el-col :span="20">
          <el-form-item prop="office" label="部门：">
            <treeselect
              v-model="form.office"
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
        <el-col :span="20">
          <el-form-item prop="area" label="区域：">
            <treeselect
              v-model="form.area"
              :options="areaOptions"
              :disable-branch-nodes="true"
              :disableBranchNodes="false"
              :normalizer="normalizer"
              noChildrenText="无"
              placeholder="请选择区域"
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
            <el-radio-group v-model="form.sex">
              <el-radio
                v-for="item in sexArry"
                :key="item.id"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="inDate" label="日期：">
            <el-date-picker
              v-model="form.inDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="fileInfo" label="file_info：">
            <upload
              ref="upload"
              :label="'file_info：'"
              :limit="1"
              accept=".xlsx,.xls,.doc,.docx,.zip,.pdf"
              :headers="upload.headers"
              :url="upload.url"
              :uploadPath="upload.uploadPath"
              :isUploading="upload.isUploading"
              :fileList="fileInfoList"
              :fromKey="'fileInfo'"
              @setUrlPath="SetUrlPath"
              @deleteServeFile="DeleteServeFile"
            ></upload>
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
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="handleBackClick">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type.js";
import { testDataDemoSave, testDataDemoSee } from "@/api/case/single";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import { officeTreeData } from "@/api/styem/dept";
import { userTreeData } from "@/api/styem/user";
import { officeList } from "@/api/styem/dept";
import { areaTreeData } from "@/api/styem/dept";
import { getFileInfo } from "@/api/file";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      form: {
        id: undefined,
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        fileInfo: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        remarks: undefined,
        delFlag: undefined
      },
      userOptions: [],
      officeOptions: [],
      areaOptions: [],
      sexArry: [],
      upload: {
        isUploading: false,
        uploadPath: "hzx",
        url: process.env.VUE_APP_BASE_API + "/center/file/uploadFile"
      },
      fileInfoList: undefined,
      rules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        office: [{ required: true, message: "请输入部门", trigger: "blur" }],
        area: [{ required: true, message: "请输入区域", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
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
    this.getUserOfficeTree();
    this.getOfficeTree();
    this.getAreaTree();
  },
  mounted() {
    Bus.$on("outComeId", id => {
      this.fileInfoList = [];
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
    },
    async getListSee(id) {
      const reponse = await testDataDemoSee({ id });
      this.form = reponse.data;
      this.form.user = reponse.data.user.id;
      this.form.office = reponse.data.office.id;
      this.form.area = reponse.data.area.id;
      const fileInfo = reponse.data.fileInfo;
      if (fileInfo) {
        this.getFileInfoMessage(fileInfo, "fileInfoList");
      } else {
        this.fileInfoList = undefined;
      }
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
    async getFileInfoMessage(fileId, name) {
      const reponse = await getFileInfo({ ids: fileId });
      const subject = reponse.data;
      if (subject.length) {
        const temp = {
          name: subject[0].file_name,
          url: subject[0].save_path,
          id: fileId
        };
        this[name].push(temp);
      }
    },
    SetUrlPath(prcturlData) {
      this.form[prcturlData.fromKey] = prcturlData.response.data.fileId;
    },
    DeleteServeFile(prcturlData) {
      this.form[prcturlData.fromKey] = undefined;
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
          const reponse = await testDataDemoSave(this.form);
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