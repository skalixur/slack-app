
export const DataRow = ({ label, value }) => (
  <>
    <div className='col-span-1 break-words'>{label}</div>
    <div className='col-span-3 font-mono break-words'>{value}</div>
  </>
);

