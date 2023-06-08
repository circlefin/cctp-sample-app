import { Button } from '@mui/material'

import TransactionDetails from 'components/TransactionDetails/TransactionDetails'

import type { Transaction } from 'contexts/AppContext'

interface Props {
  handleReturn: () => void
  transaction: Transaction | undefined
}

const RedeemComplete: React.FC<Props> = ({ handleReturn, transaction }) => {
  return (
    <>
      <h1>Transfer completed</h1>
      <p className="mt-8 text-center text-xl">
        Your transfer of USDC across chains was successful. See below for
        details.
      </p>

      <div className="m-24 flex flex-col">
        <TransactionDetails transaction={transaction} />

        <Button
          className="mt-12"
          size="large"
          fullWidth={true}
          onClick={handleReturn}
        >
          Start a new transfer
        </Button>
      </div>
    </>
  )
}

export default RedeemComplete
