import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages はリポジトリ名のサブパスで公開されるため base を合わせる。
// ユーザー/Organizationページ（<user>.github.io）の場合は '/' に変更する。
const repoBase = '/english-words-study/';

export default defineConfig({
  base: repoBase,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'favicon.svg'],
      manifest: {
        name: '旅たび英語 - 旅行英会話・英単語学習',
        short_name: '旅たび英語',
        description:
          '様々なシーンの英単語・英会話を、記憶に残りやすく学べる学習アプリ（まずは旅行特化）',
        theme_color: '#0ea5e9',
        background_color: '#f8fafc',
        display: 'standalone',
        start_url: repoBase,
        scope: repoBase,
        lang: 'ja',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
});
