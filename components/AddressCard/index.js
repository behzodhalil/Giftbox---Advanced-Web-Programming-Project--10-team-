import React, { useState } from "react";

import styles from "./address-card.module.scss";

import UpdateAddress from "./update-address";
import { deleteAddress } from "@/firebase/addresses";

export default function AddressCard({ data }) {
  const [toggleModal, setModal] = useState(false);
  const { id, title, full_address, zipcode, region, city } = data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{title || "제목"}</h4>
      </div>
      <hr />
      <div className={styles.addressContainer}>
        <p>{full_address || "전체 주소"}</p>
        <p>{city + " / " + zipcode || "도시 / 우편 번호"}</p>
        <p>{region || "지역"}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.delete} onClick={() => deleteAddress({ id })}>
          삭제
        </button>
        <button className={styles.update} onClick={() => setModal(true)}>
          갱신
        </button>
      </div>
      {toggleModal && (
        <UpdateAddress addressData={data} closeEvent={() => setModal(false)} />
      )}
    </div>
  );
}
