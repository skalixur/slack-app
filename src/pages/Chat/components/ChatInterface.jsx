import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IDAvatar } from "../../../components/IDAvatar";
import checkAndToastAPIError from "../../../lib/api/checkAndToastAPIError";
import { Message, MessageContent, MessageHeader, MessageTimestamp, MessageBody } from "./Message";
import { Textarea } from "../../../components/ui/textarea";
import { ScrollArea } from "../../../components/ui/scroll-area";

export default function ChatInterface({ getChatsFunction }) {
  const [chats, setChats] = useState([])
  const { channel } = useParams()
  useEffect(() => {
    async function fetchChats() {
      const apiResponse = await getChatsFunction()
      if (!(await checkAndToastAPIError(apiResponse))) return;
      setChats(apiResponse.chats)
      console.log(apiResponse.chats)
    }
    fetchChats()
  }, [channel])

  return (
    <div className="flex flex-col h-full w-full">

      {/* Messages Container */}
      <div className="flex-1 max-h-[85vh] w-full overflow-y-auto scrollbar">
        {chats.map(chat => (
          <Message key={chat.id}>
            <IDAvatar>{chat.sender.id}</IDAvatar>
            <MessageContent>
              <MessageHeader>
                {chat.sender.uid}
                <MessageTimestamp createdAtDate={chat.created_at} />
              </MessageHeader>
              <MessageBody>
                {chat.body}
              </MessageBody>
            </MessageContent>
          </Message>
        ))}
      </div>

      <div className="p-2 w-full">
        <Textarea className="w-full" />
      </div>
    </div>
  )
}
