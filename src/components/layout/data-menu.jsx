import React, { useEffect, useContext, useState } from 'react'
import TreeView from '../tree/tree-view'
import { httpContext } from '../../context/http'
import { IoIosSettings } from 'react-icons/io'
import { AiOutlineTable } from 'react-icons/ai'
import { parseObjectToAssignKey, generateId } from '../../utils/helpers'
const DataMenu = props => {
  const { getCollections, currentAddress } = useContext(httpContext)
  const [collections, setCollections] = useState([])
  const [total, setToltal] = useState(0)

  useEffect(() => {
    if (!currentAddress) return
    const fetchCollections = async () => {
      const res = await getCollections()
      const { tables: collections = [], count = 0 } = res || {}
      const data = collections.map((col, i) => {
        const { table_name, ...others } = col
        const children = parseObjectToAssignKey(others, 'label', 'value').map(v => ({
          ...v,
          id: generateId(),
          icon: IoIosSettings,
          disabled: true
        }))
        return {
          label: table_name,
          value: "",
          children,
          id: generateId(),
          icon: AiOutlineTable
        }
      })
      setToltal(count)
      setCollections(data)
      console.log('data-menu:---', data)
    }
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress])
  return (
    <div>
      <TreeView data={collections} total={total}></TreeView>
    </div>
  )
}

export default DataMenu