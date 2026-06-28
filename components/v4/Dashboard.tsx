
import {dashboard} from '../../data/v4/dashboard';
export default function Dashboard(){
 return <main style={{padding:32,fontFamily:'sans-serif'}}>
 <h1>📊 {dashboard.title}</h1>
 <p>{dashboard.project}</p>
 <ul>{dashboard.widgets.map(w=><li key={w}>{w}</li>)}</ul>
 </main>
}
