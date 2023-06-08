import { useMemo, useState } from 'react'

import { Button, FormControl, TextField } from '@mui/material'

import { useTransactionContext } from 'contexts/AppContext'

import type { Transaction } from 'contexts/AppContext'

interface Props {
  handleNext: (hash: string) => void
  transaction: Transaction | undefined
}

const RedeemForm: React.FC<Props> = ({ handleNext, transaction }) => {
  const [txHash, setTxHash] = useState(transaction?.hash ?? '')
  const { getTransaction } = useTransactionContext()

  const transactionExists = useMemo(
    () => !!getTransaction(txHash),
    [getTransaction, txHash]
  )

  const getTxHashHelperText = useMemo(() => {
    if (txHash !== '' && !transactionExists) {
      return 'Please provide the correct transaction hash'
    }
    return ' '
  }, [txHash, transactionExists])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleNext(txHash)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <TextField
          id="txHash"
          label="Transaction Hash"
          variant="outlined"
          value={txHash}
          error={txHash !== '' && !transactionExists}
          helperText={getTxHashHelperText}
          onChange={(event) => setTxHash(event.target.value)}
        />
      </FormControl>
      <Button
        className="mt-6"
        type="submit"
        size="large"
        fullWidth={true}
        disabled={!transactionExists}
      >
        NEXT
      </Button>
    </form>
  )
}

export default RedeemForm
