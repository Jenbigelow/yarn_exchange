import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
  
  
  function Yarn() {
    const [yarn, setYarn] = useState({});
    const {yarnId} = useParams();

    useEffect(() => {
      fetch(`/api/yarns/${yarnId}`)
        .then((response) => response.json())
        .then((yarnData) => {
          setYarn(yarnData);
        });
    }, []);

  return (
    <>
    <div>{yarn.yarn_name} ({yarn.dyelot} company: {yarn.yarn_company})
    <div>
      ${yarn.yarn_price}
    </div>
    <div>
    <img src={`${yarn.yarn_photo}`}/>
    </div>
    <div>
      {yarn.yarn_weight}
    </div>
    <div>
      {yarn.skeins}
    </div>
    <div>
      Ravelry seller: {yarn.seller_name}
    </div>
    <div>
      Location: {yarn.seller_location}
    </div>
    <div>
        <Link to="/yarns">Back to Yarns</Link>
    </div>
    </div>
    </>
  
  )
  }
  


export default Yarn