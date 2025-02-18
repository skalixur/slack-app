import {
  useContext,
  useEffect,
  useState
} from 'react'
import { Link } from 'react-router'
import { IDAvatar } from '../../../../components/IDAvatar'
import { Skeleton } from '../../../../components/ui/skeleton'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import getChannelDetails from '../../../../lib/api/getChannelDetails'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'

export function ChannelMembers({ channelId }) {
  const { allUsers } = useContext(UserChannelContext)
  const [members, setMembers] = useState([])

  useEffect(() => {
    async function fetchChannelDetails() {
      const apiResponse = await getChannelDetails(channelId)
      if (!checkAndToastAPIError(apiResponse)) return
      setMembers(apiResponse.channelDetails.channel_members)
    }

    if (channelId) {
      fetchChannelDetails()
    }
  }, [channelId])

  if (members.length < 1) {
    return (
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 8 }).map((v, index) => (
          <Skeleton key={index} className='mx-2 h-10 w-full rounded-lg p-2' />
        ))}
      </div>
    )
  }

  return (
    <div className='scrollbar flex flex-col gap-2 overflow-y-auto'>
      {members.map((member) => {
        const currentMember = allUsers.find(
          (user) => user.id === member.user_id,
        )
        return (
          <div
            key={member.id}
            className='mx-2 flex items-center gap-2 rounded-lg border p-2'
          >
            <IDAvatar>{member.user_id}</IDAvatar>
            <Link
              to={`/chat/user/${member.user_id}`}
              className='text-sm font-medium'
            >
              {currentMember.uid}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
