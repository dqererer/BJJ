<template>
  <div class="information-inner information-change" ref="informationInner">
    <div class="information-tab" @click="handleTabClick">
      <h1 class="information-title active" name="list">
        审核
      </h1>
      <h1 class="information-title" name="add">智能查重</h1>
    </div>
    <div class="tab-list-content">
      <check
        v-if="tabName === 'list'"
      ></check>
      <duplicate
        v-else
      ></duplicate>
    </div>
  </div>
</template>

<script>
import check from "./check";
import duplicate from "./duplicate";
export default {
  components: {
    check,
    duplicate
  },
  data() {
    return {
      tabName: "list"
    };
  },
  created() {
  },
  methods: {
    handleTabClick(e) {
      const tabs = document.getElementsByClassName("information-title");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      e.target.classList.add("active");
      this.tabName = e.target.getAttribute("name");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>