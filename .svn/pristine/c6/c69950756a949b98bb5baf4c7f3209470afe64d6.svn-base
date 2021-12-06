<template>
  <div>
    <div class="tab-list-content">
      <div class="box-body">
        <el-form ref="form" :model="geoCategoryParams" label-width="180px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="归属单位：">
                <treeselect
                  v-model="geoCategoryParams.companyId"
                  :options="companyOptions"
                  :disable-branch-nodes="true"
                  :normalizer="normalizer"
                  @input="deptClose"
                  noChildrenText="无"
                  noOptionsText="无"
                  placeholder="请选择归属单位"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录名：">
                <el-input placeholder="请输入登录名" v-model="geoCategoryParams.loginName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="归属部门：">
                <treeselect
                  v-model="geoCategoryParams.officeId"
                  :options="branchOptions"
                  :disable-branch-nodes="true"
                  :normalizer="normalizer"
                  :disableBranchNodes="false"
                  noChildrenText="无"
                  noOptionsText="无"
                  placeholder="请选择归属部门"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名：">
                <el-input placeholder="请输入姓名" v-model="geoCategoryParams.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="tab-list-state">
                <el-button
                  type="primary"
                  class="pull-right"
                  @click="handleImport"
                  >导入</el-button
                >
                <el-button
                  type="primary"
                  class="pull-right"
                  @click="handleExport"
                  >导出</el-button
                >
                <el-button type="primary" class="pull-right" @click="onSubmit"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table
        v-loading="loading"
        :data="userList"
        border
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column prop="companyName" label="归属单位"></el-table-column>
        <el-table-column prop="officeName" label="归属部门"></el-table-column>
        <el-table-column prop="loginName" label="登录名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
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
        :pageNo.sync="geoCategoryParams.pageNo"
        :limit.sync="geoCategoryParams.pageSize"
        @pagination="getUserListb"
      />
    </div>
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox
            v-model="upload.updateSupport"
          />是否更新已经存在的用户数据
          <el-link
            type="info"
            style="font-size:12px;color:#red;font-weight:bold;"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUser,
  userDelete,
  userTemplate,
  userExport
} from "@/api/styem/user";
import { officeTreeData } from "@/api/styem/dept";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
import { downLoadZip } from "@/utils/zipdownload";
import Bus from "@/utils/vueBus";
export default {
  props: {
    deptId: {
      type: Object,
      default: () => {}
    },
    deptOptions: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      geoCategoryParams: {
        id: undefined,
        companyId: null,
        officeId: null,
        loginName: undefined,
        name: undefined,
        pageNo: 1,
        pageSize: 15
      },
      loading: true,
      userList: undefined,
      total: 0,
      companyOptions: [],
      branchOptions: [],
      normalizer(node) {
        return {
          label: node.name
        };
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/center/sys/user/import"
      }
    };
  },
  created() {
    this.getUserList(this.geoCategoryParams);
  },
  watch: {
    deptOptions: {
      handler(newVal) {
        const newVObj = JSON.parse(JSON.stringify(newVal));
        for (const key in newVObj) {
          delete newVObj[key].children;
          this.companyOptions.push(newVObj[key]);
        }
      },
      deep: true,
      immediate: true
    },
    deptId: {
      handler(deptObj) {
        if (deptObj) {
          const { id } = deptObj.value;
          let param = JSON.parse(JSON.stringify(this.geoCategoryParams));
          param.officeId = id;
          this.getUserList(param);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    deptClose(value) {
      if (value == undefined) {
        this.branchOptions = [];
        return;
      }
      this.getOfficeTreeData(value);
    },
    async getOfficeTreeData(companyId) {
      const reponse = await officeTreeData({ companyId, type: 2 });
      const menu = this.handleTree(reponse.data, "id", "pId", "children", "1");
      this.branchOptions = menu;
    },
    async getUserList(param) {
      this.loading = true;
      const reponse = await listUser(param);
      this.userList = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async getUserListb() {
      this.loading = true;
      const reponse = await listUser(this.geoCategoryParams);
      this.userList = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async onSubmit() {
      this.geoCategoryParams.pageNo = 1;
      this.getUserList(this.geoCategoryParams);
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outUserComeId", id);
      this.$emit("handleSeeAmend", { tabState: "amend", name: "add" });
    },
    handleDelete(row) {
      const { id } = row;
      MessageBox.confirm("是否要删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        userDelete({ id }).then(reponse => {
          if (reponse.code == 200) {
            this.getUserList(this.geoCategoryParams);
          }
        });
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.geoCategoryParams;
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        downLoadZip("/center/sys/user/export", queryParams);
      });
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      downLoadZip("/center/sys/user/import/template");
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getUserListb();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
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
