import { readFileSync } from 'node:fs'

function fail(message) {
  console.error(`❌ ${message}`)
  process.exitCode = 1
}

function pass(message) {
  console.log(`✅ ${message}`)
}

const toolbarPath = 'src/components/TopToolbar.tsx'
const toolbar = readFileSync(toolbarPath, 'utf8')

const topToolbarExportMatches = toolbar.match(/export\s+function\s+TopToolbar\s*\(/g) ?? []
const propsInterfaceMatches = toolbar.match(/interface\s+TopToolbarProps\s*\{/g) ?? []

if (topToolbarExportMatches.length !== 1) {
  fail(`${toolbarPath} must contain exactly 1 'export function TopToolbar(...)', found ${topToolbarExportMatches.length}.`)
} else {
  pass(`${toolbarPath} contains a single TopToolbar export.`)
}

if (propsInterfaceMatches.length !== 1) {
  fail(`${toolbarPath} must contain exactly 1 'interface TopToolbarProps', found ${propsInterfaceMatches.length}.`)
} else {
  pass(`${toolbarPath} contains a single TopToolbarProps interface.`)
}

if (process.exitCode) {
  console.error('\nTroubleshooting: if you hit duplicate declaration errors, restore this file from git and restart Vite.')
} else {
  console.log('\nDoctor checks finished successfully.')
}
