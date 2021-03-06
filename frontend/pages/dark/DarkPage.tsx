import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import AlgoliaClient from '../../clients/algolia'
import { Meta, Pagination, ThemeGrid } from '../../components'
import { getLanguage, setLanguage } from '../../utils/cookies'
import { DarkLink } from './'
import styles from './DarkPage.styles'

interface DarkPageProps {
  themes: Theme[]
  page: number
  totalPages: number
  language: LanguageOptions
  refetchInitialProps?: () => any
}

export default class DarkPage extends React.Component<DarkPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<DarkPageProps> {
    const algolia = new AlgoliaClient(ctx)
    const language = getLanguage(ctx)
    const page = parseInt(ctx.query.page, 10) || 1

    const darkThemes = await algolia.search({
      dark: true,
      light: false,
      sortBy: SortByOptions.installs,
      lang: language,
      perPage: DarkPage.perPage,
      page: page - 1,
      distinct: 1,
    })

    return {
      themes: darkThemes.hits,
      totalPages: darkThemes.nbPages,
      page,
      language,
    }
  }

  handleLanguage = (language: LanguageOptions) => {
    setLanguage(language)
    this.props.refetchInitialProps()
  }

  render() {
    const { themes, language, page, totalPages } = this.props

    return (
      <div className={styles.wrapper}>
        <Meta title="Dark themes" />
        <ThemeGrid
          themes={themes}
          language={language}
          onLanguage={this.handleLanguage}
        />
        <Pagination page={page} totalPages={totalPages} Link={DarkLink} />
      </div>
    )
  }
}
