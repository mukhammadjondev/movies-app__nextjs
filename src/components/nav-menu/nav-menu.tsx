'use client'

import { Button, Menu, MenuItem } from "@mui/material"
import { useState, MouseEvent } from 'react'

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="md:!hidden">
      <Button id='basic-button' aria-controls={open ? 'basic-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick} className='!capitalize !text-white'>
        Browse
      </Button>
      <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} className={'menu'}>
        {['Home', 'Movies', 'TV Shows', 'New', 'Popular'].map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default NavMenu