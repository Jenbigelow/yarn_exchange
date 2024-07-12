import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [yarns, setYarns] = useState(null);
  useEffect(() => {
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
      });
  }, []);

  return (
    
    <>
    <h1>Yarn</h1>
    {yarns === null ? (
      <div>Loading...</div>
    ) : (
      yarns.map((yarn) => <div key={yarn.yarn_id}>{yarn.yarn_name}${yarn.yarn_price}
      <div>
      <img src={`${yarn.yarn_photo}`}/>
      </div>
      {/* <ReactRouterDOM.Link to="/">
      <img src={`${yarn.yarn_photo}`}/>
      </ReactRouterDOM.Link> */}
    </div>




  )
    )}
  </>
  );

}

export default App
