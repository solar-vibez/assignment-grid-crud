import type { GridApi } from 'ag-grid-enterprise'

import { Flex, Input, Typography } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { update } from '../../api/endpoints/rows/update.ts'
import { gridRefAtom, selectedRowsAtom } from '../../state/atoms.ts'
import { useGlobalMessage } from '../notifications/useGlobalMessage.ts'

const { TextArea } = Input
const { Text, Title } = Typography

type DetailsEditorProps = {
  api: GridApi
}

const DetailsEditor = ({ api }: Readonly<DetailsEditorProps>) => {
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
  const [selectedRow] = selectedRows
  const [value, setValue] = useState<string>(selectedRow?.description ?? '')
  const debounceTimerRef = useRef<null | ReturnType<typeof setTimeout>>(null)
  const showMessage = useGlobalMessage()

  // cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // sync value when selectedRow.description changes (e.g., via grid cell editor or grid updates)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setValue(selectedRow?.description ?? '')
  }, [selectedRow?.description, selectedRow?.id])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      // clear previous debounce timer
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current)
      }

      if (!selectedRow) {
        return
      }

      // set new debounce timer (500ms delay before persisting)
      debounceTimerRef.current = setTimeout(async () => {
        if (selectedRow.description === newValue) {
          return
        }

        const updatedRow = { ...selectedRow, description: newValue }
        const previousRow = { ...selectedRow }

        // Optimistically update selectedRows atom and AG Grid for snappy UX
        setSelectedRows([updatedRow])

        api.applyTransaction({ update: [updatedRow] })

        try {
          await update(updatedRow)
          showMessage.success({ content: 'Description updated successfully' })
        } catch (error) {
          // rollback
          setSelectedRows([previousRow])
          api.applyTransaction({ update: [previousRow] })
          showMessage.error({ content: (error as Error).message })

          // revert local value
          setValue(previousRow.description)
        }
      }, 500)
    },
    [selectedRow, setSelectedRows, api, showMessage],
  )

  return <TextArea maxLength={255} onChange={handleChange} value={value} />
}

const Details = () => {
  const selectedRows = useAtomValue(selectedRowsAtom)
  const gridRef = useAtomValue(gridRefAtom)

  if (selectedRows.length === 0 || selectedRows.length > 1 || !gridRef?.api) {
    return (
      <Flex align="center" className="h-full" justify="center">
        <Text>Single row must be selected</Text>
      </Flex>
    )
  }

  const [selectedRow] = selectedRows

  return (
    <>
      <Title data-testid="Details.title" level={3}>
        {selectedRow?.description}
      </Title>
      <DetailsEditor api={gridRef.api} />
    </>
  )
}

export { Details }
