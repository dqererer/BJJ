<template>
  <div class="renyuan">
    <div class="title">督察人员</div>
    <p v-if="superviseOne == 'C'">
      迎检组组长：<span>{{ dczInfo.leaderName }}</span>
    </p>
    <p v-else>
      督察组长：<span>{{ dczInfo.leaderName }}</span>
    </p>
    <p v-if="superviseOne == 'C'">
      迎检组副组长：<span>{{ dczInfo.deputyName }}</span>
    </p>
    <p v-else>
      督察副组长：<span>{{ dczInfo.deputyName }}</span>
    </p>
    <p v-if="superviseOne != 'C'">
      督察总协调人：<span>{{ dczInfo.chiefName }}</span>
    </p>
    <p v-if="superviseOne == 'C'">
      迎检组成员：<span>{{ dczInfo.memberName }}</span>
    </p>
    <p v-else>
      督察组成员：<span>{{ dczInfo.memberName }}</span>
    </p>
    <p v-if="superviseOne != 'C'">
      举报登记人员：<span>{{ dczInfo.registerName }}</span>
    </p>
    <p v-if="superviseOne != 'C'">
      举报审核人员：<span>{{ dczInfo.auditorName }}</span>
    </p>
    <p v-if="superviseOne != 'C'">
      举报办理人员：<span>{{ dczInfo.handlerName }}</span>
    </p>
    <p v-if="superviseOne != 'C'">
      资料登记人员：<span>{{ dczInfo.dataRegisterName }}</span>
    </p>
    <p>
      工作方案：<span v-for="(item, index) in workPlan" v-bind:key="index" href="#"
        >{{ item.name
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
        ><span v-if="index != workPlan.length - 1">、</span></span
      >
    </p>
  </div>
</template>
<script>
import { getTeamInfo } from "@/api/support/search";
import { getSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
export default {
  data() {
    return {
      id: "",
      superviseOne: "",
      dczInfo: {},
      workPlan: [],
    };
  },

  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.superviseOne = this.$route.query.superviseOne;
    this.getTeamInfo();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    getTeamInfo: function () {
      getTeamInfo({
        id: this.id,
      }).then((res) => {
        if (res.data) {
          this.dczInfo = res.data;
          let workPlan = res.data.workPlan.split(",");
          workPlan.forEach((item) => {
            item && this.getFileInfo(item);
          });
        }
      });
    },
    getFileInfo: function (id) {
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
          id,
        };
        this.workPlan.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.renyuan {
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


