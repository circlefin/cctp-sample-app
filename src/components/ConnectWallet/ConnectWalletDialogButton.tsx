/**
 * Copyright 2023 Circle Internet Financial, LTD.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
