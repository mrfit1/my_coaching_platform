import { NextResponse } from 'next/server';
import { z } from 'zod';
import { buildPublicAiContext } from '@/lib/ai-context';
import { isLocale, type Locale } from '@/lib/i18n';

export const runtime='nodejs';
const schema=z.object({lang:z.string().default('en'),messages:z.array(z.object({role:z.enum(['user','assistant']),content:z.string().min(1).max(1800)})).min(1).max(12)});

function outputText(data:any){
  if(typeof data?.output_text==='string') return data.output_text;
  const pieces:string[]=[];
  for(const item of data?.output||[]) for(const c of item?.content||[]) if(typeof c?.text==='string') pieces.push(c.text);
  return pieces.join('\n').trim();
}

export async function POST(req:Request){
  const parsed=schema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success) return NextResponse.json({error:'Invalid request.'},{status:400});
  const lang=(isLocale(parsed.data.lang)?parsed.data.lang:'en') as Locale;
  const key=process.env.OPENAI_API_KEY;
  if(!key) return NextResponse.json({error:'AI concierge is not configured yet.'},{status:503});
  const context=await buildPublicAiContext(lang);
  const instructions=`You are the website concierge for a multilingual fitness coaching platform. Answer in the user's language (${lang}). Use only the provided business context for prices, trainer availability, service areas and factual business claims. In-person personal training is limited to Toronto and configured GTA service areas; online fitness coaching and personalized training programs can serve clients worldwide. Help users choose services and point them toward signup, booking or contact when useful. Never diagnose, prescribe treatment, claim guaranteed fitness results, or replace a physician or registered dietitian. For injury, disease, eating disorders, pregnancy complications or urgent symptoms, recommend an appropriate licensed health professional. Keep answers concise and practical.\nBUSINESS CONTEXT:\n${JSON.stringify(context)}`;
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5.6',store:false,instructions,input:parsed.data.messages.map(m=>({role:m.role,content:m.content}))})});
  if(!response.ok){const err=await response.text();console.error('AI concierge error',response.status,err.slice(0,500));return NextResponse.json({error:'AI concierge is temporarily unavailable.'},{status:502});}
  const data=await response.json(); const answer=outputText(data);
  return NextResponse.json({answer:answer||'I could not generate a response right now.'});
}
