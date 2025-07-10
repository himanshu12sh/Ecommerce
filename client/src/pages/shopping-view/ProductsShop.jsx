import { Card } from "@/components/ui/card"

const ProductsShop = ({product}) => {
  return (
    <div className="flex">
      {
        product?.products?.map((item)=>(
           <Card key={item}>
           <img src={item?.image} alt="" />         
           </Card>
        ))
      }
    </div>
  )
}

export default ProductsShop