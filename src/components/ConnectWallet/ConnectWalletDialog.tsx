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

import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import IconMetaMask from 'assets/icon-metamask.png'
import ConnectWalletDialogButton from 'components/ConnectWallet/ConnectWalletDialogButton'
import { injected } from 'components/Wallet/Connectors'

import type { SxProps } from '@mui/material'
import type { AbstractConnector } from '@web3-react/abstract-connector'

interface Props {
  handleClose: () => void
  handleConnect: (connector: AbstractConnector) => void
  open: boolean
  sx?: SxProps
}

const ConnectWalletDialog: React.FC<Props> = ({
  handleClose,
  handleConnect,
  open,
  sx = {},
}) => {
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogContent>
        <ConnectWalletDialogButton
          onClick={() => handleConnect(injected)}
          subtitle="Connect using MetaMask"
          title="MetaMask"
          imgSrc={IconMetaMask}
        />
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletDialog
