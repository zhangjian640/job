
/**
 * 根据用户信息，返回跳转地址
 */
export function getRedirectPath({type, avator}) {
  // user.type boss genius
  // user.avator /bossinfo geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avator) {
    url += 'info'
  }
  return url
}

/**
 *
 */
export function getChatId (userId, targetId) {
  return [userId, targetId].sort().join('_')
}