import { HOME, HEADERS } from "../_constants"
import axios from "axios"


export function setLoading(load) {
    return {
        type: HOME.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: HOME.LOADING_DETAIL,
        load
    }
}

export function setLoadingDetailCredits(load) {
    return {
        type: HOME.LOADING_DETAIL_CREDITS,
        load
    }
}

export function setSendLoading(loadPost) {
    return {
        type: HOME.POST_LOADING,
        loadPost
    }
}

export function setHome(data = []) {
    return {
        type: HOME.SUCCESS,
        data
    }
}

export function setDetail(data = []) {
    return {
        type: HOME.SUCCESS_DETAIL,
        data
    }
}

export function setDetailCredits(data = []) {
    return {
        type: HOME.SUCCESS_DETAIL_CREDITS,
        data
    }
}


export function setHomeFailed(data = []) {
    return {
        type: HOME.FAILED,
        data
    }
}
export function setDetailFailed(data = []) {
    return {
        type: HOME.FAILED_DETAIL,
        data
    }
}

export const FetchHome = (where = "") => {
    return (dispatch) => {
      dispatch(setLoading(true));
      let url = `movie/popular?api_key=${HEADERS.API_KEY}`;
      if (where !== "") url += `&${where}`;
      axios
        .get(HEADERS.URL + url)
        .then(function (response) {
          const data = response.data;
          dispatch(setHome(data));
          dispatch(setLoading(false));
        })
        .catch(function (error) {});
    };
  };
export const FetchHomeSearch = (where = "") => {
    return (dispatch) => {
      dispatch(setLoading(true));
      let url = `search/movie?api_key=${HEADERS.API_KEY}`;
      if (where !== "") url += `&${where}`;
      axios
        .get(HEADERS.URL + url)
        .then(function (response) {
          const data = response.data;
          dispatch(setHome(data));
          dispatch(setLoading(false));
        })
        .catch(function (error) {});
    };
  };
export const FetchDetail = (id = "") => {
    return (dispatch) => {
      dispatch(setLoadingDetail(true));
      let url = `movie/${id}?api_key=${HEADERS.API_KEY}`;
      axios
        .get(HEADERS.URL + url)
        .then(function (response) {
          const data = response.data;
          dispatch(setDetail(data));
          dispatch(setLoadingDetail(false));
        })
        .catch(function (error) {});
    };
  };
export const FetchDetailCredits = (id = "") => {
    return (dispatch) => {
      dispatch(setLoadingDetailCredits(true));
      let url = `movie/${id}/credits?api_key=${HEADERS.API_KEY}`;
      axios
        .get(HEADERS.URL + url)
        .then(function (response) {
          const data = response.data;
          dispatch(setDetailCredits(data));
          dispatch(setLoadingDetailCredits(false));
        })
        .catch(function (error) {});
    };
  };