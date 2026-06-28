
import {revenueCenter} from '../../data/v4/revenueCenter';
export default function RevenueCenter(){
 return <main style={{padding:32,fontFamily:'sans-serif'}}>
 <h1>💰 {revenueCenter.title}</h1>
 <p>{revenueCenter.project}</p>
 <p>Branch : {revenueCenter.branch}</p>
 <ul>{revenueCenter.sources.map(s=><li key={s}>{s}</li>)}</ul>
 </main>
}
