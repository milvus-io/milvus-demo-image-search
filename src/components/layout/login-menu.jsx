import React, { useEffect } from 'react'
import { useTheme, makeStyles } from '@material-ui/styles'
import { FaDatabase } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const LoginMenu = props => {
  const theme = useTheme()
  const classes = makeStyles({
    root: {
      paddingTop: theme.spacing(1)
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })()
  const history = useHistory()
  const fakeList = [
    { ip: '192.168.1.169', port: '5432' },
    { ip: '192.168.1.169', port: '5432' },
    { ip: '192.168.1.169', port: '5432' },
    { ip: '192.168.1.169', port: '5432' },
  ]
  useEffect(() => {
    history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={classes.root}>
      <h3>Recent Connections</h3>
      {fakeList.map(data => {
        const { ip, port } = data;
        return (
          <div>
            <FaDatabase className={classes.icon} />
            <span>{`${ip}: `}</span>
            <span>{port}</span>
          </div>
        )
      })}
    </div>
  )
}

export default LoginMenu