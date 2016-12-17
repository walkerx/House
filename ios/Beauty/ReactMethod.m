//
//  AliPay.m
//  Beauty
//
//  Created by cc on 16/12/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <AlipaySDK/AlipaySDK.h>
#import "ReactMethod.h"
#import "WXApi.h"
#import "WXApiObject.h"

@implementation ReactMethod

//导出模块
RCT_EXPORT_MODULE();    //此处不添加参数即默认为这个OC类的名字



//导出方法，桥接到js的方法返回值类型必须是void  微信支付
RCT_EXPORT_METHOD(doWxPay:(NSString *)partnerId
                  prepayId:(NSString *)prepayId
                  package:(NSString *)package
                  nonceStr:(NSString *)nonceStr
                  timeStamp:(int)timeStamp
                  sign:(NSString *)sign)
{
  PayReq *request = [[[PayReq alloc] init] autorelease];
  request.partnerId = partnerId;
  request.prepayId= prepayId;
  request.package = package;
  request.nonceStr= nonceStr;
  request.timeStamp= timeStamp;
  request.sign= sign;
  [WXApi sendReq:request];
}


//导出方法，桥接到js的方法返回值类型必须是void  支付宝支付
RCT_EXPORT_METHOD(doAliPay:(NSString *)orderString)
{
  //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
  NSString *appScheme = @"beautyAliSdkScheme";
  
  // NOTE: 调用支付结果开始支付
  [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"reslut = %@",resultDic);
  }];
}

//导出方法，桥接到js的方法返回值类型必须是void  微信登录
//RCT_EXPORT_METHOD(loginWX)
//{
//  //构造SendAuthReq结构体
//  SendAuthReq* req =[[[SendAuthReq alloc ] init ] autorelease ];
//  req.scope = @"snsapi_userinfo" ;
//  req.state = @"flsflswxlogin" ;
//  //第三方向微信终端发送一个SendAuthReq消息结构
//  [WXApi sendReq:req];
//}

@end
