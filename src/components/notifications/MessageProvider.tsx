import { message } from 'antd'
import { type PropsWithChildren } from 'react'

import { MessageContext } from './useGlobalMessage.ts'

const MessageProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [showMessage, contextHolder] = message.useMessage()

  return (
    <MessageContext value={showMessage}>
      {contextHolder}
      {children}
    </MessageContext>
  )
}

export { MessageProvider }
