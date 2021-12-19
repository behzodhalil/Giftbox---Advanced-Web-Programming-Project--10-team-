import React from "react";
import { format } from "date-fns";

import styles from "./order.module.scss";
import { useAddress } from "hooks/address.hook";

export default function OrderItem({ data }) {
  const address = useAddress(data.address);
  const { title, region, city, full_address, zipcode } = address.data;
  console.log(new Date(data.date));
  console.log(data.date);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h4>주문 날짜</h4>
          <span>{format(data.date, "MM.dd.yyyy - HH:mm")}</span>
        </div>
        <div>
          <h4>주문 요약</h4>
          <span>{data.products.length} 상품</span>
        </div>
        <div>
          <h4>상태</h4>
          <span>{data.status}</span>
        </div>
        <div>
          <h4>가격</h4>
          <span>{data.total_price} 원</span>
        </div>
      </div>
      <hr />
      <div className={styles.productPhotos}>
        <img
          className={styles.photo}
          src="https://productimages.hepsiburada.net/s/34/120/10426321043506.jpg"
          loading="lazy"
        />
        <img
          className={styles.photo}
          src="https://i.ibb.co/ZK2L8cg/kisspng-fashion-model-hugo-boss-pinpoint-resource-of-oklah-mens-fashion-5a78e637c1bde9-3434957015178.png"
          loading="lazy"
        />
      </div>
      <hr />
      <div className={styles.addressContainer}>
        <details>
          <summary>주소 표시</summary>
          {!address.loading && (
            <>
              <p>
                <span className={styles.title}>주소: </span>
                {title}
              </p>
              <p>{full_address}</p>
              <p>
                {city} / {zipcode}
              </p>
              <p>{region}</p>
            </>
          )}
        </details>
      </div>
    </div>
  );
}
