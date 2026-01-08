import { useEffect } from 'react'

import { getAll as getColumnDefs } from './api/endpoints/column-definitions/getAll'
import { getAll as getRows } from './api/endpoints/rows/getAll'
import { MainGrid } from './components/grid/MainGrid.tsx'
import './App.css'
import { LayoutComponent } from './components/layout/LayoutComponent.tsx'

const App = () => {
  useEffect(() => {
    void (async () => {
      try {
        const [getColumnDefsResponse, getRowsResponse] = await Promise.all([
          getColumnDefs(),
          getRows(),
        ])

        // eslint-disable-next-line no-console
        console.debug('fetched column defs:', getColumnDefsResponse)
        // eslint-disable-next-line no-console
        console.debug('fetched rows:', getRowsResponse)
      } catch (error_) {
        // eslint-disable-next-line no-console
        console.error('error fetching column defs (app):', error_)
      }
    })()
  }, [])

  return (
    <LayoutComponent>
      <MainGrid columnDefs={[]} rowData={[]} />
    </LayoutComponent>
  )
}

export { App }
