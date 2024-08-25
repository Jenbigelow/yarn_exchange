import { useEffect, useState } from 'react'

import GetYarns from "./Yarns"

function Search(props){
  console.log(props)
    const [yarnWeights, setYarnWeights] = useState('')
    const [yarnSelect, setYarnSelect]= useState('')
    const [yarns, setYarns] = useState(props)

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
        console.log(props.yarns)
        const copyOfYarns = { ...props.yarns };
        const yarnSelectYarnsList = []
      for (const copyOfYarn of Object.values(copyOfYarns)){
        if (copyOfYarn.yarn_weight === yarnSelect) {
        yarnSelectYarnsList.push(copyOfYarn)
        console.log("here",yarnSelectYarnsList)}
          setYarns(yarnSelectYarnsList)
          console.log(yarnSelectYarnsList)
        }
      }
        
       

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