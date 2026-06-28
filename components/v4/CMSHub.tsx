
import {cmsHub} from '../../data/v4/cmsHub';
export default function CMSHub(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>📚 {cmsHub.title}</h1>
<p>{cmsHub.project}</p>
<p>Branch : {cmsHub.branch}</p>
<h2>Modules</h2>
<ul>{cmsHub.sections.map(s=><li key={s}>{s}</li>)}</ul>
</main>
}
