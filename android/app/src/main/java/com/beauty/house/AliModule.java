package com.beauty.house;

import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class AliModule extends ReactContextBaseJavaModule {
    private static final int SDK_PAY_FLAG = 1;

    public AliModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "AliModule";
    }

    @ReactMethod
    public void doAliPay(final String orderInfo, final Promise promise) {

        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                PayTask alipay = new PayTask(getCurrentActivity());
                Map<String, String> result = alipay.payV2(orderInfo, true);
                //WritableMap map = Arguments.createMap();
                promise.resolve(1);
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }
}
