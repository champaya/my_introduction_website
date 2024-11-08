/**
 * @fileoverview コマンド処理の中核となるモジュール
 * 利用可能なコマンドの定義と、コマンドハンドラーの実装を提供
 */

import { CommandResponse } from "../types";

/**
 * 利用可能なコマンドとその説明
 */
export const AVAILABLE_COMMANDS = {
  help: "Show available commands",
  about: "Display information about me",
  skills: "List technical skills",
  projects: "Show portfolio projects",
  contact: "Display contact information",
  certifications: "Show professional certifications",
  clear: "Clear terminal history",
  theme: "Change terminal theme (classic/modern/hacker)",
  download: "Download resume PDF",
};

const RESUME_URL = "/assets/skill.pdf";

/**
 * コマンドを処理し、適切なレスポンスを返す関数
 * @param {string} command - 実行するコマンド文字列
 * @returns {CommandResponse} コマンドの実行結果
 */
export const handleCommand = (command: string): CommandResponse => {
  // コマンドを小文字に変換し、前後の空白を削除
  const cmd = command.toLowerCase().trim();

  // helpコマンドの処理
  if (cmd === "help") {
    return {
      type: "help",
      content: Object.entries(AVAILABLE_COMMANDS).map(([cmd, desc]) => ({
        command: cmd,
        description: desc,
      })),
    };
  }

  // downloadコマンドの処理
  if (cmd === "download") {
    return {
      type: "download",
      content: {
        filename: "スキルシート.pdf",
        url: RESUME_URL,
      },
    };
  }

  // aboutコマンドの処理
  if (cmd === "about") {
    return {
      type: "about",
      content: {
        name: "HAYATO ITO",
        role: "Full Stack Developer",
        bio: "日系企業で約3年間エンジニアとして従事し、主にTypeScriptを用いたフロントエンド開発に携わってまいりました。Angular/React/Vueの全て経験がございます。\n\nまた、業務ではフロントエンドのみでなく、Spring BootやFlaskを用いたバックエンド開発も担当し、AWS運用の経験も有しております。\n\n個人的な活動としては、Flutterを用いたAndroid向けのアプリ開発。Unity/Blenderでの3Dモデリング。pythonライブラリのscikit-learnを用いた機械学習の実装など幅広い技術の習得をしております。",
        location: "東京 中央区",
        interests: ["music", "illustration", "programming"],
        social: {
          instagram: "/zutomayo_program_tai/",
          github: "https://github.com/champaya",
          zenn: "https://zenn.dev/chanpaya",
          note: "https://note.com/champaya/",
        },
      },
    };
  }

  // skillsコマンドの処理
  if (cmd === "skills") {
    return {
      type: "skills",
      content: {
        languages: [
          { name: "Java", level: 70 },
          { name: "Python", level: 75 },
          { name: "HTML/CSS", level: 85 },
          { name: "TypeScript", level: 85 },
          { name: "SQL", level: 70 },
          { name: "Dart", level: 30 },
        ],
        framework: [
          { name: "Spring Boot", level: 85 },
          { name: "Flask", level: 75 },
          { name: "React", level: 90 },
          { name: "Angular", level: 85 },
          { name: "Vue", level: 75 },
          { name: "Flutter", level: 75 },
        ],
        infrastructure: [
          { name: "AWS", level: 85 },
          { name: "GCP", level: 75 },
          { name: "Azure", level: 75 },
          { name: "Windows", level: 75 },
          { name: "Linux", level: 75 },
          { name: "Mac", level: 75 },
        ],
        tools: [
          { name: "Git", level: 85 },
          { name: "SVN", level: 75 },
          { name: "VScode", level: 80 },
          { name: "Cursor", level: 90 },
          { name: "Gen AI", level: 75 },
          { name: "Docker", level: 80 },
        ],
      },
    };
  }

  // projectsコマンドの処理
  if (cmd === "projects") {
    return {
      type: "projects",
      content: [
        {
          name: "AIシステム評価フレームワーク構築",
          startDate: "2024年10月",
          duration: "3ヵ月",
          role: "SE",
          teamSize: "チーム8名",
          projectSize: "PJ全体8名",
          phase: "設計、実装、テスト",
          description:
            "AIシステムの評価フレームワークの構築プロジェクト。評価指標の設計と実装、評価結果の可視化システムの構築、UI/UXの全面的な刷新を担当。",
          responsibilities: [
            "AIシステム評価ロジックの実装",
            "APIエンドポイントの設計と実装",
            "Vue.jsを用いたフロントエンド開発",
            "評価結果の可視化機能の実装",
            "Dockerコンテナ環境の構築",
          ],
          tech: {
            languages: [
              "Python",
              "HTML",
              "CSS",
              "JavaScript",
              "PHP",
              "PostgreSQL",
            ],
            framework: ["Flask", "Vue.js"],
            infrastructure: ["Linux", "AWS", "Tomcat", "NGINX"],
            tools: ["Docker", "Git", "Cursor", "GitHub"],
          },
        },
        {
          name: "ECサイト改修/機能追加",
          startDate: "2024年7月",
          duration: "2ヵ月",
          role: "PG",
          teamSize: "チーム4名",
          projectSize: "PJ全体4名",
          phase: "設計、実装、テスト",
          description:
            "レストランのネット注文サイト保守プロジェクト。既存不具合の改修と新機能追加を担当。",
          responsibilities: [
            "サーバ上のエラー調査",
            "DBのテーブル設計変更とマイグレーション",
            "商品管理機能の追加",
            "単体テストクラスの追加",
            "結合テスト実施",
          ],
          tech: {
            languages: ["Java", "HTML", "CSS", "TypeScript", "PostgreSQL"],
            framework: ["SpringBoot", "JUnit"],
            infrastructure: ["Linux", "AWS", "Tomcat"],
            tools: ["Git", "GitHub"],
          },
        },
        {
          name: "証券会社の営業支援アプリ再構築",
          startDate: "2023年10月",
          duration: "8ヵ月",
          role: "SE",
          teamSize: "チーム9名",
          projectSize: "PJ全体30名",
          phase: "設計、実装、テスト",
          description:
            "営業支援アプリをPowerAppsからフルスクラッチに再構築するプロジェクト。",
          responsibilities: [
            "共通機能作成のための技術検証",
            "詳細設計（画面・共通機能・状態管理）",
            "実装（画面・共通機能・状態管理）",
            "ソースレビュー",
            "テスト仕様書作成",
          ],
          tech: {
            languages: ["Java", "HTML", "CSS", "TypeScript", "MySQL"],
            framework: ["SpringBoot", "JUnit", "React"],
            infrastructure: ["Tomcat", "AWS", "iPad"],
            tools: ["Git", "SVN", "GitLab", "Visual Studio Code"],
          },
        },
        {
          name: "銀行取引アプリのフロントFW移行",
          startDate: "2022年10月",
          duration: "1年",
          role: "SE",
          teamSize: "チーム25名",
          projectSize: "PJ全体40名",
          phase: "技術検証、実装、テスト",
          description:
            "取引アプリのフロントフレームワークをSenchaからAngularに移行するプロジェクト。現行システムの移行と現行バグ部分や不要コードの削除を担当。",
          responsibilities: [
            "ライブラリ管理",
            "Angularバージョンアップ対応",
            "Angular技術検証",
            "実装（画面・共通機能）",
            "テスト仕様書作成",
            "単体テスト実施",
            "内部QA回答",
          ],
          tech: {
            languages: ["HTML", "CSS", "TypeScript", "Swift", "DB2"],
            framework: ["Angular", "Capacitor"],
            infrastructure: ["Linux", "iPad"],
            tools: [
              "Eclipse",
              "Visual Studio Code",
              "SVN",
              "Tera Term",
              "Redmine",
            ],
          },
        },
      ],
    };
  }

  // contactコマンドの処理
  if (cmd === "contact") {
    return {
      type: "contact",
      content: {
        formUrl: "https://forms.gle/FXYDyZsPz6oXVv1Z9",
      },
    };
  }

  // certificationsコマンドの処理
  if (cmd === "certifications") {
    return {
      type: "certifications",
      content: [
        {
          name: "Google Cloud Certified Cloud Digital Leader",
          issuer: "Google Cloud",
          date: "2024年1月",
        },
        {
          name: "統計検定2級",
          issuer: "統計質保証推進協会",
          date: "2024年2月",
        },
        {
          name: "LinuC-1",
          issuer: "LPI-Japan",
          date: "2023年9月",
        },
        {
          name: "AWS Certified Solution Architect-Associate",
          issuer: "Amazon Web Services",
          date: "2023年2月",
        },
        {
          name: "応用情報技術者試験",
          issuer: "IPA (情報処理推進機構)",
          date: "2022年12月",
        },
        {
          name: "Javaプログラミング能力認定試験2級",
          issuer: "サーティファイ",
          date: "2022年7月",
        },
      ],
    };
  }

  // clearコマンドの処理
  if (cmd === "clear") {
    return {
      type: "clear",
      content: null,
    };
  }

  // コマンドが見つからない場合のエラーレスポンス
  return {
    type: "error",
    content: `Command not found: ${command}. Type 'help' for available commands.`,
  };
};
