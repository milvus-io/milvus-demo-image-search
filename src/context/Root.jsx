import React, { createContext, useState } from 'react';
export const rootContext = createContext({})

const { Provider } = rootContext;

const BasicDialog = {
  open: true,
  title: "",
  component: <></>,
  confirm: {
    label: '',
    onConfirm: () => { },
  },
  cancle: {
    label: '',
    onCancel: () => { }
  }
}
const TestDialog = {
  open: true,
  title: "Test Dialog",
  component: <div onClick={()=>console.log('xixiixiixiix')}><p>wahhhhhh</p><p>this is test dialog </p></div>,
  confirm: {
    label: '确定',
    onConfirm: () => { console.log('ahhhh') },
  },
  cancle: {
    label: '取消',
    onCancel: () => { console.log('wullalallala') }
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

