import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { makeStyles } from '@material-ui/core'
import MilvusGrid from '../components/Grid'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))
const PAGE_SIZE = 10
const Test = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const appTrans = t("app")
  const toolbarConfig = [
    {
      label: "Create",
      icon: "create",
      onClick: () => { },
      disabled: selected => selected.length > 2
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: () => { },
      disabled: selected => selected.length === 0 || selected.some(s => s.partition_tag === '_default'),
      disabledTooltip: "Nothing can be deleted"
    },
  ];
  const colDefinitions = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name"
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date"
    },
  ];
  const rows = [{
    name: "czz",
    date: "2020"
  }, {
    name: "asd",
    date: "1999"
  }]
  return <div className={classes.root}>
    <PageWrapper>
      <MilvusGrid
        toolbarConfig={toolbarConfig}
        colDefinitions={colDefinitions}
        rows={rows}
        rowsPerPage={PAGE_SIZE}
        rowCount={10}
        page={0}
        primaryKey="name"
        isLoading={false}
        title={[appTrans.title]}
      ></MilvusGrid>
    </PageWrapper>
  </div>
}

export default Test