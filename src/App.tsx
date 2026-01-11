import { Alert, ConfigProvider, Flex, Spin } from 'antd'

import './App.css'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'

import { MainGrid } from './components/grid/MainGrid.tsx'
import { RowActionsToolbar } from './components/grid/RowActionsToolbar.tsx'
import { LayoutComponent } from './components/layout/LayoutComponent.tsx'
import { MessageProvider } from './components/notifications/MessageProvider.tsx'
import { loadableDataAtom } from './state/atoms'
import { mapApiToAgColDefs } from './utils/mapper/colDefMapper.ts'

const LoadingSpinner = () => (
  <Flex align="center" className="h-full" justify="center">
    <Spin size="large" />
  </Flex>
)

const AppContent = () => {
  const gridData = useAtomValue(loadableDataAtom)

  // display spinner while data is loading
  if (gridData.state === 'loading') {
    return <LoadingSpinner />
  }

  // display error message instead of grid when something went wrong
  if (gridData.state === 'hasError') {
    return (
      <div className="p-6">
        <Alert
          title={`Failed to load data: ${String(gridData.error)}`}
          type="error"
        />
      </div>
    )
  }

  // all good, proceed with data
  const { columnDefs: apiColumnDefs, rows } = gridData.data
  const columnDefs = mapApiToAgColDefs(apiColumnDefs)

  return (
    <Flex className="h-full" vertical>
      <RowActionsToolbar />
      <MainGrid columnDefs={columnDefs} rowData={rows} />
    </Flex>
  )
}

const App = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          algorithm: true,
          // Seed Token
          colorPrimary: '#012c4f',
        },
      },
    }}
  >
    <MessageProvider>
      <LayoutComponent>
        <Suspense fallback={<LoadingSpinner />}>
          <AppContent />
        </Suspense>
      </LayoutComponent>
    </MessageProvider>
  </ConfigProvider>
)

export { App }
