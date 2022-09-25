import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register';

import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// サービスワーカーを登録
registerSW();
