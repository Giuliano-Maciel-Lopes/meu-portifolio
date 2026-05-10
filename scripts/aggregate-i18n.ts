import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT = join(ROOT, 'public/locales')

function deriveNamespace(folderName: string): string {
  return folderName.replace(/^section/i, '').toLowerCase() || folderName.toLowerCase()
}

function processI18nDir(i18nPath: string, namespace: string) {
  const files = readdirSync(i18nPath).filter(f => f.endsWith('.json'))
  for (const file of files) {
    const locale = basename(file, '.json')
    const destDir = join(OUTPUT, locale)
    mkdirSync(destDir, { recursive: true })
    copyFileSync(join(i18nPath, file), join(destDir, `${namespace}.json`))
    console.log(`  ✓ ${locale}/${namespace}.json`)
  }
}

function scanDir(dir: string, depth = 0) {
  if (!existsSync(dir) || depth > 4) return
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
    const full = join(dir, e.name)
    if (e.name === 'i18n') {
      const namespace = deriveNamespace(basename(dir))
      processI18nDir(full, namespace)
    } else {
      scanDir(full, depth + 1)
    }
  }
}

console.log('🌍 Aggregating i18n files...')
mkdirSync(OUTPUT, { recursive: true })
scanDir(join(ROOT, 'src/templates/sections'))
scanDir(join(ROOT, 'src/components'))
console.log('✅ Done!\n')
