<template>
  <div class="see-content">
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">父id：</label>
          <span class="see-page-text">{{ spaceSeeData.parent }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">是否有下级系统：</label>
          <span class="see-page-text">{{ spaceSeeData.hasChild }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">分系统名称：</label>
          <span class="see-page-text">{{ spaceSeeData.name }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">分系统类型 0督察 1辅助 2整改：</label>
          <span class="see-page-text">{{ spaceSeeData.type }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">分系统编码 同字典值：</label>
          <span class="see-page-text">{{ spaceSeeData.code }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">排序：</label>
          <span class="see-page-text">{{ spaceSeeData.sort }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">连接：</label>
          <span class="see-page-text">{{ spaceSeeData.href }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">路由：</label>
          <span class="see-page-text">{{ spaceSeeData.router }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">重定向：</label>
          <span class="see-page-text">{{ spaceSeeData.redirect }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">组件：</label>
          <span class="see-page-text">{{ spaceSeeData.component }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">remarks：</label>
          <span class="see-page-text">{{ spaceSeeData.remarks }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row class="out-see-line">
      <el-button @click="handleBackClick">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import { sysSubSee } from "@/api/support/bRoleSys";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      spaceSeeData: {
        id: undefined,
        parent: undefined,
        hasChild: undefined,
        name: undefined,
        type: undefined,
        code: undefined,
        sort: undefined,
        href: undefined,
        router: undefined,
        redirect: undefined,
        component: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        remarks: undefined,
        delFlag: undefined
      }
    };
  },
  created() {
    Bus.$off("outComeSeeId");
  },
  mounted() {
    Bus.$on("outComeSeeId", id => {
      this.handleReset();
      this.getSpaceSee(id);
    });
  },
  methods: {
    async getSpaceSee(id) {
      const reponse = await sysSubSee({ id });
      this.spaceSeeData = reponse.data;
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    },
    handleReset() {
      this.spaceSeeData = {
        id: undefined,
        parent: undefined,
        hasChild: undefined,
        name: undefined,
        type: undefined,
        code: undefined,
        sort: undefined,
        href: undefined,
        router: undefined,
        redirect: undefined,
        component: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        remarks: undefined,
        delFlag: undefined
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.see-content .see-page-box .see-page-label {
  width: 140px;
}
</style>