'use client'

import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import CustomTabList from '@core/components/mui/TabList'

const TabMenu = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  const [activeTab, setActiveTab] = useState('lessons')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <div className='flex flex-col gap-4'>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={2}>
            <CustomTabList orientation='vertical' onChange={handleChange} className='is-full' pill='true'>
              <Tab
                label='Dashboard'
                icon={<i className='tabler-clipboard-data' />}
                iconPosition='start'
                value='dashboard'
                className='flex-row justify-start !min-is-full'
              />
              <Tab
                label='Lessons'
                icon={<i className='tabler-flask' />}
                iconPosition='start'
                value='lessons'
                className='flex-row justify-start !min-is-full'
              />
              <Tab
                label='Images & Files'
                icon={<i className='tabler-device-desktop' />}
                iconPosition='start'
                value='image-and-files'
                className='flex-row justify-start !min-is-full'
              />
              <Tab
                label='Insights'
                icon={<i className='tabler-bulb' />}
                iconPosition='start'
                value='insights'
                className='flex-row justify-start !min-is-full'
              />
              <Tab
                label='Chat'
                icon={<i className='tabler-message-dots' />}
                iconPosition='start'
                value='chat'
                className='flex-row justify-start !min-is-full'
              />
            </CustomTabList>
          </Grid>
          <Grid item xs={12} md={10}>
            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </div>
  )
}

export default TabMenu
