
import {workflowCenter} from '../../data/v4/workflowCenter';
export default function WorkflowCenter(){
 return (
  <main style={{padding:32,fontFamily:'sans-serif',background:'#F5EFE6',minHeight:'100vh'}}>
   <h1>🔄 {workflowCenter.title}</h1>
   <p>{workflowCenter.project}</p>
   <p>Branch : {workflowCenter.branch}</p>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
    {workflowCenter.flows.map(f=>(
      <div key={f} style={{background:'#fff',padding:20,border:'1px solid #ddd',borderRadius:16}}>
        <strong>{f}</strong>
      </div>
    ))}
   </div>
  </main>
 );
}
