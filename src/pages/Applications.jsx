import React, { useContext } from 'react'
import PageWrapper from '../components/PageWrapper'
import { makeStyles } from '@material-ui/core'
import MilvusGrid from '../components/Grid'
import CreateApp from '../components/Dialogs/CreateApp'
import { rootContext } from '../context/Root'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))
const PAGE_SIZE = 10
const Test = props => {
  const classes = useStyles()
  const { setDialog } = useContext(rootContext)
  const { t } = useTranslation()
  const appTrans = t("app")

  const handleDelete = () => { }
  const toolbarConfig = [
    {
      label: "Create",
      icon: "create",
      onClick: () => {
        setDialog({
          open: true,
          type: "custom",
          params: {
            component: (
              <CreateApp

              ></CreateApp>
            )
          }
        });
      },
      disabled: selected => selected.length > 2
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: (e, selected) => {
        return new Promise(resolve => {
          setDialog({
            open: true,
            type: "notice",
            params: {
              title: `Do you want to delete ${
                selected.length === 1 ? `this application` : `these applications`
                }?`,
              confirm: async () => {
                await handleDelete(e, selected);
                resolve(true);
              }
            }
          });
        });
      },
      disabled: selected => selected.length === 0 || selected.some(s => s.partition_tag === '_default'),
      disabledTooltip: "Nothing can be deleted"
    },
    {
      label: "Add Data",
      icon: "import",
      onClick: () => { },
      disabled: selected => selected.length !== 1,
      disabledTooltip: "Selected one application then you can add data."
    },
    {
      label: "Search",
      icon: "createIndex",
      onClick: () => { },
      disabled: selected => selected.length !== 1,
      disabledTooltip: "Selected one application then you can add search."
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