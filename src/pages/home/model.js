import * as homeApi from './service';
import img1 from '../../images/pic/1.jpeg';
import img2 from '../../images/pic/2.jpeg';
import img3 from '../../images/pic/3.jpeg';
import img4 from '../../images/pic/4.jpeg';
import img5 from '../../images/pic/5.jpeg';
import img6 from '../../images/pic/6.jpeg';
import img7 from '../../images/pic/7.jpeg';
import img8 from '../../images/pic/8.jpeg';
import img9 from '../../images/pic/9.jpeg';
import img10 from '../../images/pic/10.jpeg';
import img11 from '../../images/pic/11.jpeg';
import img12 from '../../images/pic/12.jpeg';

export default {
    namespace: 'home',
    state: {
        banner: [{
            "id": 368,
            "title": "新手引导",
            "subtitle": "",
            "image_src": img11,
            "load_type": 1,
            "value1": "http://m.msparis.com/play_a",
            "value2": null
        },
            {
                "id": 284,
                "title": "清洗说明",
                "subtitle": "",
                "image_src": img12,
                "load_type": 1,
                "value1": "http://activity.msparis.com/clean.html",
                "value2": null
            }],
        brands: [{
            "id":201,
            "title":"MK",
            "subtitle":"",
            "image_src":img1,
            "load_type":3,
            "value1":"http://m.msparis.com/brand_daily?id=7&mode=1",
        },{
            "id":202,
            "title":"MK",
            "subtitle":"",
            "image_src":img3,
            "load_type":3,
            "value1":"http://m.msparis.com/brand_daily?id=7&mode=1",
        },{
            "id":203,
            "title":"MK",
            "subtitle":"",
            "image_src":img1,
            "load_type":3,
            "value1":"http://m.msparis.com/brand_daily?id=7&mode=1",
        },{
            "id":204,
            "title":"MK",
            "subtitle":"",
            "image_src":img3,
            "load_type":3,
            "value1":"http://m.msparis.com/brand_daily?id=7&mode=1",
        },{
            "id":205,
            "title":"MK",
            "subtitle":"",
            "image_src":img1,
            "load_type":3,
            "value1":"http://m.msparis.com/brand_daily?id=7&mode=1",
        },],
        products_list: [],
        page: 1,
    },
    effects: {
        * load(_, {call, put, select}) {
            const {status, data} = yield call(homeApi.homepage, {});

            const {brands, banner} = yield select(state => state.home);

            if (status === 'ok') {
                yield put({
                    type: 'save',
                    payload: {
                        banner: banner,
                        brands: brands,
                    },
                });
            }
        },
        * product(_, {call, put, select}) {
            const {page, products_list} = yield select(state => state.home);
            const {status, data} = yield call(homeApi.product, {
                page,
                mode: 1,
                type: 0,
                filter: 'sort:recomm|c:330602',
            });
            if (status === 'ok') {
                yield put({
                    type: 'save',
                    payload: {
                        products_list:
                            page > 1 ? [...products_list, ...data.rows] : data.rows,
                    },
                });
            }
        },
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload};
        },
    },
};
