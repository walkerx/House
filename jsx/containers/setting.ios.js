import React, {PropTypes, Component} from 'react';
import {Actions} from "react-native-router-flux";
import {SettingCSS} from '../styles/index';
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
    CameraRoll
} from 'react-native';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentWillMount() {
    }

    componentWillUnmount(){
    };

    render() {
        return (
            <View style={{flex: 1,backgroundColor:"#f5f5f5"}}>
                <TouchableOpacity onPress={()=>{this.setState({show:!this.state.show});}}>
                    <View style={SettingCSS.item}>
                        <View>
                            <Text style={SettingCSS.itemText}>免责声明</Text>
                        </View>
                            <View>
                                {
                                    this.state.show?
                                        <Image style={SettingCSS.showImageBt} source={require('../images/main/retract.png')} />
                                        :
                                        <Image style={SettingCSS.showImageBt} source={require('../images/main/pullDown.png')} />
                                }
                            </View>
                    </View>
                </TouchableOpacity>
                {
                    this.state.show?
                        <View style={SettingCSS.showView}>
                            <View style={SettingCSS.lineView}/>
                            <View style={SettingCSS.content}>
                                <Text style={SettingCSS.contentText}>
                                    本应用所有图片均为互联网上搜索、整理、加工而来，除特别注明的内容之外，本应用不申明以上全部内容的著作权与所有权。我们对上载文件的内容不承担任何责任，也不表示与此图片有任何从属关系。
                                </Text>
                                <Text style={[SettingCSS.contentText,{paddingTop:10}]}>        如果您认为您的作品被复制而构成版权侵权，或您的知识产权被侵犯，请第一时间同时我们，并提供以下信息，我们将撤下侵权内容。</Text>
                                <Text style={SettingCSS.contentText}>①您的姓名，地址，联系电话和电子邮件地址</Text>
                                <Text style={SettingCSS.contentText}>②足够详细的鉴定材料以证明，您的版权受到侵犯</Text>
                                <Text style={SettingCSS.contentText}>③您的签名</Text>
                                <Text style={[SettingCSS.contentText,{paddingTop:10}]}>        提交此报告即声明，您有充分的理由证明，图片的使用未经版权拥有者，其代理人或法律的授权。您还声明（一）上述报告中的信息时真实准确的，以及（二）您是版权利益的所有者，或者您已获得授权代表该拥有人，否则作为伪证处理。
                                </Text>
                            </View>
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}

export default Setting;
