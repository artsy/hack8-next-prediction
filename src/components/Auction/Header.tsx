import React from 'react'
import { Flex, ProgressBar, Text } from '@artsy/palette'

import { Sale } from '../Types'
interface Props {
  title: Sale['name']
  count: number
  completed: number
}

export const Header: React.FC<Props> = ({ title, count, completed }) => {
  if (!title) return null
  return (
    <>
      <ProgressBar
        percentComplete={(100 / count) * completed}
        highlight="purple100"
      />
      <Flex ml={1.5}>
        <Text variant="mediumText" color="purple100">
          {completed}
        </Text>
        <Text variant="mediumText" color="black30">
          /{count}
        </Text>
      </Flex>
      <Text variant="subtitle" px={3} py={[3, 1]}>
        {title}
      </Text>
    </>
  )
}
