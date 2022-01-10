import {
    HOME
} from "redux/actions/_constants"

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingDetailCredits: true,
    data: [],
    data_detail: {},
    data_detail_credits: {},
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME.SUCCESS:
            return Object.assign({}, state, {
                data: action.data.results,
                page: action.data.page,
                total_pages: action.data.total_pages,
            });
        case HOME.SUCCESS_DETAIL:
            return Object.assign({}, state, {
                data_detail: action.data
            });
        case HOME.SUCCESS_DETAIL_CREDITS:
            return Object.assign({}, state, {
                data_detail_credits: action.data
            });
        case HOME.FAILED:
            return Object.assign({}, state, {
                data: action.data.results,
            });
        case HOME.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case HOME.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case HOME.LOADING_DETAIL_CREDITS:
            return Object.assign({}, state, {
                isLoadingDetailCredits: action.load
            });
        default:
            return state
    }
}