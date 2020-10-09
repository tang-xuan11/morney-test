<template>
  <div class="wrapper">
    <div class="close"></div>
    <ul class="tabs">
      <li
        v-for="item in dataSource"
        :key="item.value"
        class="tabs-item"
        :class="liClass(item)"
        @click="select(item)"
      >
        {{ item.text }}
      </li>
    </ul>
    <router-link :to="pageLink" class="close">{{ text }}</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  @Prop(String) text?: string;
  @Prop(String) pageLink?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffda47;
  > .close {
    display: flex;
    padding: 0 16px;
    width: 64px;
  }
}

.tabs {
  display: flex;
  text-align: center;
  font-size: 20px;
  &-item {
    display: flex;
    padding: 12px 16px 8px 16px;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333;
    }
  }
}
</style>