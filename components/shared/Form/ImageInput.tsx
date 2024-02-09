'use client';
import convertBytesToSize from '@/lib/fileSize'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { Controller } from 'react-hook-form'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import readFileAsync, { readFileInfoAsync } from '@/lib/ReadFileAsync';

export type SingleImageInputProps = {
  name: string,
  watch: any,
  control: any,
  recommendedSize?: string,
  error?: any,
}

const SingleImageInput = ({ name, watch, control, recommendedSize, error }: SingleImageInputProps) => {
  console.log('error', error);
  return (
    <>
      <SingleImageInputWrapper
        name={name}
        control={control}
      >
        {watch(name)?.data
          ? <ShowSingleImageData watch={watch} name={name} />
          : <ImageUploadContainer recommendedSize={recommendedSize} />
        }
      </SingleImageInputWrapper>
      {!!error && <Typography variant='subtitle2' color='red'>
        {error}
      </Typography>}
    </>
  )
}

export const ImageUploadContainer = ({ recommendedSize }: { recommendedSize?: string }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
    p: '1rem',
    '& img': {
      opacity: 0.5,
    },
    border: '3px dashed #ccc',
    my: '10px',
    borderRadius: '5px',
    '& .legend': {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    '& .recommended': {
      fontSize: '0.8rem',
      fontWeight: 'normal',
    },
  }}>
    <Image
      src="/images/icons/image-gallery.png"
      alt="Image Gallery"
      width={120}
      height={120}
    />
    <span className='legend'>Upload Image</span>
    {!!recommendedSize && <span className='recommended'>Recommended Size: <b>{recommendedSize}</b></span>}
  </Box>
)

export const ShowSingleImageData = ({ watch, name }: { watch: any, name: string }) => {
  const image = watch(name);
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'hidden',
      '& img': {
        borderRadius: '10px',
      },
    }}>
      <Image
        width={150}
        height={150}
        src={image?.data as any}
        alt="profile pic"
      />
      <Stack p={2} gap={1}>
        {image?.name && <Typography variant="h6" component="h6" className="text-center">
          <b>Name: </b>
          {`${image?.name.slice(0, 10)}...${image?.name.slice(-10)}`}
        </Typography>}
        {image?.size && <Typography variant="subtitle1" component="h6" className="text-center">
          <b>Size: </b>
          {convertBytesToSize(image?.size)}
        </Typography>}
        {image?.type && <Typography variant="subtitle1" component="h6" className="text-center">
          <b>Type: </b>
          {image?.type}
        </Typography>}
      </Stack>
    </Box>
  )
}

export default SingleImageInput;

export const MultipleImageInput = ({ name, watch, control, recommendedSize, error }: SingleImageInputProps) => {
  return (
    <>
      <label>
        <Box sx={{
          '& input': {
            display: 'none',
          }
        }}>
          <ImageUploadContainer recommendedSize={recommendedSize} />
        </Box>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const { onChange, value = [], ...restField } = field;
            return (
              <input
                style={{ display: "none" }}
                type="file"
                accept='image/*'
                id="courseImage"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    Promise.all(
                      filesArray.map(async (file) => {
                        const { dataUrl, measure } = await readFileInfoAsync(file);
                        return {
                          name: file.name,
                          data: dataUrl,
                          measure: measure,
                          size: file.size,
                          type: file.type,
                        };
                      })
                    )
                      .then((files) => {
                        onChange([...(value || []), ...files]);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
                {...restField}
              />
            );
          }}
        />



      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, value = [], ...restField } = field;
          return (
            <>
              <Typography variant='subtitle2'>
                Selected Images: {value?.length}
              </Typography>
              <Stack>
                {value?.map((image: any, index: number) => (
                  <SelectedImage
                    index={index}
                    key={image.name}
                    image={image}
                    delete={() => {
                      const newValue = value.filter((_: any, i: number) => i !== index);
                      onChange(newValue);
                    }}
                    disabledUpOption={index == 0}
                    disabledDownOption={index == value.length - 1}
                    handleMoveUp={() => {
                      if (index === 0) return;
                      const valueToMoveBack = value[index];
                      const valueToMoveForward = value[index - 1];

                      const newValue = value.map((item: any, i: number) => {
                        if (i === index) return valueToMoveForward;
                        if (i === index - 1) return valueToMoveBack;
                        return item;
                      });

                      onChange(newValue);
                    }
                    }
                    handleMoveDown={() => {
                      if (index === value.length - 1) return;

                      const valueToMoveBack = value[index + 1];
                      const valueToMoveForward = value[index];

                      const newValue = value.map((item: any, i: number) => {
                        if (i === index) return valueToMoveBack;
                        if (i === index + 1) return valueToMoveForward;
                        return item;
                      });

                      onChange(newValue);
                    }
                    }
                  />
                ))}
              </Stack>
            </>
          );
        }}
      />
      {!!error && <Typography variant='body2' color='red'>
        {error}
      </Typography>}
    </>
  );
}

