import type { MessageInstance } from 'antd/es/message/interface'

import { createContext, use } from 'react'

/** Symbol used as default value of context. */
const defaultValue = Symbol()
const MessageContext = createContext<MessageInstance | typeof defaultValue>(
  defaultValue,
)

/** Hook so we can use the context value without needing to do null checks. */
const useGlobalMessage = (): MessageInstance => {
  const instance = use(MessageContext)

  if (instance === defaultValue) {
    throw new Error(
      'useGlobalNotification() called without a <NotificationProvider /> in the tree.',
    )
  }

  return instance
}

export { MessageContext, useGlobalMessage }
