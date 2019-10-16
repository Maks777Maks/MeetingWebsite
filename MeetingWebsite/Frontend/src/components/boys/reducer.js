import update from '../../helpers/update';
import BoysService from './BoysService';


export const BOYS_STARTED = "BOYS_STARTED";
export const BOYS_SUCCESS = "BOYS_SUCCESS";
export const BOYS_FAILED = "BOYS_FAILED";


const initialState = {
    list: {
        data: [],
        getZodiacs: [],
        getCities: [],
        currentPage: 1,
        totalCount: 0,
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getBoysData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
            BoysService.boys(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: BOYS_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: BOYS_SUCCESS,
            payload: data, 
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: BOYS_FAILED,
            //errors: response.data
        }
    }
  }

export const boysReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case BOYS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case BOYS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload.data);
          newState = update.set(newState, 'list.getCities', action.payload.cities);
          newState = update.set(newState, 'list.getZodiacs', action.payload.zodiacs);
          console.log("BOYS_SUCCESS)", action.payload);

          break;
      }
      case BOYS_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}







