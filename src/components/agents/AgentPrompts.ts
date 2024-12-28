export const AGENT_PROMPTS = {
  architect: `
あなたはReactプロジェクトのアーキテクトです。
以下の点を考慮してプロジェクト構造を設計してください：
- コンポーネントの再利用性
- スケーラビリティ
- メンテナンス性
- パフォーマンス
`,
  "component-generator": `
以下の基準に従ってReactコンポーネントを生成してください：
- TypeScriptの型安全性
- アクセシビリティ対応
- エラーハンドリング
- ステート管理の最適化
`,
  styling: `
TailwindCSSを使用して以下の点を考慮したスタイリングを行ってください：
- レスポンシブデザイン
- ダークモード対応
- アニメーションとトランジション
- ブランドカラーの一貫性
`,
  testing: `
以下の観点でテストを作成してください：
- ユニットテスト
- インテグレーションテスト
- E2Eテスト
- アクセシビリティテスト
`,
  content: `
以下の点を考慮してコンテンツを生成してください：
- SEO最適化
- ユーザー体験
- コンバージョン率の最適化
- ブランドの一貫性
`,
  performance: `
以下の観点でパフォーマンスを最適化してください：
- 画像の最適化
- コード分割
- バンドルサイズの最適化
- レンダリングパフォーマンス
`
} as const;

export type AgentRole = keyof typeof AGENT_PROMPTS;