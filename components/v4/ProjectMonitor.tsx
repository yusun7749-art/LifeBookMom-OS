
import {projectMonitor} from '../../data/v4/projectMonitor';

export default function ProjectMonitor(){
return (
<main style={{padding:32,fontFamily:'sans-serif',background:'#F5EFE6',minHeight:'100vh'}}>
<h1>📁 {projectMonitor.title}</h1>
<p>{projectMonitor.project}</p>
<p>Branch : {projectMonitor.branch}</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
{projectMonitor.items.map(i=>(
<div key={i} style={{background:'#fff',padding:20,border:'1px solid #ddd',borderRadius:16}}>
<strong>{i}</strong>
</div>
))}
</div>
</main>);
}
