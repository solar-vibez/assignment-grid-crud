import { AG_GRID_LOCALE_EN } from '@ag-grid-community/locale'
import {
  AllEnterpriseModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  themeQuartz,
} from 'ag-grid-enterprise'

/**
 * Base ag-Grid theme configuration.
 */
export const agGridBaseTheme = themeQuartz.withParams({
  accentColor: '#0064b4',
  borderColor: '#f1f5f9',
  browserColorScheme: 'light',
  cellHorizontalPaddingScale: 1,
  columnBorder: '1px solid #f1f5f9',
  columnHoverColor: '#f1f5f9',
  fontFamily: '"Open Sans", sans-serif',
  foregroundColor: '#1f2937',
  headerBackgroundColor: '#ffffff',
  headerFontSize: 12,
  headerFontWeight: 500,
  headerTextColor: '#374151',
  headerVerticalPaddingScale: 0.72,
  iconSize: 14,
  menuBackgroundColor: '#ffffff', // colors.white
  rangeSelectionBackgroundColor: '#f1f5f9',
  rowGroupIndentSize: '1rem',
  rowVerticalPaddingScale: 0.72,
  selectCellBackgroundColor: '#f1f5f9',
  selectedRowBackgroundColor: '#f1f5f9',
  spacing: 8,
  textColor: '#1f2937',
  wrapperBorder: 'none',
  wrapperBorderRadius: '0px',
})

/**
 * Register all ag-Grid enterprise modules.
 */
ModuleRegistry.registerModules([AllEnterpriseModule])

/**
 * Set some common default grid options for all ag-Grid instances.
 */
provideGlobalGridOptions(
  {
    autoGroupColumnDef: { cellRendererParams: { suppressCount: true } },
    autoSizePadding: 4,
    blockLoadDebounceMillis: 300,
    columnHoverHighlight: false,
    context: { invalidCells: new Map<string, { message: string }>() },
    defaultColDef: {
      enableCellChangeFlash: false,
      flex: 1,
      width: 100,
      wrapHeaderText: false,
    },
    localeText: AG_GRID_LOCALE_EN as Record<string, string>,
    maxBlocksInCache: 5,
    maxConcurrentDatasourceRequests: 3,
    popupParent: document.querySelector('body'),
    rowStyle: { borderBottom: 'none' },
    skipHeaderOnAutoSize: false,
    stopEditingWhenCellsLoseFocus: true,
    suppressColumnVirtualisation: false,
    suppressServerSideFullWidthLoadingRow: true,
    undoRedoCellEditingLimit: 10,
  },
  'deep',
)
