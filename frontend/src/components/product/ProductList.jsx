

function ProductList({ product }) {
  const { name, price, get_thumbnail } = product;
  console.log(product)
  return (
    <section>
      <div className='flex flex-col items-center'>
        <div>
          <img src={get_thumbnail} alt="產品圖"  className='h-14'/>
        </div>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </section>
  )
}

export default ProductList