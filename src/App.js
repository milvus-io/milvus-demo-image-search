import React from "react";
import HashRouter from './Router';
import { message } from "antd";
import { DataManagementProvider } from './context/data-management'
import { SystemProvider } from './context/system'
import { HttpProvider } from './context/http'
import "./app.less";

message.config({
  duration: 2,
  maxCount: 1
});

/**
 *  SystemProvider will always on top. The currenAddress means selected milvus ip.
 *  So the other context data must like:
 *  {
 *    '127.0.0.1:19121': {...data},
 *    '127.0.0.1:19122': {...data},
 *  }
 *  
 *  Then we can get current data by currenAddress!
 *  The currenAddress also need store in localstorage for http/index.js to use it.
 */
export default function App() {
  return (
    <HttpProvider>
      <SystemProvider>
        <DataManagementProvider>
          <HashRouter></HashRouter>
        </DataManagementProvider>
      </SystemProvider>
    </HttpProvider>
  );
}
