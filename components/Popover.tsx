import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import { DefaultIconBtn } from './Button'
import { Menu, MenuItem } from '@material-ui/core'
import { ContentType } from '../lib/constants'

const data = ['思维清晰性', '思维逻辑性', '思维']

export default function SimplePopover({ children, type }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const getMenuData = (type) => {
    const data = []

    switch (type) {
      case ContentType.Article:
        data.push({ labe: '逻辑错误' })
        data.push({ labe: '软广嫌疑' })
        data.push({ labe: '不实信息' })
        data.push({ labe: '观点证据不足' })
        data.push({ labe: '操纵、诱导、煽动舆论' })
        data.push({ labe: '相关性诱导为因果性' })
        break

      default:
        break
    }

    return data
  }

  return (
    <span>
      <DefaultIconBtn onClick={handleClick}>{children}</DefaultIconBtn>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Menu
          id="simple-menu"
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {getMenuData(type).map(({ labe }, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {labe}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </span>
  )
}
