import React, { ReactElement } from 'react'
import { getLessonsData } from '@/app/server/actions'

import LessonsTable from '@/views/students/LessonsTable'
import TabMenu from '@/views/students/TabMenu'
import UserInfoCard from '@/views/students/UserInfoCard'

const Students = async () => {
  const data = await getLessonsData()

  const tabContentList = (): { [key: string]: ReactElement } => ({
    dashboard: <div>Dashboard</div>,
    lessons: <LessonsTable lessonsData={data} />,
    'image-and-files': <div>Images & Files</div>,
    insights: <div>Insights</div>,
    chat: <div>Chat</div>
  })

  return (
    <div>
      <UserInfoCard />

      <div className='mt-4'>
        <TabMenu key={'tab-menu'} tabContentList={tabContentList()} />
      </div>
    </div>
  )
}

export default Students
