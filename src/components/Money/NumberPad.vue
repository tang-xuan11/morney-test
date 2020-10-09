<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <Overlay @update:value="updateDate" />
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button class="remove" @click="remove">
        <Icon name="remove" />
      </button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Overlay from "@/components/Overlay.vue";
import { Component } from "vue-property-decorator";
import { clone } from "lodash";
@Component({
  components: { Overlay },
})
export default class NumberPad extends Vue {
  output = "0";
  date = new Date().toISOString();
  updateDate(value: string) {
    this.date = value;
  }
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    const pointIndex = this.output.indexOf(".");
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    if (this.output.slice(pointIndex).length > 2) {
      return;
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    this.$emit("update:dayvalue", this.date);
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 32px;
    font-family: Consolas, monospace;
    padding: 0px 16px;
    text-align: right;
    background: white;
  }
  .buttons {
    @extend %clearFix;
    font-size: 20px;
    button {
      float: left;
      width: 25%;
      height: 50px;
      background: transparent;
      border: none;
      &.ok {
        height: 50 * 2px;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4px);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2px);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3px);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4px);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5px);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6px);
      }
    }
    > .remove {
      font-size: 28px;
    }
  }
}
</style>