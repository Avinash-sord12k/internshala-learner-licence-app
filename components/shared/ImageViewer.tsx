'use client';
import { Box, IconButton, Stack, Typography } from "@mui/material"
import Image from "next/image"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import React from "react";
import { Product } from "@/types/Product.types";
import capitalize from "@/lib/capitalize";

const ImageViewerGallery = ({ images }: { images: any[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<number>(0);

  return (
    <Stack>
      <ImageViewer imageData={images?.[selectedImage]} />
      {!!images?.length &&
        images.map((image, index) => (
          <ImageItem
            key={index}
            imageData={image}
            setSeletedImage={() => setSelectedImage(index)}
            isSelected={index === selectedImage}
          />
        ))}
    </Stack>
  )
}
export default ImageViewerGallery;

export const ImageItem = ({ imageData, isSelected, setSeletedImage }: {
  imageData: any
  isSelected?: boolean,
  setSeletedImage: Function,
}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      gap: '1rem',
      border: '1px solid #ccc',
      borderColor: isSelected ? 'primary.main' : '#ccc',
      borderRadius: '5px',
      padding: '10px',
      mb: '10px',
    }}>
      <Image
        src={imageData?.url}
        alt={imageData?.name}
        width={40}
        height={40}
      />
      <Box sx={{ flexGrow: '1' }}>
        <Typography variant='body2'>
          <b>Id:</b> &nbsp;
          {imageData?.image_id ?? imageData?.id ?? imageData?.name}
        </Typography>
        {!!imageData?.src &&
          <Typography variant='body2'>
            <b>Src: </b>{imageData?.src}
          </Typography>}
      </Box>
      <Box>
        <IconButton sx={{
          "&:hover": {
            color: 'primary.main',
            backgroundColor: '#ffffff',
          }
        }}
          onClick={() => setSeletedImage()}
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export const ImageViewer = ({ imageData }: {
  imageData: any,
}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
      p: '1rem',
      border: '1px solid #ccc',
      mb: '10px',
      borderRadius: '5px',
      '& img': {
        borderRadius: '5px',
        width: '100%',
        height: 'auto',
      }
    }}>
      <Image
        src={imageData?.url}
        alt={imageData?.name}
        width={500}
        height={500}
      />
      <Box sx={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }}>
        {imageData?.name}
      </Box>
    </Box>
  )
}

export const ProductItem = ({ product, discount }: {
  product: Product
  discount?: number
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        gap: '1rem',
        border: '1px solid #ccc',
        borderColor: '#ccc',
        borderRadius: '5px',
        padding: '10px',
        mb: '10px',
      }}>
      <Image
        src={product?.images?.[0]?.url}
        alt={product?.images?.[0]?.name}
        width={40}
        height={40}
      />
      <Box sx={{ flexGrow: '1' }}>
        <Typography variant='body2'>
          <b>Title:</b>&nbsp;
          {capitalize(product?.title)}
        </Typography>
        <Typography variant='body2'>
          <b>type: </b>
          {capitalize(product?.type)} &nbsp;
          {capitalize(product?.category)} &nbsp;
          {capitalize(product?.group)} &nbsp;
        </Typography>
      </Box>
      <Box>
        <Typography variant='body2' sx={{
          textDecoration: 'line-through',
        }}>
          ₹{product?.price ?? 'No price'}
        </Typography>
        <Typography variant='body1'>
          ₹{calculateDiscount(product?.price, discount) ?? 'No price'}
        </Typography>
      </Box>
    </Box>
  )
}

export function calculateDiscount(price: number, discount: any) {
  console.log('price:', price, 'discount:', discount)
  if (!discount) return price
  if (isNaN(parseFloat(discount))) return price
  return price - (price * parseFloat(discount) / 100)
}