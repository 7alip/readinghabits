import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Box } from '@chakra-ui/core'

const DisplayCreatedGroupInfo = ({ groupFields }) => {
  const { title, startDate, endDate, maxUser, isPrivate } = groupFields

  return (
    <>
      <Heading size="md" my={3}>
        {title}
      </Heading>
      <Box as="table">
        <Box as="tbody">
          <tr>
            <td>
              <strong>Baslangic</strong>
            </td>
            <td>{startDate}</td>
          </tr>
          <tr>
            <td>
              <strong>Bitis</strong>
            </td>
            <td>{endDate || 'Belirtilmedi'}</td>
          </tr>
          <tr>
            <td>
              <strong>Maksimum Katilimci</strong>
            </td>
            <td>{maxUser || 'Belirtilmedi'}</td>
          </tr>
          <tr>
            <td>
              <strong>Ozel Grup</strong>
            </td>
            <td>{isPrivate ? 'Evet' : 'Hayir'}</td>
          </tr>
        </Box>
      </Box>
    </>
  )
}

DisplayCreatedGroupInfo.propTypes = {
  groupFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    maxUser: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPrivate: PropTypes.bool,
  }).isRequired,
}

export default DisplayCreatedGroupInfo
