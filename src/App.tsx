import { Alert, Flex, Spin } from 'antd'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'

import './App.css'

import { mapApiToAgColDefs } from './utils/mapper/colDefMapper.ts'
import { MainGrid } from './components/grid/MainGrid.tsx'
import { LayoutComponent } from './components/layout/LayoutComponent.tsx'
import { loadableDataAtom } from './state/atoms'

const LoadingSpinner = () => (
  <Flex align="center" justify="center" className="h-full">
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

  return <MainGrid columnDefs={columnDefs} rowData={rows} />
}

const App = () => {
  return (
    <LayoutComponent>
      <Suspense fallback={<LoadingSpinner />}>
        <AppContent />
      </Suspense>
    </LayoutComponent>
  )
}

export { App }
