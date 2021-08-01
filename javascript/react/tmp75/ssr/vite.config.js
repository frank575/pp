import { defineConfig, loadEnv } from 'vite'
import reactRefresh from "@vitejs/plugin-react-refresh";
import ssr from "vite-plugin-ssr/plugin";
const path = require('path')

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({plugins: [reactRefresh(), ssr()],})
};
