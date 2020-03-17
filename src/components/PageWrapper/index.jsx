import React from './node_modules/react'
import { Paper, Box } from './node_modules/@material-ui/core'

const PageWrapper = props => {
  return (
    <Paper className={props.className}>
      <Box p={2}>
        {
          props.children
        }
      </Box>
    </Paper>
  )
}

export default PageWrapper