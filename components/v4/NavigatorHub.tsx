
import {navigatorHub} from '../../data/v4/navigatorHub';
export default function NavigatorHub(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>🧭 {navigatorHub.title}</h1>
<p>{navigatorHub.project}</p>
<p>Branch : {navigatorHub.branch}</p>
<ul>{navigatorHub.panels.map(p=><li key={p}>{p}</li>)}</ul>
</main>
}
