/**
 * @fileoverview アプリケーション全体で使用する型定義
 */

/**
 * コマンド履歴の各エントリーを表す型
 */
export interface CommandType {
  /** 入力されたコマンド文字列 */
  input: string;
  /** コマンドの出力結果 */
  output: CommandResponse;
  /** コマンドが実行された時刻 */
  timestamp: string;
}

/**
 * コマンド実行結果のレスポンス型
 */
export interface CommandResponse {
  /** コマンドの種類 */
  type:
    | "help"
    | "about"
    | "skills"
    | "certifications"
    | "projects"
    | "download"
    | "contact"
    | "clear"
    | "error"
    | "game";
  /** コマンドの実行結果データ */
  content: any;
}

/**
 * aboutコマンドのコンテンツ型
 */
export interface AboutContent {
  /** 名前 */
  name: string;
  /** 役職・職種 */
  role: string;
  /** 自己紹介文 */
  bio: string;
  /** 所在地 */
  location: string;
  /** 興味・関心のある分野 */
  interests: string[];
}

/**
 * skillsコマンドのコンテンツ型
 */
export interface SkillsContent {
  /** プログラミング言語のスキル一覧 */
  languages: Array<{ name: string; level: number }>;
  /** フレームワーク関連のスキル一覧 */
  framework: Array<{ name: string; level: number }>;
  /** インフラ関連のスキル一覧 */
  infrastructure: Array<{ name: string; level: number }>;
  /** 開発ツール関連のスキル一覧 */
  tools: Array<{ name: string; level: number }>;
}

/**
 * projectsコマンドのコンテンツ型
 */
export interface ProjectContent {
  /** プロジェクト名 */
  name: string;
  /** プロジェクトの説明 */
  description: string;
  /** プロジェクト期間 */
  period: string;
  /** 役割 */
  role: string;
  /** チーム規模 */
  teamSize: string;
  /** 担当業務 */
  responsibilities: string[];
  /** 使用技術一覧 */
  tech: string[];
  /** プロジェクトのURL */
  link: string;
}

/**
 * contactコマンドのコンテンツ型
 */
export interface ContactContent {
  /** メールアドレス */
  email: string;
  /** GitHubプロフィールURL */
  github: string;
  /** LinkedInプロフィールURL */
  linkedin: string;
  /** Twitterハンドル */
  twitter: string;
  /** コンタクトフォームURL */
  formUrl: string;
}

/**
 * certificationsコマンドのコンテンツ型
 */
export interface CertificationContent {
  /** 資格・認定名 */
  name: string;
  /** 発行組織 */
  issuer: string;
  /** 取得日 */
  date: string;
  /** 有効期限（オプション） */
  validUntil?: string;
}

/**
 * downloadコマンドのコンテンツ型
 */
export interface DownloadContent {
  /** ファイル名 */
  filename: string;
  /** ダウンロードURL */
  url: string;
}
