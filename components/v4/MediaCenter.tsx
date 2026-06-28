
import {mediaCenter} from '../../data/v4/mediaCenter';
export default function MediaCenter(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>🖼️ {mediaCenter.title}</h1>
<p>{mediaCenter.project}</p>
<p>Branch : {mediaCenter.branch}</p>
<ul>{mediaCenter.assets.map(a=><li key={a}>{a}</li>)}</ul>
</main>
}
