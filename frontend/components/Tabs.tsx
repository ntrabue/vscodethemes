import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

const Tabs: React.SFC<{}> = ({ children }) => (
  <div className={classes.tabs}>{children}</div>
)

const classes = {
  tabs: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    maxWidth: em(220),
  }),
}

export default Tabs