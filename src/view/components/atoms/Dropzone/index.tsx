import { useState } from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { DropZone, Text } from 'react-aria-components'

function Dropzone() {
  const [dropped, setDropped] = useState<boolean>(false)

  return (
    <DropZone
      onDrop={() => {
        setDropped(true)
      }}
    >
      <Text slot='label'>{dropped ? 'You dropped something' : 'Drop object here'}</Text>
    </DropZone>
  )
}

export default Dropzone
