import React, {PropTypes, Component} from 'react';
import {Actions} from "react-native-router-flux";
import {ShowGirlCSS,RouteCSS} from '../styles/index'
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
    TouchableWithoutFeedback
} from 'react-native';

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
        this.state = {
            imageSource: imageSource,
            currentIndex: props.index, //当前图片页数
            display: true  //显示标题及下载
        };
    }

    componentDidMount() {
        this._scrollView.scrollTo({x: this.state.currentIndex * Dimensions.get('window').width, animated: false});
    }

    componentWillMount() {
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(this.state.currentIndex !=nextState.currentIndex){
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
        return this.state.currentIndex !=nextState.currentIndex ||
            this.state.display !=nextState.display;
    }

    download(){
        if(this.props.data.get('pics')){
            var picUrl = this.props.data.get('pics').toArray()[this.state.currentIndex];
            CameraRoll.saveToCameraRoll(picUrl).then(function (success) {
                        Alert.alert(
                            '',
                            '保存到相册成功',
                            [
                                {text: '确定', onPress: () => console.log(success)}

                            ]
                        )
                    }, function (error) {
                        Alert.alert(
                            '',
                            '保存到相册失败',
                            [
                                {text: '确定', onPress: () => console.log(error)}

                            ]
                        )
                    }
                )
        }
    }

    onPress(){
        this.setState({display: !this.state.display});
    }

    renderImageView() {
        return this.state.imageSource.map((pic,index)=>{
            return (
                <ScrollView
                    horizontal={true}
                    style={{flex: 1}}
                    maximumZoomScale={3.0}
                    key={index}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={this.onPress.bind(this)} >
                        <Image
                            style={ShowGirlCSS.imageItem}
                            source={pic}
                            resizeMode="contain"
                        />
                    </TouchableWithoutFeedback>
                </ScrollView>
            );
        });
    }

    handleScroll(e) {
        const event = e.nativeEvent;
        const layoutWidth = event.layoutMeasurement.width;
        const currentIndex = Math.floor((event.contentOffset.x + (0.5 * layoutWidth)) / layoutWidth);
        if(currentIndex != 'Infinity' && currentIndex !== this.state.currentIndex){
            this.setState({currentIndex:currentIndex});
        }
        if(currentIndex != 'Infinity' && this.state.display){
            this.setState({display:false});
        }
    }

    render() {
        return (
            <View style={ShowGirlCSS.containerView}>
                <StatusBar
                    hidden={!this.state.display}
                    barStyle={'light-content'}
                />
                <ScrollView
                    ref={(scrollView) => {this._scrollView = scrollView;}}
                    onScroll={this.handleScroll.bind(this)}
                    horizontal={true}
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {this.renderImageView()}
                </ScrollView>
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
