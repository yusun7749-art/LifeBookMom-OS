
import {commandCenter} from '../../data/v4/commandCenter';
export default function CommandCenter(){
return (
<main style={{padding:32,fontFamily:'sans-serif',background:'#F5EFE6',minHeight:'100vh'}}>
<h1>🎛️ {commandCenter.title}</h1>
<p>{commandCenter.project}</p>
<p>Branch : {commandCenter.branch}</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
{commandCenter.commands.map(c=>(
<div key={c} style={{background:'#fff',padding:20,border:'1px solid #ddd',borderRadius:16}}>
<strong>{c}</strong>
</div>
))}
</div>
</main>
)}
