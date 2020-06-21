import React from 'react'

import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const Group = () => {
  const { id } = useParams()

  return <Layout basic>Group id = {id}</Layout>
}

export default Group
