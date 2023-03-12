// redux-persist
// https://blog.csdn.net/weixin_48145150/article/details/128895590?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~AD_ESQUERY~yljh-1-128895590-blog-129119062.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~AD_ESQUERY~yljh-1-128895590-blog-129119062.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=2

import { combineReducers, createStore } from 'redux'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserStore from "./UserStore";
import MenuStore from './MenuStore'
import { composeWithDevTools } from 'redux-devtools-extension'

// 合并多个reducer
const reducers = combineReducers(
    {
        userInfo: UserStore.reducer,
        menu: MenuStore.reducer
    }
)

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['menu']  // 设置某个reducer数据不持久化
    // whitelist: ['switchCity'] // 设置某个reducer数据持久化
}

const persistReducers = persistReducer(persistConfig, reducers)

// 创建store
const store = createStore(persistReducers)
const persistor = persistStore(store)

export {store, persistor};