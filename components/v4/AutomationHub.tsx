
import {automationHub} from '../../data/v4/automationHub';
export default function AutomationHub(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>🤖 {automationHub.title}</h1>
<p>{automationHub.project}</p>
<p>Branch : {automationHub.branch}</p>
<ul>{automationHub.jobs.map(j=><li key={j}>{j}</li>)}</ul>
</main>
}
