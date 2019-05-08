import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import './index.scss';
import namedPng from '../../images/pic/16.jpeg';

import Mcaptcha from '../../utils/mcaptcha'

@connect(({home, cart, loading}) => ({
    ...home,
    ...cart,
    ...loading,
}))
class Index extends Component {
    config = {
        navigationBarTitleText: '首页',
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: 'home/load',
        });
        this.props.dispatch({
            type: 'home/product',
        });

        // 设置衣袋小红点
        if (this.props.items.length > 0) {
            Taro.setTabBarBadge({
                index: 1,
                text: String(this.props.items.length),
            });
        } else {
            Taro.removeTabBarBadge({
                index: 1,
            });
        }
        this.ready();
    };

    //分享
    onShareAppMessage() {
        return {
            title: '基于Taro框架开发的时装衣橱',
            path: '/pages/home/index',
        };
    }

    // 小程序上拉加载
    onReachBottom() {
        this.props.dispatch({
            type: 'home/save',
            payload: {
                page: this.props.page + 1,
            },
        });
        this.props.dispatch({
            type: 'home/product',
        });
    }

    ready() {
        let num = this.getRanNum();
        console.log(num)
        // this.setData({
        //     num: num
        // })
        new Mcaptcha({
            el: 'canvas',
            width: 80,//对图形的宽高进行控制
            height: 30,
            code: num
        });
    }
    getRanNum= ()=> {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let pwd = '';
        for (let i = 0; i < 4; i++) {
            if (Math.random() < 48) {
                pwd += chars.charAt(Math.random() * 48 - 1);
            }
        }
        return pwd;
    }

    render() {
        const {banner, brands, products_list, effects} = this.props;
        debugger
        return (
            <View className="home-page">
                <MySwiper banner={banner} home/>

                <View className="nav-list">
                    {brands.map((item, index) => (
                        <View className="nav-item" key={index}>
                            <Image mode="widthFix" className='img-size' src={item.image_src}/>
                        </View>
                    ))}
                </View>
                <View className='canvas at-row'>
                    <View className='at-col'>图形验证码:</View>
                    <View className='at-col'>
                        <canvas  style={{width:'100px',height:'50px'}} canvas-id="canvas" bindtap='onReady'></canvas>
                    </View>
                </View>
                {/* 流量主广告 */}
                {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
                    <ad unit-id="adunit-dc1c0a38156fa412"/>
                )}
                <Text className="recommend">为你推荐</Text>
                <GoodsList list={products_list} loading={effects['home/product']}/>
            </View>
        );
    }
}

export default Index;
