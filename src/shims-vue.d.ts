// https://stackoverflow.com/questions/59076969/jestvue-cannot-find-module-vue
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
