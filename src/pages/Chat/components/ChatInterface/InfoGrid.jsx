import dayjs from 'dayjs';
import { DataRow } from './DataRow';

export const InfoGrid = ({ info, isChannel }) => (
  <div className='grid grid-cols-4 gap-2 px-5'>
    {isChannel ? (
      <>
        <DataRow label='Name' value={info.channel.name} />
        <DataRow label='ID' value={info.channel.id} />
        <DataRow label='Owner ID' value={info.channel.owner_id} />
        <DataRow
          label='Created'
          value={dayjs(info.channel.created_at).format('LLLL')} />
        <DataRow
          label='Last updated'
          value={dayjs(info.channel.updated_at).format('LLLL')} />
      </>
    ) : (
      <>
        <DataRow label='Email' value={info.user.email} />
        <DataRow label='ID' value={info.user.id} />
        <DataRow
          label='Created'
          value={dayjs(info.user.created_at).format('LLLL')} />
        <DataRow
          label='Last updated'
          value={dayjs(info.user.updated_at).format('LLLL')} />
      </>
    )}
  </div>
);

