import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Theme } from '@material-ui/core'
import { elevatedTabsStylesHook } from '@mui-treasury/styles/tabs'
import { makeStyles } from '@material-ui/core/styles'

const ElevatedTabs = (props) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const tabsStyles = elevatedTabsStylesHook.useTabs()
  const tabItemStyles = elevatedTabsStylesHook.useTabItem()

  console.log('props.', props)

  // const _tabsStyles = ({ spacing }: Theme) => {
  //   const tabsBackground = 'linear-gradient(60deg, #ab47bc, #8e24aa)'
  //   const indicatorBackground = 'rgba(255, 255, 255, .2)'
  //   const borderRadius = spacing(1)
  //   return {
  //     root: {
  //       width: '100%',
  //       borderRadius: spacing(1),
  //       background: tabsBackground,
  //       padding: 10,
  //       boxShadow: '0px 3px 15px rgba(34, 35, 58, 0.5)',
  //     },
  //     indicator: {
  //       height: '100%',
  //       borderRadius,
  //       backgroundColor: indicatorBackground,
  //     },
  //   }
  // }

  // const tabsStyles = makeStyles(() => _tabsStyles())

  console.log('tabsStyles', tabsStyles)

  return (
    <Tabs
      classes={tabsStyles}
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
    >
      {/* <Tab classes={tabItemStyles} label={'交流'} /> */}
      {/* <Tab classes={tabItemStyles} label={'头脑风暴'} /> */}
      {/* <Tab classes={tabItemStyles} label={'学习'} /> */}
      {/* <Tab classes={tabItemStyles} label={'树洞'} /> */}

      {/* <Tab classes={tabItemStyles} label={'个人'} /> */}
    </Tabs>
  )
}

export default ElevatedTabs
