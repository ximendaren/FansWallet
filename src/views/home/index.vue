<template>
  <div class="main">
    <van-tabs v-model="active" title-active-color="#3D78D1" class="reset">
      <van-tab title="首页">
        <Homepage/>
      </van-tab>
      <van-tab title="区块链+">
        <Chainblockadd />
      </van-tab>
      <van-tab title="互联网+">
        <Internetadd />
      </van-tab>
      <van-tab title="关于我们" name="3">
        <Aboutus />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Homepage from "../home/components/homepage";
import Chainblockadd from "../home/components/chainblockadd";
import Internetadd from "../home/components/internetadd";
import Aboutus from "../home/components/aboutus";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    Homepage,
    Chainblockadd,
    Internetadd,
    Aboutus
  }
};
</script>
<style lang="scss" scoped>
.main {
  background: #eee;
  z-index: 1000;
  font-family: "微雅软黑";
  .main-tab {
    background: #3d78d1;
  }
}
</style>







