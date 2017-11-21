import * as constants from 'constants/operationConstants';
import { OperationState, OperationEditState, initialState, ApplicationError } from 'types';
import { handleActions, Action } from 'redux-actions';

import Operation from 'models/Operation';

export const operationReducers =
    handleActions<OperationState, Operation[] | Operation | ApplicationError | string | number | void>(
        {
            [constants.API_REQUEST_ALL_OPERATION]: (state: OperationState): OperationState => ({
                ...state,
                isFetching: true,
                items: []
            }),
            [constants.API_RESPONSE_ALL_OPERATION]: (state: OperationState,
                                                     action: Action<Operation[]>): OperationState => ({
                    ...state,
                    items: (action.payload || state.items)
                        .map(a => ({ ...a, date: new Date(a.date) })) // fix dates for JS
                        .sort((a, b) => {
                            return (+b.date) - (+a.date);           // sort by date
                        }),
                }),

            [constants.API_REQUEST_GET_OPERATION]: (state: OperationState, action: Action<number>): OperationState => ({
                ...state,
                isFetching: true
            }),
            [constants.API_RESPONSE_GET_OPERATION]: (state: OperationState, action: Action<Operation>): OperationState => {
                const operation = action.payload as Operation;
                if (state.items.filter(x => x.id === operation.id).length === 0)
                    state.items.push(operation);
                //
                return { ...state };  // Shallow copy to force rerender
            },

            [constants.API_REQUEST_ADD_OPERATION]: (state: OperationState, action: Action<Operation>): OperationState => ({
                ...state,
                isFetching: true
            }),
            [constants.API_RESPONSE_ADD_OPERATION]: (state: OperationState, action: Action<number>): OperationState => ({
                ...state // Shallow copy to force rerender
            }),

            [constants.API_REQUEST_REMOVE_OPERATION]: (state: OperationState, action: Action<number>): OperationState => ({
                ...state,
                isFetching: true
            }),

            [constants.API_REQUEST_EDIT_OPERATION]: (state: OperationState,
                                                     action: Action<Operation>): OperationState => ({
                    ...state,
                    isFetching: true
                }),

            [constants.API_RESPONSE_GET_OPERATION]: (state: OperationState, action: Action<string>): OperationState => {
                state.isFetching = false;
                return { ...state };  // Shallow copy to force rerender
            },

            [constants.API_ERROR_OPERATION]: (state: OperationState,
                                              action: Action<ApplicationError>): OperationState => {
                alert((action.payload as ApplicationError).text);
                state.isFetching = false;
                return { ...state };  // Shallow copy to force rerender
            },

            [constants.UI_EDIT_OPEN_OPERATION]: (state: OperationState, action: Action<Operation>): OperationState => (
                {
                    ...state,
                    edit: {
                        ...state.edit,
                        open: true,
                        operation: action.payload as Operation,
                        isNew: (action.payload as Operation).id === -1
                    }
                }),

            [constants.UI_EDIT_SAVE_OPERATION]: (state: OperationState, action: Action<Operation>): OperationState => (
                {
                    ...state,
                    isFetching: true
                }),

            [constants.UI_EDIT_CLOSE_OPERATION]: (state: OperationState, action: Action<Operation>): OperationState => (
                {
                    ...state,
                    edit: {
                        ...state.edit,
                        open: false
                    }
                }),

        },
        initialState.operations);