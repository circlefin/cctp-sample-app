import classNames from 'classnames'

import { CHAIN_TO_CHAIN_NAME } from 'constants/chains'

import type { TransactionInputs } from 'contexts/AppContext'

interface Props {
  transaction: TransactionInputs | undefined
  className?: string
}

const TransactionDetails: React.FC<Props> = ({ transaction, className }) => {
  return (
    <dl className={classNames('border-b border-licorice-500', className)}>
      <div className="flex items-center border-t border-licorice-500 py-4">
        <dt className="w-48 text-sm font-normal text-licorice-100">Source</dt>
        <dd className="text-base font-bold">
          {CHAIN_TO_CHAIN_NAME[transaction?.source as string]}
        </dd>
      </div>

      <div className="flex items-center border-t border-licorice-500 py-4">
        <dt className="w-48 text-sm font-normal text-licorice-100">
          Destination
        </dt>
        <dd className="text-base font-bold">
          {CHAIN_TO_CHAIN_NAME[transaction?.target as string]}
        </dd>
      </div>

      <div className="flex items-center border-t border-licorice-500 py-4">
        <dt className="w-48 text-sm font-normal text-licorice-100">
          Destination address
        </dt>
        <dd className="text-base font-bold">{transaction?.address}</dd>
      </div>

      <div className="flex items-center border-t border-licorice-500 py-4">
        <dt className="w-48 text-sm font-normal text-licorice-100">Amount</dt>
        <dd className="text-base font-bold">
          {Intl.NumberFormat(navigator.language, {
            minimumFractionDigits: 2,
          }).format(parseFloat(transaction?.amount as string))}{' '}
          USDC
        </dd>
      </div>
    </dl>
  )
}

export default TransactionDetails
