<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input
        :value="value"
        @input="onValueChanged($event.target.value)"
        type="text"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  .name {
    padding-right: 16px;
  }
  input {
    padding: 8px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>