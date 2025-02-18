import { Repeat, SendHorizontal } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Textarea } from '../../../../components/ui/textarea'
import { Toggle } from '../../../../components/ui/toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../components/ui/tooltip'

export const ChatForm = ({
  message,
  handleMessageChange,
  handleSendMessage,
  handleKeyDown,
  handlePollingToggle,
  isPolling,
  toggleRef,
}) => (
  <form
    className='flex w-full flex-nowrap items-center gap-2 p-2 pr-8'
    onSubmit={handleSendMessage}
  >
    <Textarea
      value={message}
      onChange={handleMessageChange}
      onKeyDown={handleKeyDown}
      className='grow resize-none'
    />
    <Button type='submit' className='size-9'>
      <SendHorizontal />
    </Button>
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Toggle
          ref={toggleRef}
          onPressedChange={handlePollingToggle}
          className='size-9'
        >
          <Repeat />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        Message polling: {isPolling ? 'on' : 'off'}
      </TooltipContent>
    </Tooltip>
  </form>
)

