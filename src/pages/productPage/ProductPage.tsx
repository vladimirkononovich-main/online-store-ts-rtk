import { useQuery } from "@apollo/client";
import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductAttribute from "../../components/ProductAttributes";
import ProductPrice from "../../components/ProductPrice";
import { Product } from "../../models/dataModels";
import { GET_PRODUCT } from "../../queries/onlineStoreData";
import { addProductToCart } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";
import "./productPage.css";

interface ISelectedAttr {
  [key: string]: string;
}

function ProductPage() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [currentImg, setCurrentImg] = useState(0);
  const [attributes, setAttributes] = useState<ISelectedAttr>({});
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
  });

  useEffect(() => {
    const result: ISelectedAttr = {};

    const attrs = product?.attributes.map((attr) => {
      return {
        [attr.id]: attr.items[0].id,
      };
    });
    attrs?.forEach((attr) => {
      const key = Object.keys(attr)[0];
      const value = Object.values(attr)[0];

      result[key] = value;
    });
    setAttributes(result);
  }, [product]);

  useEffect(() => {
    if (!loading) {
      setProduct(data.product);
    }
  });

  if (!product) {
    return <h2>Product is loading...</h2>;
  }

  return (
    <main className="product">
      <div className="product__gallery">
        {product?.gallery.map((src, index) => {
          return (
            <img
              key={index}
              src={src}
              alt="Img not loaded"
              className="product__gallery-img"
              onClick={() => setCurrentImg(index)}
            />
          );
        })}
      </div>
      <img
        className="product__current-img"
        src={product?.gallery[currentImg]}
      />
      <div className="product__menu">
        <h3 className="product__brand">{product?.brand}</h3>
        <h3 className="product__name">{product?.name}</h3>
        <div className="product__attr-wrapper">
          {product.attributes.map((attr, index) => {
            return (
              <ProductAttribute
                attribute={attr}
                attributes={attributes}
                setAttributes={setAttributes}
                className="product__attr"
                view="normal"
                key={index}
              />
            );
          })}
        </div>
        <h3 className="product__price-title">price:</h3>
        <ProductPrice
          prices={product.prices}
          view="bold"
          className="product__price"
        />
        <button
          className="product__add-product-btn"
          onClick={() =>
            dispatch(
              addProductToCart({
                selectedAttrs: attributes,
                product,
                quantity: 1,
              })
            )
          }
        >
          Add to cart
        </button>
        <Interweave
          content={product.description}
          className="product__description"
        />
      </div>
    </main>
  );
}

export default ProductPage;
