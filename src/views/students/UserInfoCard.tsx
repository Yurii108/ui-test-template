import React from 'react'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

const UserInfoCard = () => {
  return (
    <Card>
      <CardContent className='flex justify-between flex-wrap gap-4'>
        <Grid className='flex gap-6 items-center'>
          <CustomAvatar
            sx={{ width: 100, height: 100 }}
            variant='rounded'
            src='/images/avatars/11.png'
            alt='Kristin Watson'
          />
          <div>
            <Typography variant='h4'>{`Kristin Watson`}</Typography>
            <div className='flex  flex-wrap gap-2'>
              <Typography variant='body2'>{`Registration Date:`}</Typography>
              <Typography variant='h6' className='text-sm'>{`03.07.2024`}</Typography>
            </div>
            <Button
              size='small'
              color='success'
              variant='contained'
              className='rounded-full mt-2 h-6 text-xs font-medium'
            >
              Ongoing Educational Program
            </Button>
          </div>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserInfoCard
