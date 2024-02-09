import Image from 'next/image'
import React from 'react'

const NoDataImage = ({
  width = 200,
  height = 200
}: {
  width: number
  height: number
}) => {
  return (
    <Image
      src="/images/no-data.jpg"
      style={{
        mixBlendMode: 'multiply'
      }}
      alt="No Data"
      width={width}
      height={height}
    />
  )
}

export default NoDataImage
