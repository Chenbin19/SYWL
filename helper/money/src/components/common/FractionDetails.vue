<template>
  <!-- 积分明细 -->
  <div>
    <ul
      class="myscroll"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item,index) in list" :key="index">
        <img src="../../assets/16.jpg" />
        <div class="everyday">
          <div class="everyday1">
            <span>{{item.cause}}</span>
            <span>{{(item.point>0?"+"+item.point:item.point)}}</span>
          </div>
          <p>剩余积分：{{item.curPoint}}</p>
          <span>{{item.createTime}}</span>
        </div>
      </li>

      <!-- 显示加载中转菊花 -->
      <div class="loading_box" v-if="loding_show">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span style="font-size:1rem;margin:1rem">加载中...</span>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  name: "FractionDetails",
  data() {
    return {
      list: [],
      pageIndex: 1, //第一页
      pageSize: 10,
      pagetotal: "", //数据总页数
      loding_show: false
    };
  },
  methods: {
    loadMore() {
      console.log("14");
      this.loading = true;
      if (this.pageIndex <= this.pagetotal) {
        this.loding_show = true;
        setTimeout(() => {
          this.get_rechards();
          this.loding_show = false;
          this.loading = false;
        }, 1500);
      } else {
        console.log("meiyoushuju6");
      }
      this.loading = false;
    },
    get_rechards() {
      let login = JSON.parse(sessionStorage.getItem("login"));
      let userFraction = {
        userId: login.result.user.id
      };
      console.log("first", this.pageIndex, this.pagetotal);
      this.$api
        .requestFraction({
          // 获得时间顺序排列
          userId: login.result.user.id,
          pageNo: this.pageIndex,
          pageSize: this.pageSize,
          column: "createTime",
          order: "desc"
        })
        .then(res => {
          console.log(res);
          for (let i = 0; i < res.result.records.length; i++) {
            this.list.push(res.result.records[i]);
          }
          this.pageIndex = this.pageIndex + 1;
          this.pagetotal = res.result.pages;
          console.log("index", this.pageIndex, this.pagetotal);
        });
    }
  },
  created() {
    this.get_rechards();
  }
};
</script>
<style>
.myscroll {
  margin-top: 5%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2.5%;
  overflow: scroll;
  max-height: 600px;
  overflow-y: auto;
}

li {
  width: 100%;
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
}

li img {
  width: 27.5px;
  height: 27.5px;
}

.everyday {
  width: 88%;
  height: 70px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f2f2f2;
}

.everyday1 {
  display: flex;
  justify-content: space-between;
}

.everyday1 :first-child {
  font-size: 0.26rem;
}

.everyday1 :last-child {
  font-size: 0.22rem;
}

.everyday p {
  margin: 0.3rem 0;
  font-size: 0.22rem;
}

.everyday :last-child {
  color: #838383;
  font-size: 0.22rem;
}

.loading_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
</style>