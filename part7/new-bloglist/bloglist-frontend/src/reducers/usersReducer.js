import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default reducer