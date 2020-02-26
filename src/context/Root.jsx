import React, { createContext, useState } from 'react';
export const rootContext = createContext({})

const { Provider } = rootContext;

const TestDialog = {
  open: true,
  title: "Test Dialog",
  component: <div onClick={()=>console.log('xixiixiixiix')}><p>wahhhhhh</p><p>this is test dialog </p></div>,
  confirm: {
    label: '确定',
    onConfirm: () => { console.log('dialog confirm') },
  },
  cancle: {
    label: '取消',
    onCancel: () => { console.log('dialog cancle') }
  }
}
const RootProvider = ({ children }) => {
  const [dialog, setDialog] = useState(TestDialog);

  return (
    <Provider value={{
      dialog, setDialog,
    }}>
      {children}
    </Provider>

  )
}
export default RootProvider

