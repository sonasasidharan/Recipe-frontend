import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getsavedrecipe } from '../Services/allApi'
import Recipelist from '../Components/Recipelist'

function Savedrecipies() {

  const [getSaveRecipe, setGetSaveRecipe] = useState([])
  // const [userId,setuserId]=useState("")

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('userDetails'));
  console.log(userId)
  // setuserId(userId)





  }, [])


  useEffect(() => {
    if (sessionStorage.getItem('token')){
      getData()
    }
   
  }, [])



  const getData = async () => {
    // console.log(userId)
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
   
    const result = await getsavedrecipe( header)
    console.log(result)
    if (result.status == 200) {
      setGetSaveRecipe(result.data.savedRecipes)
    }
    else {
      console.log(result.response.data)
    }

  }
  console.log(getSaveRecipe)

  return (
    <>
      {/* saved recipies!!!!! */}
      <Header />

      <div >
        <Row>
          <Col sm={12} md={6} className='p-3'>
            <h3>saved recipes</h3>
            <div className='border border-3 p-3'>
              {
                getSaveRecipe.length > 0 ?
                  getSaveRecipe.map(item => (
                    <div>
                      <Recipelist recipe={item} />
                    </div>
                    
                  ))
                  :
                  <h4>no saved recipes available</h4>
              }

              {/* <h3 className='text-center '>no saved recipies available</h3> */}
            </div>
          </Col>
          <Col>
            <div className='p-3'>
              <img src="https://3.bp.blogspot.com/-PaEkSkxY4UI/WttqcHMVVMI/AAAAAAAAi2U/CK5mCl4s_Io4JWIyqmE3ahj5ZdfB0QPzgCLcBGAs/s1600/Quotes%2Babout%2BGood%2BFood%2B%25281%2529.jpg" alt="" className='img-fluid' />
            </div>
          </Col>

        </Row>
        <div className='text-center' style={{ fontSize: '30px', textDecoration: "none" }}>
          <Link to={'/prof'} style={{ textDecoration: "none" }}>
            <i class="fa-solid fa-forward fa-beat" style={{ color: "#FFD43B", }} />
            {" "}
            BACK</Link>
        </div>
      </div>


    </>
  )
}

export default Savedrecipies