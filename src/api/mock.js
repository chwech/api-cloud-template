import axios from './http'
import MockAdapter from 'axios-mock-adapter'
function createData (data) {
  return {
    data: {
      data: data
    }
  }
}
const success = {
  status: 1,
  data: {},
  msg: ''
}
let presList = [
  { id: 1 }
]
let addrList = {
  data: [
    { id: 1 }
  ]
}
const prescriptionList = Object.assign({}, success, createData(presList))
const addressList = Object.assign({}, success, addrList)
const Mock = {
  init () {
    // 只在开发模式下才使用mock
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    const mock = new MockAdapter(axios)
    console.log(prescriptionList)
    mock.onGet('/prescription').reply(200, prescriptionList)
    mock.onGet('/address').reply(200, addressList)

    // 其它没有指定的url走axios
    mock.onAny().passThrough()
  }
}

export default Mock
