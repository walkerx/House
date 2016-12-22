import React, {PropTypes, Component} from 'react';
import {Actions} from "react-native-router-flux";
import {ShowGirlCSS,RouteCSS,AlbumCSS} from '../styles/index';
import { BlurView } from 'react-native-blur';
import {
    Alert,
    Image,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
    Modal,
    DeviceEventEmitter,
    CameraRoll,
    ScrollView,
    StatusBar,
    PanResponder,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ToastAndroid,
    findNodeHandle
} from 'react-native';
import PhotoView from 'react-native-photo-view';
var RNFS = require('react-native-fs');

class ShowImage extends Component {

    constructor(props) {
        super(props);
        this._scrollView = null;
        let imageSource = [];
        if(props.data && props.data.get('pics')){
            props.data.get('pics').forEach(function(pic){
                imageSource.push({uri:pic});
            })
        }
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        this.state = {
            imageSource: imageSource,
            currentIndex: props.index, //当前图片页数
            display: true,  //显示标题及下载
            dataSource: ds.cloneWithRows(imageSource),
            viewRef: 0

        };
    }

    componentDidMount() {
        setTimeout(() => {
            this._scrollView.scrollTo({x: this.state.currentIndex * Dimensions.get('window').width, animated: false});
        }, 200);
    }

    componentWillMount() {
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(this.state.currentIndex != nextState.currentIndex){
            var name = this.props.data.get('name'),
                subhead = (nextState.currentIndex + 1) + '/' + this.props.data.get('pics').size;
            Actions.refresh({renderTitle:function(){
                return(
                    <View style={RouteCSS.showGirlTitle}>
                        <Text numberOfLines={1} style={RouteCSS.showGirlTitleText}>
                            {name}
                        </Text>
                        <Text style={RouteCSS.showGirlTitleSubheader}>
                            {subhead}
                        </Text>
                    </View>
                )
            }})
        }
        if(this.state.display !=nextState.display){
            Actions.refresh({hideNavBar: !nextState.display})
        }
        // return this.state.currentIndex !=nextState.currentIndex ||
        //     this.state.display !=nextState.display ||
        //     this.state.viewRef !=nextState.viewRef;
        return true;
    }

    download(){
        if(this.props.data.get('pics')){
            var picUrl = this.props.data.get('pics').toArray()[this.state.currentIndex],
                fileName = 'ng_' + parseInt(Math.random() * 1000) + new Date().getTime(),
                filePath = '/sdcard/DCIM/Camera/' + fileName + '.jpg';
            RNFS.downloadFile(
                {
                    fromUrl: picUrl,
                    toFile: filePath,

                }
            ).promise.then((response) => {
                if (response.statusCode == 200) {
                    CameraRoll.saveToCameraRoll('file://' + filePath).then(function (success) {
                            Alert.alert(
                                '',
                                '保存到相册成功',
                                [
                                    {text: '确定'}

                                ]
                            )
                        }, function (error) {
                            Alert.alert(
                                '',
                                '保存到相册失败',
                                [
                                    {text: '确定'}

                                ]
                            )
                        }
                    )
                } else {
                    Alert.alert(
                        '',
                        '保存到相册失败',
                        [
                            {text: '确定'}

                        ]
                    )
                }
            }).catch((err) => {
                Alert.alert(
                    '',
                    '保存到相册失败',
                    [
                        {text: '确定'}

                    ]
                )
            });
        }
    }

    onPress(){
        this.setState({display: !this.state.display});
    }

    handleScroll(e) {
        const event = e.nativeEvent;
        const layoutWidth = event.layoutMeasurement.width;
        const currentIndex = Math.floor((event.contentOffset.x + (0.5 * layoutWidth)) / layoutWidth);
        if(currentIndex !== this.state.currentIndex){
            this.setState({currentIndex:currentIndex});
            if(this.state.display){
                this.setState({display:false});
            }
        }
    }

    goVip(){
        Actions.vip({hideNavBar: false});
    }

    imageLoaded() {
        if(this.state.viewRef === 0){
        }
        this.setState({viewRef: findNodeHandle(this.imageRef)});
    }

    renderRow(dataRow,p,index){
        let width = Dimensions.get('window').width,
            height = Dimensions.get('window').height;
        let that = this;
        let imageView =
            <TouchableWithoutFeedback
                onPress={this.onPress.bind(this)} >
                <PhotoView
                    source={dataRow}
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType="fitCenter"
                    style={{width: width,height: height}}/>
            </TouchableWithoutFeedback>;
        if(!that.props.data.get('isVip') && index == that.props.data.get('pics').size-1){
            imageView =
                <View style={{marginTop: 50}}>
                    <Image
                        onLoadEnd={this.imageLoaded.bind(this,true)}
                        resizeMode={Image.resizeMode.cover}
                        ref={(ref)=>{that.imageRef = ref}}
                        style={{width:width,height:height-108,backgroundColor:'#d2d2d2'}}
                        source={dataRow} >
                        <BlurView
                            blurRadius={10}
                            downsampleFactor={10}
                            overlayColor={'rgba(255, 255, 255, .85)'}
                            style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width:width,
                            height:height
                        }}
                            viewRef={that.state.viewRef}>
                        </BlurView>
                        <View style={ShowGirlCSS.blurView}>
                            <View style={ShowGirlCSS.blurTipView}>
                                <Text style={ShowGirlCSS.blurTipViewText}>剩余{that.props.data.get('unlock')}张私密图片</Text>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={this.goVip.bind(this)} >
                                <Image
                                    style={ShowGirlCSS.blurLockImage}
                                    source={require('../images/showGirl/lockBg.png')}
                                    resizeMode="contain"/>
                            </TouchableWithoutFeedback>
                        </View>
                    </Image>
                </View>
        }
        return imageView;
    }

    render() {
        console.log(this.state.viewRef);
        return (
            <View style={ShowGirlCSS.containerView}>
                <ListView
                    ref={(scrollView) => {this._scrollView = scrollView;}}
                    initialListSize={200}
                    onScroll={this.handleScroll.bind(this)}
                    horizontal={true}
                    pagingEnabled={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                </ListView>
                <TouchableOpacity  onPress={this.download.bind(this)}>
                    {
                        this.state.display?
                            <View style={ShowGirlCSS.downloadView}>
                                <Text style={ShowGirlCSS.downloadText}>下载</Text>
                            </View>
                            :
                            null
                    }
                </TouchableOpacity>

            </View>
        );
    }
}

export default ShowImage;
