import {NextResponse} from 'next/server';import {getCurrentUser} from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(){const {user,profile}=await getCurrentUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json({user:{id:user.id,email:user.email},profile},{headers:{'Cache-Control':'private, no-store'}})}
