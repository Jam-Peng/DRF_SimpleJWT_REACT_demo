import { useCallback, useContext, useEffect, useState } from "react"
import ProductList from "../components/product/ProductList"
import { AuthContext } from "../context/AuthContext"

function Home() {
  const [products, setProducts] = useState([])
  const { authToken, logoutUser } = useContext(AuthContext)

  const getProducts = useCallback(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/products/', {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        // "Authorization": "Bearer " + String(authToken.access)    /* 後端設定必須帶有token才能取得資料 */
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProducts(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }, [logoutUser]) 

  useEffect(() => {
      getProducts()
  },[authToken, getProducts])

  
  return (
    <section>
      <div className="p-4 sm:p-10">
        <div className='grid sm:grid-cols-4 gap-4'>
        {products.map(product => {
          return (
            <ProductList key={product.id} product={product} />
          )
        })}
        </div>
      </div>
      
    </section>
  )
}

export default Home