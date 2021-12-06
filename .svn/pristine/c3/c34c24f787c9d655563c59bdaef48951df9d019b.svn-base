<template>
  <div class="baogao">
    <section v-for="(item, index) in List" v-bind:key="index">
      <div class="title"></div>
      <p>
        提交时间：<span>{{ item.reportTime.slice(0, 10) }}</span>
      </p>
      <p>
        报告标题：<span>{{ item.reportTitle }}</span>
      </p>
      <p>
        报告简介：<span>{{ item.reportContent }}</span>
      </p>
      <p>
        报告文件：<span v-for="(i, index) in item.filelist" v-bind:key="index"
          >{{ i.name
          }}<a
            href="#"
            @click="preview(item.id)"
            style="margin-left: 10px; color: #409eff"
            >预览</a
          ><a
            href="#"
            style="margin-left: 10px; color: #409eff"
            @click="downloadFile(item.id)"
            >下载</a
          ><span v-if="index != item.filelist.length - 1">、</span></span
        >
      </p>
      <el-divider></el-divider>
    </section>
  </div>
</template>
<script>
import { reportList } from "@/api/support/search";
import { getSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
export default {
  data() {
    return {
      id: "",
      List: [],
      workPlan: [],
    };
  },

  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.reportList();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    reportList: function () {
      reportList({
        teamId: this.id,
        type: "1",
      }).then((res) => {
        if (res.data) {
          this.List = res.data;
          res.data.forEach((item, index) => {
            let filelist = item.reportFile.split(",");
            filelist.forEach((i, idx) => {
              this.getFileInfo(i, index, idx);
            });
          });
        }
      });
    },
    getFileInfo: function (id, index, idx) {
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
          id,
        };

        this.$set(this.List[index], "filelist", []);

        this.$nextTick(() => {
          this.$set(this.List[index].filelist, idx, obj);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.baogao {
  .title {
    border-left: 3px solid #2196f3;
    padding-left: 10px;
    font-weight: bold;
    margin: 20px 0;
  }
  p {
    padding-left: 10px;
    font-weight: 500;
    span,
    a {
      font-weight: 400;
    }
  }
  a {
    color: #2196f3;
  }
}
</style>


