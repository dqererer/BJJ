<template>
  <div class="progrem">
    <section>
      <header>方案信息</header>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="督察类型"
          >{{ plan.levelTypeName }} -
          {{ plan.superviseTypeName }}</el-descriptions-item
        >
        <el-descriptions-item label="督察轮次批次"
          >{{ plan.roundName }}{{ plan.batchName }}</el-descriptions-item
        >
        <el-descriptions-item label="方案名称">{{
          plan.planName
        }}</el-descriptions-item>
        <el-descriptions-item label="督察地区">{{
          plan.cityName
        }}</el-descriptions-item>
        <el-descriptions-item label="反馈意见标题"
          >{{ plan.backOpinion }}
        </el-descriptions-item>
        <el-descriptions-item label="反馈时间"
          >{{ plan.backTime && plan.backTime.split(" ")[0] }}
        </el-descriptions-item>
        <el-descriptions-item label="反馈意见电子件"
          ><a
            v-if="plan.feedBackFile"
            @click="checkFile(plan.feedBackFile, '反馈意见电子件')"
            >反馈意见电子件</a
          >
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="方案上传时间"
          >{{ plan.planTime && plan.planTime.split(" ")[0] }}
        </el-descriptions-item>
        <el-descriptions-item label="方案电子件"
          ><a
            v-if="plan.planFile"
            @click="checkFile(plan.planFile, '方案电子件')"
            >方案电子件</a
          >
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="整改措施电子件"
          ><a
            v-if="plan.rectificationMeasuresFile"
            @click="checkFile(plan.rectificationMeasuresFile, '整改措施电子件')"
            >整改措施电子件</a
          >
          <span v-else>-</span>
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section>
      <header>任务列表</header>
      <div class="tasklist">
        <div class="task" v-for="(item, index) in tasklist" v-bind:key="index">
          <div class="content">{{ item.rectifyContent }}</div>
          <el-link :underline="false" @click="show(item.id)"
            >查看<i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>
      </div>
    </section>
    <el-dialog
      :title="fileTitle"
      :visible.sync="check"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-for="(item, index) in fileList" v-bind:key="index">
        <span href="#">{{ item.name }}</span
        ><a
          href="#"
          @click="preview(item.id)"
          style="margin-left: 10px; color: #409eff"
          >预览</a
        ><a
          href="#"
          style="margin-left: 10px; color: #409eff"
          @click="downloadFile(item.id)"
          >下载</a
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="fileTitle"
      :visible.sync="isshow"
      width="100%"
      :close-on-click-modal="false"
      append-to-body
    >
      <Programer :id="taskid" />
    </el-dialog>
  </div>
</template>
<script>
import { getPlanInfo } from "@/api/support/search";
import { getSingleInfo, filePreview } from "@/utils/styem";
import Programer from "./component/programer.vue";
import { getFileInfo } from "@/api/file";

export default {
  data() {
    return {
      check: false,
      id: "",
      isshow: false,
      plan: {},
      fileTitle: "",
      fileList: [],
      tasklist: [],
      taskid: "",
    };
  },

  computed: {},
  components: {
    Programer,
  },
  created() {
    this.id = this.$route.query.id;
    getPlanInfo({
      id: this.id,
    }).then((res) => {
      this.plan = res.data.plan;
      this.tasklist = res.data.taskList;
    });
  },

  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    show: function (id) {
      this.taskid = id;
      this.isshow = true;
    },
    checkFile: function (fileIds, title) {
      this.fileTitle = title;
      let fileIdList = [];
      if (fileIds) {
        fileIdList = fileIds.split(",");
      }
      fileIdList.forEach((item) => {
        item && this.getFileInfo(item);
      });
      this.check = true;
    },
    getFileInfo: function (id) {
      this.fileList = [];
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
          id: id,
        };
        this.fileList.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.progrem {
  padding-top: 20px;
  section {
    margin-bottom: 20px;
    header {
      height: 40px;
      line-height: 40px;
      background: #409eff;
      text-align: center;
      color: white;
    }
  }
  .tasklist {
    .task {
      color: gray;
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #dcdfe6;
      .content {
        width: 80%;
      }
    }
  }
}
a {
  color: #409eff;
}
.task-box {
  position: fixed;
  width: 100%;
  clear: both;
  top: 0;
  left: 0;
}
/deep/ .el-dialog__header {
  border-bottom: 0;
}
</style>


