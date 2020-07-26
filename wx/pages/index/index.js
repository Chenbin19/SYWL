Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var header = {
      user: "陈宝贝",
      number: {
        number1: "1",
        number2: "1",
        number3: "1"
      },
      title: {
        title1: "参与抽奖",
        title2: "发起抽奖",
        title3: "中奖记录",
      },
      img: {
        img0: "../../image/0.png",
        img1: "../../image/1.png",
        img2: "../../image/2.png",
        img3: "../../image/3.png",
        img4: "../../image/4.png",
        img5: "../../image/5.png"
      },
      txt: {
        txt1: "收货地址",
        txt2: "商务合作",
        txt3: "三方小程序",
        txt4: "投诉管理",
        txt5: "常见问题"
      }
    }
    this.setData(header)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})