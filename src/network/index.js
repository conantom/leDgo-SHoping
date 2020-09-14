import{request} from './onwork';
import {MET,POSH} from './inwork';

const network={
    LBG(params){
        return request(MET.GET,POSH.LBG,params)  //轮播·宫格数据
    },
    SHlist(params){
        return request(MET.GET,POSH.SHlist,params) //首页商品列表
    },
    Xiangcon(params){
        return request(MET.GET,POSH.Xiangcon,params)
    },
    login(params){
        return request(MET.POST,POSH.login,params)   //登陆数据验证
    },
    username(params){
        return request(MET.GET,POSH.username,params)
    },  
    tabnumber(params){
        return request(MET.GET,POSH.tabnumber,params)
    },   
    sms(params){
        return request(MET.GET,POSH.sms,params)
    },  
    AddLogin(params){
        return request(MET.POST,POSH.AddLogin,params)
    },  
    loginuse(params){
        return request(MET.POST,POSH.loginuse,params)
    },  
    listnav(params){
        return request(MET.GET,POSH.listnav,params)
    },
    SHanglist(params){
        return request(MET.GET,POSH.SHanglist,params)
    },
    addCart(params){
        return request(MET.POST,POSH.addCart,params)
    },
    getCart(params){
        return request(MET.GET,POSH.getCart,params)
    },
    CartNum(params){
        return request(MET.PATCH,POSH.CartNum,params)
    },
    DeleteCart(params){
        return request(MET.PATCH,POSH.DeleteCart,params)
    },
    DingInfo(params){
        return request(MET.GET,POSH.DingInfo,params)
    },
    AddArea(params){
        return request(MET.POST,POSH.AddArea,params)
    },
    getArea(params){
        return request(MET.GET,POSH.getArea,params)
    },
    cretaeOrder(params){
        return request(MET.POST,POSH.cretaeOrder,params)
    },
    UserData(params){
        return request(MET.GET,POSH.UserData,params)
    },
    payOrder(params){
        return request(MET.POST,POSH.payOrder,params)
    },
    verifyPayPWD(params){
        return request(MET.POST,POSH.verifyPayPWD,params)
    },
    delivery(params){
        return request(MET.PATCH,POSH.delivery,params)
    },
    SearchHot(params){
        return request(MET.GET,POSH.SearchHot,params)
    },
    getGoods(params){
        return request(MET.GET,POSH.getGoods,params)
    },
    appWebPay(params){
        return request(MET.POST,POSH.appWebPay,params)
    },
}

export default network