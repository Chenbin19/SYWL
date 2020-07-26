const files = require.context('./modules', false, /\.js$/)
const modules = files.keys().reduce((obj, key) => {
  const name = key.replace(/(\.\/|\.js)/g, '')
  obj[name] = files(key).default
  return obj
}, {})
// console.log(module.recommend)

export default {
  ...modules.user,
  ...modules.integral,
  ...modules.pay,
}
