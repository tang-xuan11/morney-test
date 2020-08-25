<template>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注" />
      </label>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.notes {
  font-size: 16px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding-left: 16px;
  .name {
    padding-right: 16px;
  }
  input {
    padding: 20px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>