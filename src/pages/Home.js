import React from 'react'
import { Heading, Box } from '@chakra-ui/core'
import SectionHeader from '../components/shared/SectionHeader'
import { AiFillBook } from 'react-icons/ai'

const Home = () => {
  return (
    <Box>
      <Heading>Hoşgeldiniz</Heading>
      <SectionHeader
        icon="moon"
        title="Başlık"
        buttonText="Görüntüle"
        buttonIcon={AiFillBook}
        navigate="/"
      />
    </Box>
  )
}

export default Home
