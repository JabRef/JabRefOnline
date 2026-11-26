import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({ host: process.env.TEST_URL })

describe('index page', () => {
  it('is accessible', async () => {
    const response = await fetch('/')
    expect(response.status).toBe(200)
  })

  it('shows the features from the landing collection', async () => {
    const html = await $fetch<string>('/')
    const features =
      /<section id="features">(?<features>[\s\S]*?)<\/section>/.exec(html)
        ?.groups?.features
    expect(features).toBeDefined()
    for (const title of ['Collect', 'Edit', 'Organize', 'Cite']) {
      expect(features).toContain(`>${title}</h2>`)
    }
    expect(features).toContain('Import options for over 15 reference formats')
  })
})

describe('content pages', () => {
  it('renders a page from the pages collection', async () => {
    const html = await $fetch<string>('/codeprojects/gsoc/gsoc2019')
    expect(html).toContain('JabRef in Google Summer of Code 2019')
  })

  it('renders a nested page from the pages collection', async () => {
    const html = await $fetch<string>('/surveys/2015/analysis')
    expect(html).toContain('Result analysis of JabRef survey')
  })
})

describe('content api', () => {
  it('queries a collection', async () => {
    const rows = await $fetch<{ title: string }[]>(
      '/__nuxt_content/landing/query',
      {
        body: {
          sql: 'SELECT "title" FROM _content_landing ORDER BY stem ASC',
        },
        method: 'POST',
      },
    )
    expect(rows).toEqual([
      { title: 'Collect' },
      { title: 'Edit' },
      { title: 'Organize' },
      { title: 'Cite' },
    ])
  })
})

describe('download', () => {
  it('downloads latest from GitHub release', async () => {
    const response = await fetch('/download', { redirect: 'manual' })
    expect(await response.text()).toContain(
      'url=https://github.com/JabRef/jabref/releases/latest',
    )
    expect(response.status).toBe(302) // Redirect
  })
  it('downloads file from GitHub release when os is specified', async () => {
    const response = await fetch('/download/win_msi', { redirect: 'manual' })
    const text = await response.text()
    expect(text).toContain(
      'url=https://github.com/JabRef/jabref/releases/download',
    )
    expect(text).toContain('.msi')
    expect(response.status).toBe(302) // Redirect
  })
})
