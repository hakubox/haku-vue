<template>
  <header class="main-header">
      <!-- 右侧用户及状态信息 -->
      <ul>
          <li></li>
      </ul>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
    watch: {
        openKeys(val) {
            console.log('openKeys', val)
        }
    }
})
export default class MainHeader extends Vue {
    username:string = '';
}
</script>

<style scoped lang="scss">
</style>