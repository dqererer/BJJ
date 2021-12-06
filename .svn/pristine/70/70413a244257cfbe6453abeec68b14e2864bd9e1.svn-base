<template>
  <div class="information-inner information-change" ref="informationInner">
    <div class="information-tab" @click="handleTabClick">
      <h1 class="information-title active" name="see">
        见面沟通会
      </h1>
      <h1 class="information-title" name="mobilize">动员会</h1>
      <h1 class="information-title" name="report">汇报会</h1>
      <h1 class="information-title" name="inspector">督察组会议</h1>
    </div>
    <div class="tab-list-content">
      <see-meeting
        v-if="tabName === 'see'"
      ></see-meeting>
      <mobilize-meeting
        v-if="tabName === 'mobilize'"
      ></mobilize-meeting>
      <report-meeting
        v-if="tabName === 'report'"
      ></report-meeting>
      <inspector-meeting
        v-if="tabName === 'inspector'"
      ></inspector-meeting>
    </div>
  </div>
</template>

<script>
import seeMeeting from "./seeMeeting";
import mobilizeMeeting from "./mobilizeMeeting";
import reportMeeting from "./reportMeeting";
import inspectorMeeting from "./inspectorMeeting";
export default {
  components: {
    seeMeeting,
    mobilizeMeeting,
    reportMeeting,
    inspectorMeeting
  },
  data() {
    return {
      tabName: "see"
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