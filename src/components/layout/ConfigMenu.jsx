import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { useHistory } from 'react-router-dom'

const Configs = [
  { path: 'network', label: 'Network Access' },
  { path: 'storage', label: "Storage Path" },
  { path: 'advanced', label: 'Advanced Settings' },
  { path: 'hardware', label: "Hardware Resources" },
  { path: 'metrics', label: "Metrics" },
  { path: 'elk', label: "ELK" }
]
const ConfigMenu = props => {
  const history = useHistory()
  const classes = makeStyles(theme => ({
    selected: {
      color: theme.palette.primary.main
    }
  }))()
  useEffect(() => {
    history.push('/configs/network')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MenuList open={true}>
      {Configs.map(config => {
        const { path, label } = config;
        const route = `/configs/${path}`
        const isSelected = history.location.pathname === route;
        return (
          <MenuItem key={path} classes={{ root: isSelected ? classes.selected : "" }} onClick={() => history.push(route)}>{label}</MenuItem>
        )
      })}
    </MenuList>
  )
}

export default ConfigMenu