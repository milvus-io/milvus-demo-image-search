import React from "react";
import HashRouter from './Router';
import { HttpProvider } from './context/Http'
import { MaterialProvider } from './context/Root'
import "./app.less";
import "./assets/scss/reset.less"

/**
 *  SystemProvider will always on top. The currenAddress means selected milvus ip.
 *  So the other context data must like:
 *  {
 *    '127.0.0.1:19121': {...data},
 *    '127.0.0.1:19122': {...data},
 *  }
 *  
 *  Then we can get current data by currenAddress!
 *  The currenAddress also need store in localstorage for http context to use it.
 */
export default function App() {
  return (
    <MaterialProvider>
      <HttpProvider>
        <HashRouter></HashRouter>
      </HttpProvider>
    </MaterialProvider>
  );
}
