import * as constants from '../../constants/tabConstants';
import { TabState, initialState } from '../../types';
import { handleActions, Action } from 'redux-actions';

import Tab from '../../models/Tab';

export const tabReducers = handleActions<TabState, Tab[] | Tab | string | number | void>({
    [constants.REQUEST_ALL_TABS]: (state: TabState): TabState => ({ ...state, isFetching: true }),
    [constants.RECEIVE_ALL_TABS]: (state: TabState, action: Action<Tab[]>): TabState => ({
        ...state,
        items: action.payload || state.items,
    }),

    [constants.REQUEST_TAB]: (state: TabState, action: Action<number>): TabState => ({ ...state, isFetching: true }),
    [constants.RECEIVE_TAB]: (state: TabState, action: Action<Tab>): TabState => {
        const tab = action.payload as Tab;
        if (state.items.filter(x => x.id === tab.id).length === 0)
            state.items.push(tab);
        //
        return { ...state };  //Shallow copy to force rerender
    },

    [constants.REQUEST_ADD_TAB]: (state: TabState, action: Action<Tab>): TabState => ({ ...state, isFetching: true }),
    [constants.RESPONSE_ADD_TAB]: (state: TabState, action: Action<number>): TabState => {
        //TODO: automatically select tab for edit?
        return { ...state };  //Shallow copy to force rerender
    },

    [constants.REQUEST_REMOVE_TAB]: (state: TabState, action: Action<number>): TabState => ({ ...state, isFetching: true }),

    [constants.REQUEST_UPDATE_TAB]: (state: TabState, action: Action<Tab>): TabState => ({ ...state, isFetching: true }),

    [constants.RESPONSE_TAB]: (state: TabState, action: Action<string>): TabState => {
        state.isFetching = false;
        return { ...state };  //Shallow copy to force rerender
    },

}, initialState.tabs);