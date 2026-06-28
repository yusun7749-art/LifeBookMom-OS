import {brainCore} from '../../data/v4/brainCore';
export default function BrainCore(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>🧠 {brainCore.title}</h1>
<p>{brainCore.project}</p>
<p>Branch : {brainCore.branch}</p>
<h2>Modules</h2>
<ul>{brainCore.modules.map(m=><li key={m}>{m}</li>)}</ul>
</main>
}