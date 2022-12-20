import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Attribute } from "../models/dataModels";

interface IProductAttribute {
  attribute: Attribute;
  attributes: ISelectedAttr;
  setAttributes?: (value: ISelectedAttr) => void;
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
  const viewCondensed = view === "condensed";
  const attrQuantity = attribute.items.length;
  const btnWidth =
    (typeText && viewNormal && "63px") ||
    (typeSwatch && viewNormal && "32px") ||
    (typeText && viewCondensed && "max-content") ||
    (typeSwatch && viewCondensed && "16px");

  const classes = {
    attribute: className + "__product-attribute",
  };
  const styles = {
    gridTemplateColumns: `repeat(${attrQuantity}, ${btnWidth})`,
  };

  return (
    <div className={classNames(classes.attribute)}>
      <h3
        className={classNames({
          attribute__name_normal: viewNormal,
          attribute__name_condensed: viewCondensed,
        })}
      >
        {attribute.name + ":"}
      </h3>
      <div
        className={classNames({
          "attribute__btn-wrapper_text_normal": typeText && viewNormal,
          "attribute__btn-wrapper_text_condensed": typeText && viewCondensed,

          "attribute__btn-wrapper_swatch_normal": typeSwatch && viewNormal,
          "attribute__btn-wrapper_swatch_condensed":
            typeSwatch && viewCondensed,
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
                if (!setAttributes) return;
                setAttributes({
                  ...attributes,
                  [attribute.id]: item.id,
                });
              }}
              className={classNames({
                attribute__btn_text_normal: typeText && viewNormal,
                attribute__btn_swatch_normal: typeSwatch && viewNormal,
                attribute__btn_text_condensed: typeText && viewCondensed,
                attribute__btn_swatch_condensed: typeSwatch && viewCondensed,
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
