import { doPollForEscapeHatch } from 'modules/app/actions/init-augur'

export const UPDATE_IS_LOGGED = 'UPDATE_IS_LOGGED'

export const updateIsLogged = isLogged => (dispatch, getState) => {
  dispatch({
    type: UPDATE_IS_LOGGED,
    data: {
      isLogged,
    },
  })

  dispatch(doPollForEscapeHatch(dispatch, getState))
}