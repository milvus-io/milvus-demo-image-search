import React, { useEffect, useContext, useState } from 'react'
import TreeView from '../tree/tree-view'
import { httpContext } from '../../context/http'
import { dataManagementContext } from '../../context/data-management'

import { IoIosSettings } from 'react-icons/io'
import { AiOutlineTable } from 'react-icons/ai'
import { parseObjectToAssignKey, generateId } from '../../utils/helpers'
import { useHistory } from 'react-router-dom'

const DataMenu = props => {
  const histroy = useHistory()
  const { getCollections, currentAddress, getPartitions } = useContext(httpContext)
  const { setRefresh } = useContext(dataManagementContext)

  const [collections, setCollections] = useState([])
  const [total, setToltal] = useState(0)

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
        icon: AiOutlineTable,
        url: `/data/collections/${table_name}`
      }
    })
    setToltal(count)
    setCollections(data)
    setRefresh(false)
  }
  useEffect(() => {
    if (!currentAddress) return

    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress])

  const fetchPartitions = async (collectionName) => {
    const target = collections.find(col => col.label === collectionName)
    // already fetch partitions
    if (!target || target.loaded) {
      return
    }
    const res = await getPartitions(collectionName)
    const { partitions } = res
    const data = partitions.map(v => {
      const label = v.partition_tag
      return {
        label,
        value: "",
        id: generateId(),
        icon: AiOutlineTable,
        url: `/data/collections/${collectionName}/partitions/${label}`
      }
    })
    setCollections(collections => {
      return collections.map(col => {
        if (col.label === collectionName) {
          col.children = [...col.children, ...data]
          col.loaded = true
        }
        return col
      })
    })
  }
  const handleMenuClick = (url, collectionName, id) => {
    id !== '1' && fetchPartitions(collectionName)
    url && histroy.push(url)
  }
  const handleRefresh = () => {
    setRefresh(true)
    fetchCollections()
  }
  return (
    <div>
      <TreeView data={collections} total={total} handleMenuClick={handleMenuClick} handleRefresh={handleRefresh}></TreeView>
    </div>
  )
}

export default DataMenu