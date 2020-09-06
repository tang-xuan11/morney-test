<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <template v-if="type === 'date'">
        <input
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :type="type || 'text'"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :value="value"
          @input="onValueChanged($event.target.value)"
          :type="type || 'text'"
          :placeholder="placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang='ts'>
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
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