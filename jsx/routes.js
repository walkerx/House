'use strict';

import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import {
    Main,
    Element,
    Album,
    ShowGirl,
    Setting,
    Model,
    ModelAll,
    Me,
    Login,
    Vip,
    Purchase,
    Register
} from './containers';
import {RouteCSS} from './styles/index'
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

var renderBackButton = function (type) {
    let src = type === 1 ? require('./images/showGirl/backBt.png') : require('./images/common/backBt.png');
    return(
        <TouchableOpacity onPress={()=>{Actions.pop()}} >
            <View style={RouteCSS.backButton}>
                <Image
                    resizeMode={Image.resizeMode.stretch}
                    style={RouteCSS.backButtonImage}
                    source={src}/>
            </View>
        </TouchableOpacity>
    )
};

export default Actions.create(
    <Scene key="root">
        <Scene
            key="main"
            title="福利社"
            rightTitle="我"
            onRight={()=>{Actions.me()}}
            rightButtonTextStyle={RouteCSS.mainNavBarRightText}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Main}
            />
        <Scene
            key="album"
            titleStyle={RouteCSS.albumTitleStyle}
            rightButtonTextStyle={RouteCSS.mainNavBarRightText}
            rightButtonStyle={{width:80}}
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Album}/>
        <Scene key="element" hideNavBar={true} component={Element}/>
        <Scene
            navigationBarStyle={RouteCSS.showGirlNavBarStyle}
            renderBackButton={renderBackButton.bind(this,1)}
            key="showGirl" 
            component={ShowGirl}/>
        <Scene
            key="setting"
            title="设置"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Setting} />
        <Scene
            key="modelAll"
            title="全部模特"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={ModelAll} />
        <Scene key="model" hideNavBar={true} component={Model}/>
        <Scene
            key="me"
            title="我"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            initial={false}
            component={Me} />
        <Scene
            key="login"
            title="登录"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Login} />
        <Scene
            key="vip"
            title="会员开通"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Vip} />
        <Scene
            key="register"
            title="注册"
            renderBackButton={renderBackButton.bind(this)}
            navigationBarStyle={RouteCSS.navBarStyle}
            component={Register}
        />
    </Scene>
);