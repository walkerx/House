'use strict';

var ActionType = {
    //error
    REQUEST_LOADING: 'REQUEST_LOADING', //请求等待
    REQUEST_ERROR: 'REQUEST_ERROR',   //请求错误
     REQUEST_DONE: 'REQUEST_DONE',  
    RESULT_ERROR: 'RESULT_ERROR',  //返回结果错误 result: 0或2
    AUTH_FAIL: 'AUTH_FAIL',  //未登录
     //main
    GET_TAG_LIST: 'GET_TAG_LIST',  //获取标签类别
    GET_ALBUM_DETAIL: 'GET_ALBUM_DETAIL', //获得专辑详情
    GET_ALBUM_MORE: 'GET_ALBUM_MORE', //获得专辑详情更多
    DELETE_ALBUM_DETAIL: 'DELETE_ALBUM_DETAIL', //删除当前这个详情
    GET_SYSTEM_INFO: 'GET_SYSTEM_INFO',   //获取系统信息
    //element
    GET_ELEMENT_LIST: 'GET_ELEMENT_LIST',
    //model
    GET_MODEL_DETAIL: 'GET_MODEL_DETAIL',  //获取模特详情
    DELETE_MODEL_DETAIL: 'DELETE_MODEL_DETAIL', //删除模特详情
    GET_HOT_MODEL_LIST: 'GET_HOT_MODEL_LIST',  //获取人气模特
    GET_ALL_MODEL_LIST: 'GET_ALL_MODEL_LIST',  //获取全部模特
    DELETE_MODEL_ALL: 'DELETE_MODEL_ALL',        //删除所有模特数据
    //me
    GET_USER_INFO: 'GET_USER_INFO',              //获取用户信息 网络
    SET_LOCAL_USER_INFO: 'SET_LOCAL_USER_INFO',  //设置本地用户信息
    GET_LOCAL_USER_INFO: 'GET_LOCAL_USER_INFO',  //获取本地用户信息
    GET_LOGOUT: 'GET_LOGOUT',           //登出
    CLEAR_USER_INFO: 'CLEAR_USER_INFO',
    //login
    POST_LOGIN: 'POST_LOGIN',           //登录
    POST_THIRD_PARTY_LOGIN: 'POST_THIRD_PARTY_LOGIN', //第三方登录
    //register
    POST_REGISTER: 'POST_REGISTER',     //注册
    //vip
    GET_VIP_LIST: 'GET_VIP_LIST',       //办理vip项目列表
    POST_WX_PAY: 'POST_WX_PAY',    //下单 微信支付
    POST_ALI_PAY: 'POST_ALI_PAY'    //下单 支付宝支付
    
};

module.exports = ActionType;