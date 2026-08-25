'use client';
import { useFormStatus } from 'react-dom';
export default function SubmitButton({children='Save changes'}:{children?:React.ReactNode}){
  const {pending}=useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending?'Saving…':children}</button>
}
