import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductsShop = ({ product }) => {
  return (
    <div className="max-w-6xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
      {product?.products?.map((product) => (
        <Card key={product?._id} className="py-0 mt-10 gap-2">
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[270px] object-cover rounded-t-lg"
            />
            {product?.stock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.stock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${product?.stock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="p-2">
            <h2 className="text-xl font-bold ">{product?.title}</h2>
            <div className="flex justify-between items-center ">
              <span className="text-[16px] text-muted-foreground">
                {product?.category}{" "}
              </span>
              <span className="text-[16px] text-muted-foreground">
                {product?.brand}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-lg font-semibold text-primary">
                  ${product?.salePrice}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="mb-4">
            {product?.stock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button className="w-full">Add to cart</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsShop;
