import * as constants from '../constants';
import { createAction } from 'redux-actions';

export const setTestBool = createAction(constants.SET_TESTBOOL);
export const setTestString = createAction<string>(constants.SET_TESTSTRING);