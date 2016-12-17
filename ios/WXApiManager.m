////
////  WXApiManager.m
////  SDKSample
////
////  Created by Jeason on 16/07/2015.
////
////
//
//#import "WXApiManager.h"
//#import "RCTBridge.h"
//#import "RCTEventDispatcher.h"
//
//
//@implementation WXApiManager
//
//@synthesize bridge = _bridge;
//
//RCT_EXPORT_MODULE()
//
//
////导出方法，桥接到js的方法返回值类型必须是void  微信登录
//RCT_EXPORT_METHOD(sendSendInfo)
//{
//  NSLog(@"reslut = sendSendInfo11111");
////  [_bridge.eventDispatcher sendDeviceEventWithName:@"WeChat_Resp" body:@{@"name": @"EventReminder"}];
//  [self calendarEventReminderReceived:@"hellohello123123123"];
//}
//
//#pragma mark - LifeCycle
//
//
//- (instancetype)init
//{
//  self = [super init];
//  if (self) {
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:@"RCTOpenURLNotification" object:nil];
//  }
//  return self;
//}
//
//+(instancetype)sharedManager {
//    static dispatch_once_t onceToken;
//    static WXApiManager *instance;
//    dispatch_once(&onceToken, ^{
//        instance = [[WXApiManager alloc] init];
//    });
//    return instance;
//}
//
//- (void)dealloc {
//    self.delegate = nil;
//    [super dealloc];
//   [[NSNotificationCenter defaultCenter] removeObserver:self];
//}
//
//- (void)calendarEventReminderReceived:(NSString *)name
//{
//  NSLog(@"result = tttttt+++%@",name);
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                               body:@{@"name": name}];
//}
//
//#pragma mark - WXApiDelegate
//- (void)onResp:(BaseResp *)resp {
//    if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvMessageResponse:)]) {
//            SendMessageToWXResp *messageResp = (SendMessageToWXResp *)resp;
//            [_delegate managerDidRecvMessageResponse:messageResp];
//        }
//    } else if ([resp isKindOfClass:[SendAuthResp class]]) {
//        NSLog(@"result = EventReminder");
////      [self.bridge.eventDispatcher sendAppEventWithName:@"Smile"
////                                                   body:@{@"name": @"EventReminder:123123123123123123123"}];
//      
////      [_bridge.eventDispatcher sendDeviceEventWithName:@"WeChat_Resp" body:@{@"name": @"EventReminder"}];
//      [self calendarEventReminderReceived:@"hellohello"];
//      
//    } else if ([resp isKindOfClass:[AddCardToWXCardPackageResp class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvAddCardResponse:)]) {
//            AddCardToWXCardPackageResp *addCardResp = (AddCardToWXCardPackageResp *)resp;
//            [_delegate managerDidRecvAddCardResponse:addCardResp];
//        }
//    } else if ([resp isKindOfClass:[WXChooseCardResp class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvChooseCardResponse:)]) {
//            WXChooseCardResp *chooseCardResp = (WXChooseCardResp *)resp;
//            [_delegate managerDidRecvChooseCardResponse:chooseCardResp];
//        }
//    }
//}
//
//- (void)onReq:(BaseReq *)req {
//    if ([req isKindOfClass:[GetMessageFromWXReq class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvGetMessageReq:)]) {
//            GetMessageFromWXReq *getMessageReq = (GetMessageFromWXReq *)req;
//            [_delegate managerDidRecvGetMessageReq:getMessageReq];
//        }
//    } else if ([req isKindOfClass:[ShowMessageFromWXReq class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvShowMessageReq:)]) {
//            ShowMessageFromWXReq *showMessageReq = (ShowMessageFromWXReq *)req;
//            [_delegate managerDidRecvShowMessageReq:showMessageReq];
//        }
//    } else if ([req isKindOfClass:[LaunchFromWXReq class]]) {
//        if (_delegate
//            && [_delegate respondsToSelector:@selector(managerDidRecvLaunchFromWXReq:)]) {
//            LaunchFromWXReq *launchReq = (LaunchFromWXReq *)req;
//            [_delegate managerDidRecvLaunchFromWXReq:launchReq];
//        }
//    }
//}
//
//@end
