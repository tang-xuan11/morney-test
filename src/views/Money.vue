<template>
  <div class="money-wrapper">
    <NumberPad
      @update:value="onUpdateAmount"
      @update:dayvalue="onUpdateCreateAt"
      @submit="saveRecord"
    />
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags = $event" />
    <Tabs
      :data-source="recordTypeList"
      :value.sync="record.type"
      pageLink="/labels"
      text="取消"
    />
  </div>
</template>

<script lang='ts'>
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Overlay from "@/components/Overlay.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import { Message } from "element-ui";
@Component({
  components: { Tags, FormItem, Tabs, NumberPad, Overlay },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };

  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateCreateAt(value: string) {
    this.record.createdAt = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return Message.warning({
        message: "请选择至少一个标签",
        offset: 55,
        showClose: true,
      });
    }
    if (this.record.amount === 0) {
      return Message.warning({
        message: "请输入金额",
        offset: 55,
        showClose: true,
      });
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      Message.success({
        message: "已保存",
        offset: 55,
        showClose: true,
      });
      this.record.notes = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.money-wrapper {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
}
.notes {
  background: white;
  padding: 4px 0;
}
</style>

