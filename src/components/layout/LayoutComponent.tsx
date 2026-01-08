import type { ReactNode } from 'react'

import { Layout, theme } from 'antd'

import CleopatraLogo from '../../assets/cleopatra-logo.svg'

const { Content, Header } = Layout

type Props = { children?: ReactNode }

/**
 * Layout component that provides a header with a logo and a content area for child components.
 */
const LayoutComponent = ({ children }: Readonly<Props>) => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <img
          alt="Cleopatra Logo"
          src={CleopatraLogo}
          style={{
            height: '1.5rem',
          }}
        />
      </Header>

      <Content style={{ height: '100%' }}>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: '100%',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  )
}

export { LayoutComponent, type Props as LayoutComponentProps }
