import { expectSaga } from 'redux-saga-test-plan'
import userSagas from '../sagas'
import { UserAPI } from '../../../ipc/UserAPI'
import {
  registerRequest,
  registerError,
  registerSuccess,
  unregisterSuccess,
  unregisterRequest,
  unregisterError,
} from '../actions'
import { getContext } from 'redux-saga/effects'

let failUnregister = false

class MockUserAPI implements UserAPI {
  registerUser(password: string, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (name === 'test') {
        resolve()
      } else {
        throw new Error('test error')
      }
    })
  }

  unregisterUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!failUnregister) {
        resolve()
      } else {
        throw new Error('test error')
      }
    })
  }
}

describe('login saga', () => {
  const userAPI = new MockUserAPI()

  it('should handle successfully registering user', () => {
    return expectSaga(userSagas)
      .provide([[getContext('userAPI'), userAPI]])
      .put(registerSuccess())
      .dispatch(registerRequest('test', 'test'))
      .run()
  })

  it('should handle failed user registration', () => {
    return expectSaga(userSagas)
      .provide([[getContext('userAPI'), userAPI]])
      .put(registerError('test error'))
      .dispatch(registerRequest('error', 'test'))
      .run()
  })

  it('should handle successful unregistration', () => {
    return expectSaga(userSagas)
      .provide([[getContext('userAPI'), userAPI]])
      .put(unregisterSuccess())
      .dispatch(unregisterRequest())
      .run()
  })

  it('should handle failed logout', () => {
    failUnregister = true
    return expectSaga(userSagas)
      .provide([[getContext('userAPI'), userAPI]])
      .put(unregisterError('test error'))
      .dispatch(unregisterRequest())
      .run()
  })
})