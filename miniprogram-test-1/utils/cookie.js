const key = 'cookie'


//取出cookies
function getSessionIDFromResponse(res) {
  var cookie = res.header['Set-Cookie']
  console.log('get cookie from response: ' + cookie)
  return cookie
}
//把cookies存储到storage
function setCookieToStorage(cookie) {
  try {
    wx.setStorageSync(key, cookie)
  } catch (e) {
    console.log(e)
  }
}
//从storage里取出cookies
function getCookieFromStorage() {
  var value = wx.getStorageSync(key)
  return value
}

module.exports = {
  setCookieToStorage: setCookieToStorage,
  getCookieFromStorage: getCookieFromStorage,
  getSessionIDFromResponse: getSessionIDFromResponse
}