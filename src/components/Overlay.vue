<template>
  <div>
    <van-button
      class="button"
      :text="showDate || '今天'"
      @click="show = true"
    />
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="date">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            v-on:confirm="date"
            v-on:cancel="cancel"
            ref="dateTimePicker"
          />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Overlay extends Vue {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2050, 10, 1);
  currentDate = new Date();
  showDate = "";
  show = false;
  date() {
    const date = this.$refs.dateTimePicker.getPicker().getValues();
    const formatDate = this.currentDate.toISOString();
    this.showDate = date[0].concat(date[1]).concat(date[2]);
    this.$emit("update:value", formatDate);
    this.show = false;
  }
  cancel() {
    this.show = false;
  }

  formatter(type, val) {
    if (type === "year") {
      return val + "年";
    }
    if (type === "month") {
      return val + "月";
    }
    if (type === "day") {
      return val + "日";
    }
    return val;
  }
}
</script>

<style lang="scss" scoped>
$bg: #f2f2f2;
.button {
  float: left;
  width: 25%;
  height: 50px;
  font-size: 15px;
  border: none;
  background: darken($bg, 4 * 3px);
}
.wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  > .date {
    width: 100%;
  }
}
</style>