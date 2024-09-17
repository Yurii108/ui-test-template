'use client'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../DialogCloseButton'
import { FormGroup, InputAdornment, styled, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { getLessonsData } from '@/app/server/actions'
import { LessonsRowType } from '@/types/apps/lessonsTypes'

type PermissionDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: string
}

type RequestLessonFormProps = {
  searchValue: string
  setSearchValue: (value: string) => void
  handleClose: () => void
}

const CustomTextFieldStyled = styled(CustomTextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-root.MuiFilledInput-root': {
    width: '100%',
    backgroundColor: 'var(--mui-palette-background-paper) !important'
  },
  [theme.breakpoints.up('sm')]: {
    width: '55%'
  }
}))

const RequestLessonForm = ({ handleClose, searchValue, setSearchValue }: RequestLessonFormProps) => {
  const [lessons, setLessons] = useState<LessonsRowType[]>([])
  const [selectedLessons, setSelectedLessons] = useState<number[]>([])

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const fetchedLessons = await getLessonsData()
        setLessons(fetchedLessons)
      } catch (error) {
        console.error('Failed to fetch lessons:', error)
      }
    }

    fetchLessons()
  }, [])

  const handleCheckboxChange = (id: number) => {
    setSelectedLessons(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(selectedId => selectedId !== id) : [...prevSelected, id]
    )
  }
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextFieldStyled
          className='is-full sm:max-is-[55%] md:max-is-[465px]'
          placeholder='Search'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-search' />
              </InputAdornment>
            )
          }}
        />
        <Typography component='span' className='block mt-6'>
          {lessons.length} Options
        </Typography>
        <FormGroup className='flex-col gap-2 mt-3 overflow-y-auto overflow-x-hidden'>
          <div className='max-h-96'>
            {lessons
              ? lessons.map(lesson => (
                  <FormControlLabel
                    className='w-full'
                    key={lesson.id}
                    control={
                      <Checkbox
                        checked={selectedLessons.includes(lesson.id)}
                        onChange={() => handleCheckboxChange(lesson.id)}
                      />
                    }
                    label={lesson.name}
                  />
                ))
              : 'Loading...'}
          </div>
        </FormGroup>
      </DialogContent>
      <DialogActions className='flex max-sm:flex-col max-sm:items-end max-sm:gap-2 justify-end pbs-0 sm:pbe-16 sm:pli-16'>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0 rounded-full h-9'>
          Close
        </Button>
        <Button className='rounded-full h-9 w-28' type='submit' variant='contained' onClick={handleClose}>
          Send
        </Button>
      </DialogActions>
    </>
  )
}

const LessonRequestDialog = ({ open, setOpen, data }: PermissionDialogProps) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Request New Lesson
        <Typography component='span' className='flex flex-col font-normal'>
          Please select the lesson you want to request for the student
        </Typography>
      </DialogTitle>
      <RequestLessonForm handleClose={handleClose} searchValue={searchValue} setSearchValue={setSearchValue} />
    </Dialog>
  )
}

export default LessonRequestDialog