type SelectedImageProps = {
  image: {
    name: string,
    size: number,
    data: string,
    measure: string,
  };
  delete?: any;
  index: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  disabledUpOption: boolean;
  disabledDownOption: boolean;
}

export const SelectedImage = ({
  delete: onDelete,
  image: { name, size, data, measure },
  index,
  handleMoveUp,
  handleMoveDown,
  disabledUpOption,
  disabledDownOption,
}: SelectedImageProps) => {

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      gap: '1rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      mb: '10px',
    }}>
      <Image
        src={data}
        alt="Image Gallery"
        width={40}
        height={40}
      />
      <Box sx={{ flexGrow: '1' }}>
        <Typography variant='h6'>
          {name?.slice(0, 10)}...{name?.slice(-5)}
        </Typography>
        {!!size
          ? <Typography variant='body2' component={'span'} mr={3}>
            {convertBytesToSize(size)}
          </Typography>
          : ''}
        {!!measure
          ? <Typography variant='body2' component={'span'}>
            {measure}
          </Typography>
          : ''}
      </Box>
      <Box>
        <Tooltip title="Move up">
          {disabledUpOption
            ? <span />
            : <IconButton color='info'
              disabled={disabledUpOption}
              onClick={handleMoveUp}
            >
              <ArrowUpwardOutlinedIcon />
            </IconButton>
          }
        </Tooltip>
        {disabledDownOption
          ? <span />
          : <Tooltip title="Move down">
            <IconButton color='info'
              disabled={disabledDownOption}
              onClick={handleMoveDown}
            >
              <ArrowDownwardOutlinedIcon />
            </IconButton>
          </Tooltip>}
        <IconButton color='error'
          onClick={onDelete}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

type SingleImageInputWrapperProps = {
  name: string,
  control: any,
  children: any,
}

export const SingleImageInputWrapper = ({ name, control, children }: SingleImageInputWrapperProps) => {
  return (
    <label>
      <Box sx={{
        '& input': {
          display: 'none',
        }
      }}>
        {children}
      </Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, value, ...restField } = field;
          return (
            <input
              style={{ display: "none" }}
              type="file"
              accept='image/*'
              id="courseImage"
              onChange={(e) => {
                if (e.target.files?.length) {
                  const reader = new FileReader();
                  const file = e.target.files[0];
                  reader.readAsDataURL(file);
                  reader.onload = (e) => {
                    const target = e.target as FileReader;
                    target.result &&
                      onChange({
                        name: file.name,
                        data: target.result.toString(),
                        size: file.size,
                        type: file.type,
                      });
                  };
                }
              }}
              {...restField}
            />
          );
        }}
      />
    </label>
  );
};

type MultipleImageInputProps = {
  name: string,
  control: any,
  children: any,
}

export const MultipleImageInputWrapper = ({ name, control, children }: MultipleImageInputProps) => {
  return (
    <label>
      <Box sx={{
        '& input': {
          display: 'none',
        }
      }}>
        {children}
      </Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, value, ...restField } = field;
          return (
            <input
              style={{ display: "none" }}
              type="file"
              accept='image/*'
              id="courseImage"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const filesArray = Array.from(e.target.files);
                  Promise.all(
                    filesArray.map(async (file) => {
                      const dataUrl = await readFileAsync(file);
                      return {
                        name: file.name,
                        data: dataUrl,
                        // size: file.size,
                        // type: file.type,
                      };
                    })
                  )
                    .then((files) => {
                      onChange([...(value || []), ...files]);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              }}
              {...restField}
            />
          );
        }}
      />
    </label>
  );
};

