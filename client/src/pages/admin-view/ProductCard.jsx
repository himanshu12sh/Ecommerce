import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"

const ProductCard = () => {
    console.log("product card is rendered");
  return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
         <div className="p-2">
            <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Product Title</h3>
            <p className="text-sm text-gray-600 mb-4">
                This is a brief description of the product.
            </p>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$99.99</span>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
                </Button>
            </div>
         </div>
      </Card>
  )
}

export default ProductCard
