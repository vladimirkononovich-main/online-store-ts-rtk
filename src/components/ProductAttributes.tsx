import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Attribute } from "../models/dataModels";

interface IProductAttribute {
  attribute: Attribute;
  attributes: ISelectedAttr;
  setAttributes: (value: ISelectedAttr) => void;
  className: string;
  view: string;
}
interface ISelectedAttr {
  [key: string]: string;
}

function ProductAttribute({
  attribute,
  className,
  view,
  attributes,
  setAttributes,
}: IProductAttribute) {
  const typeText = attribute.type === "text";
  const typeSwatch = attribute.type === "swatch";
  const viewNormal = view === "normal";
  const viewCompressed = view === "compressed";
  const quantity = attribute.items.length;
  const btnWidth =
    (typeText && viewNormal && "63px") || (typeSwatch && viewNormal && "32px");

  const styles = {
    gridTemplateColumns: `repeat(${quantity}, ${btnWidth})`,
  };

  return (
    <div className={classNames("attribute", className)}>
      <h3
        className={classNames({
          attribute__name_view_normal: view === "normal",
          attribute__name_view_compressed: view === "compressed",
        })}
      >
        {attribute.name + ":"}
      </h3>
      <div
        className={classNames({
          "attribute__btn-wrapper_text": typeText,
          "attribute__btn-wrapper_swatch": typeSwatch,
        })}
        style={styles}
      >
        {attribute.items.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: item.value,
                border: `1px solid ${item.value === "#FFFFFF" && "gray"}`,
              }}
              onClick={() => {
                setAttributes({
                  ...attributes,
                  [attribute.id]: item.id,
                });
              }}
              className={classNames({
                attribute__btn_text: typeText,
                attribute__btn_swatch: typeSwatch,
                attribute__btn_view_normal_text: typeText && viewNormal,
                attribute__btn_view_normal_swatch: typeSwatch && viewNormal,
                attribute__btn_view_compressed_swatch:
                  typeSwatch && viewCompressed,
                attribute__btn_view_compressed_text: typeText && viewCompressed,
                attribute__btn_text_active:
                  typeText && attributes[attribute.id] === item.id,
                attribute__btn_swatch_active:
                  typeSwatch && attributes[attribute.id] === item.id,
              })}
            >
              {typeText && item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductAttribute;
