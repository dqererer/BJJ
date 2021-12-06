<template>
  <div>
    <!-- <viewer :images="images">
      <img v-for="(src,index) in images" :src="src" :key="index" :onerror="errorImg" />
    </viewer>-->
    <el-dialog title="图片查看" :visible.sync="open" :before-close="handleDialogClick" append-to-body>
      <el-image :src="imgSrc">
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import { imgShow } from "@/utils/imgShow";
import { getFileInfo } from "@/api/file";
export default {
  props: {
    fileId: {
      type: String
    }
  },
  data() {
    return {
      imgSrc: undefined,
      open: false
    };
  },
  methods: {
    async handleImgPreview() {
      this.open = true;
      const reponse = await getFileInfo({ ids: this.fileId });
      const subject = reponse.data;
      const fileUrl = subject[0].save_path;
      const state = subject[0].object_id;
      if (state === "FASTDFS") {
        const fastInfo = localStorage.getItem("fastInfo");
        const fastSubject = JSON.parse(fastInfo);
        const path = fastSubject.downloadUrl + fileUrl;
        this.imgSrc = path;
        // this.$viewerApi({
        //   images: this.images
        // });
      } else {
        imgShow("/center/file/downloadFile", fileUrl).then(path => {
          this.imgSrc = path;
          // this.$viewerApi({
          //   images: this.images
          // });
        });
      }
    },
    handleDialogClick() {
      this.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-image {
  width: 100%;
  .el-image__error {
    height: 200px;
  }
}
</style>