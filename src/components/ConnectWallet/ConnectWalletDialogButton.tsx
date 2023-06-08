import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Button } from '@mui/material'

import type { SxProps } from '@mui/material'

interface Props {
  imgSrc: string
  onClick: () => void
  subtitle?: string
  sx?: SxProps
  title: string
}

const ConnectWalletDialogButton: React.FC<Props> = ({
  imgSrc,
  onClick,
  subtitle = '',
  sx = {},
  title,
}) => {
  return (
    <Button
      variant="outlined"
      className="w-full justify-between p-4"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="rounded-full bg-white p-3">
          <img src={imgSrc} alt={title} width={48} height={48} />
        </div>
        <div className="ml-4 text-left capitalize text-white">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-base font-normal">{subtitle}</div>
        </div>
      </div>
      <ChevronRightIcon />
    </Button>
  )
}

export default ConnectWalletDialogButton
