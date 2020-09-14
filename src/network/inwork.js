export const MET = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
}
export const POSH = {
    LBG: "/api/Home/getHomeREC", //轮播·宫格数据
    SHlist: "/api/Home/getHomeShowGoods", //首页商品列表
    Xiangcon: "/api/Goods/GetGoodsInfo",   //详情数据
    login: "/api/login",    //验证登录登陆数据验证
    username: "/api/Verify/LoginName", //验证用户名
    tabnumber: "/api/Verify/GetPhone", //验证手机号
    sms: "/api/SMSCode/GetCode",       //短信信息  
    AddLogin: "/api/LoginPage/AddLogin", //注册登录 
    loginuse: "/api/LoginPage/Login", //登录验证
    listnav: "/api/Goods/getCatsTree", //商品分类信息
    SHanglist: "/api/Goods/getCadGoods",  //商城的列表数据 
    addCart: "/api/Cart/addCart",        //添加购物车
    getCart: "/api/Cart/getCart",          //购物车信息
    CartNum: "/api/Cart/patchCartNum",    //改变购物车商品数量
    DeleteCart: "/api/Cart/DeleteCart",  //删除购物车数据
    DingInfo: "/api/Order/getOrderInfo",    //获取订单页数据
    AddArea: "/api/UserInfo/addArea", //添加收货地址
    getArea: "/api/UserInfo/getArea",    //获取收货地址
    cretaeOrder: "/api/Order/cretaeOrder", // 创建订单 点击确定付款 但未完成付款操作
    UserData:"/api/UserInfo/getUserData", //获取用户信息
    payOrder:"/api/Order/payOrder", //进行订单的支付 （余额）
    verifyPayPWD:"/api/Order/verifyPayPWD",//验证支付密码
    delivery:"/api/Order/delivery",  //修改订单状态为已签收（未评价）
    SearchHot:"/api/Goods/getSearchHot",     //获取热搜榜信息
    getGoods:"/api/Goods/getGoods",   //搜索页获取商品数据
    appWebPay:"/api/Alipay/appWebPay",   //支付宝支付   
}