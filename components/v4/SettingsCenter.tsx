
import {settingsCenter} from '../../data/v4/settingsCenter';

export default function SettingsCenter(){
 return (
  <main style={{padding:32,fontFamily:'sans-serif'}}>
   <h1>⚙️ {settingsCenter.title}</h1>
   <p>{settingsCenter.project}</p>
   <p>Branch : {settingsCenter.branch}</p>
   <ul>{settingsCenter.items.map(i=><li key={i}>{i}</li>)}</ul>
  </main>
 );
}
