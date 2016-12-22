/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "WXApi.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "UMMobClick/MobClick.h"
#import <AlipaySDK/AlipaySDK.h>
#import "../Libraries/LinkingIOS/RCTLinkingManager.h"



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Beauty"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [NSThread sleepForTimeInterval:2.0];//设置启动页面时间
  
//  UMConfigInstance.appKey = @"57ede38467e58e98a40035ca";
//  UMConfigInstance.channelId = @"App Store";
//  
//  [MobClick startWithConfigure:UMConfigInstance];
//  [MobClick setLogEnabled:YES];
  //向微信注册
  [WXApi registerApp:@"wx8684544c6fc01fcb" withDescription:@"福利社 1.0"];
  
  return YES;
}


//url Schemes回调
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  return [self application:application applicationOpenURL:url];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [self application:application applicationOpenURL:url];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary*)options
{
  return [self application:application applicationOpenURL:url];
}

- (BOOL)application:(UIApplication *)application applicationOpenURL:(NSURL *)url
{
  if ([url.scheme isEqualToString:@"beautyAliSdkScheme"] && [url.host isEqualToString:@"safepay"]) {  //支付宝的支付功能
//    //跳转支付宝钱包进行支付，处理支付结果
//    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
//      NSLog(@"result = %@",resultDic);
//    }];
    NSLog(@"aliPay");
  }
  
  if ([url.scheme isEqualToString:@"wx8684544c6fc01fcb"] && [url.host isEqualToString:@"pay"]) {  //微信的支付功能
    NSLog(@"result = wxPay");
  }
  
  if ([url.scheme isEqualToString:@"wxdfa578473977cc42"] && [url.host isEqualToString:@"oauth"]) {  //微信的登录功能
     NSLog(@"result = wxLogin");
    return [RCTLinkingManager application:application openURL:url sourceApplication:NULL annotation:NULL];
  }
  return YES;
}



@end
