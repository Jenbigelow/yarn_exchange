import { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useNavigate,
  redirect
} from "react-router-dom";
import GetYarns from "./Yarns"

function Search(){

    const [yarnWeights, setYarnWeights] = useState('')
    const [yarnSelect, setYarnSelect]= useState('')
    const [yarns, setYarns] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`/api/yarn_form`)
          .then((response) => response.json())
          .then((yarnData) => {
            setYarnWeights(yarnData.yarn_weights);
          });
      }, []);

      console.log(yarnWeights)

      const handleSelection = (evt) =>{
        console.log(evt.target.value)
        setYarnSelect(evt.target.value)
      }

      const yarnWeightOptions =[]
      // if yarn is null
      for (const yarnWeight of Object.values(yarnWeights)) {
        const yarnWeightOption= (
          <YarnWeightOptions
          key = {yarnWeight} 
          yarnWeight = {yarnWeight}
          yarnSelect = {yarnSelect}
          handleSelection = {handleSelection}
          />
        );
      
        yarnWeightOptions.push(yarnWeightOption);
    }

    const handleSearch = (evt) => {
        evt.preventDefault()
        console.log("Form submitting")
        console.log(yarnSelect)
        fetch("/api/yarns_search", {
            method: "POST",
            body: JSON.stringify({'yarn_weight': yarnSelect}),
            headers: {'Content-Type': 'application/json'}
          })

          .then((response) => response.json())
          .then((yarnData) => {
            setYarns(yarnData.yarns);
            // return(<Yarns yarns = {yarnData.yarns}/>)
            navigate(`/yarns/search/${yarnSelect}`)
            
          }
        
        );
    }
    if (yarns === ''){
    return(
        <>

        {yarnWeights === '' ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={handleSearch}>

           <div className="YarnWeights" onChange={handleSelection}>{yarnWeightOptions}
           </div>
           <p>
      <input type="submit"/>
    </p>
            </form>
          )}
        
        </>
    )
}

else{console.log(yarns)
  
  return(

    
    <GetYarns yarns = {yarns}/>
  )
}
}
function YarnWeightOptions(props){
    const {yarnWeight, yarnSelect, handleSelection}= props
    // const [option, setOption] = useState (false)

    // const handleOptionChange = evt => {
    //   console.log(`***${evt.target.value}`)
    //   setOption(!option)
    // }
    return(
       <p>{yarnWeight}
        <input
        type = "radio"
        value = {yarnWeight}
        checked = {yarnSelect === yarnWeight}
        onChange = {handleSelection}

        />
       </p>
    )

}

export default Search