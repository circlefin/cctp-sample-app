import { Alert, Button, Card } from '@mui/material'
import classNames from 'classnames'

interface Props extends DefaultComponentProps {
  title: string
  subtitle: string
  imgSrc: string
  walletAvailable: boolean
  connected: boolean
  handleConnect: () => void
  handleDisconnect: () => void
  handleCopy: () => void
}

const ConnectCard: React.FC<Props> = ({
  className,
  title,
  subtitle,
  imgSrc,
  walletAvailable,
  connected,
  handleConnect,
  handleDisconnect,
  handleCopy,
}) => {
  return (
    <Card
      className={classNames(
        className,
        'flex w-full items-center justify-between p-4'
      )}
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

      <div className="flex w-1/3 flex-col">
        {walletAvailable ? (
          connected ? (
            <>
              <Button size="small" onClick={handleCopy}>
                Copy Address
              </Button>
              <Button className="mt-2" size="small" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="small" onClick={handleConnect}>
              Connect
            </Button>
          )
        ) : (
          <Alert severity="error">No wallet detected</Alert>
        )}
      </div>
    </Card>
  )
}

export default ConnectCard
