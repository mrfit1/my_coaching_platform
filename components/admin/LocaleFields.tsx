export default function LocaleFields({prefix,values={},multiline=false,label}:{prefix:string;values?:Record<string,string>;multiline?:boolean;label:string}){
  return <fieldset className="locale-fields"><legend>{label}</legend>{['en','fa','fr','es'].map(locale=><label key={locale}>{locale.toUpperCase()}{multiline?<textarea name={`${prefix}_${locale}`} defaultValue={values?.[locale]||''}/>:<input name={`${prefix}_${locale}`} defaultValue={values?.[locale]||''}/>}</label>)}</fieldset>
}
