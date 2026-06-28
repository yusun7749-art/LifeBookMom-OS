
import {scheduleCenter} from '../../data/v4/scheduleCenter';
export default function ScheduleCenter(){
return <main style={{padding:32,fontFamily:'sans-serif'}}>
<h1>📅 {scheduleCenter.title}</h1>
<p>{scheduleCenter.project}</p>
<p>Branch : {scheduleCenter.branch}</p>
<ul>{scheduleCenter.sections.map(s=><li key={s}>{s}</li>)}</ul>
</main>
}
