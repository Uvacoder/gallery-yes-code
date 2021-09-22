# test:app

[Introduction - Test utilities](https://test-utils.nuxtjs.org/) を利用したテスト。

以下の理由により通常のテストから分離している。

- 重い
- カバレッジの対象にならない

以下のメモにもあるが、設定から分けた方がよい。

## メモ

### `setImmediate`

`testEnvironment: 'jsdom'` だと `setImmediate` が定義されていないエラーとなる。

以下で対応。
```
/**
 * @jest-environment node
 */
```




