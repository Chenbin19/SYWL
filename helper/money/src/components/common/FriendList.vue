<template>
  <!-- 好友列表,被引入个人中心Personal -->
  <div>
    <div class="header">
      <span class="friend_number">好友数</span>
      <div class="friend_txt">
        <span class="friend_txt1">{{total}}</span>
        <span class="friend_txt2">人</span>
      </div>
      <!-- 分享给好友 -->
      <mt-button class="share_img" @click.native="handClick">分享给好友</mt-button>
      <mt-popup v-model="popupVisible" position="center" modal="false">
        <img class="share_img1" :src="picture" />
        <p class="share_img2" style="text-align:center; margin-bottom:4px">可截图分享二维码</p>
      </mt-popup>
    </div>
    <!-- 已邀请的好友列表 -->
    <div v-for="(item,index) in list" :key="index" class="friend_list">
      <div class="friend_list1">
        <img class="user_img" :src="item.iconUrl" />
        <div class="item">
          <div class="item_txt">
            <span class="item_txt1">{{item.nickName}}接受了您的邀请</span>
            <span class="item_txt2">{{item.createTime}}</span>
          </div>
          <p>100</p>
        </div>
      </div>
    </div>
    <p class="record">暂无更多记录</p>
  </div>
</template>
<script>
export default {
  name: "FriendList",
  data() {
    return {
      picture: "picture",
      total: "",
      popupVisible: false,
      list: []
    };
  },
  methods: {
    // 弹出分享图
    handClick() {
      this.popupVisible = true;
      // 获取本地存储数据
      let login = JSON.parse(sessionStorage.getItem("login"));
      // 调用分享图接口
      let sheImg = {
        userid: login.result.user.id
      };
      this.$api.requestFriend(sheImg).then(res => {
        // let picture = "https://api.simeke.cn/sanyu" + res.result;
        // this.picture = picture;
        
        this.picture = "https://api.simeke.cn/sanyu" + res.result;
        console.log(res);
      });
    }
  },
  created() {
    // 获取本地存储数据
    let login = JSON.parse(sessionStorage.getItem("login"));
    let invitation = {
      inviteByUserId: login.result.user.id,
      column: "createTime",
      order: "desc"
    };
    // 调用好友列表
    this.$api.invitationList(invitation).then(res => {
      console.log("res", res);
      this.list = res.result.records;
      this.total = res.result.total;
    });
  }
};
</script>
<style>
.header {
  width: 100%;
  height: 190px;
  background: #f4f8f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7.5%;
}

.friend_number {
  color: #262121;
  font-size: 15px;
  margin-bottom: 4%;
}

.friend_txt {
  color: #262121;
  margin-bottom: 7.5%;
}

.friend_txt1 {
  font-size: 45px;
  font-weight: bold;
}

.friend_txt2 {
  font-size: 14px;
}
.invite_friend {
  width: 25%;
  height: 34px;
  border-radius: 34px;
  background: #3863f1;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  line-height: 34px;
}

.friend_list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.friend_list1 {
  width: 95%;
  height: 20%;
  display: flex;
  box-sizing: border-box;
  padding: 4% 0;
  border-bottom: 1px solid #e9e9e9;
}

.user_img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 2.5%;
}

.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item_txt {
  display: flex;
  flex-direction: column;
}

.item_txt1 {
  width: 16.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #262121;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 2.5%;
}

.item_txt2 {
  color: #979eaa;
  font-size: 13px;
}

.item p {
  color: #3863f1;
  font-size: 20px;
}

.record {
  width: 100%;
  margin: 0.6rem 0 0.6rem;
  text-align: center;
  color: #979eaa;
  font-size: 13px;
}
</style>