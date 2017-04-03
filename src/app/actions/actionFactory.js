export default function actionFactory(type, payload = {}) {
  return {type, ...payload};
}
