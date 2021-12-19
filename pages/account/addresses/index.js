import React, { useState, useEffect } from "react";

import AccountSidebar from "@/components/AccountSidebar";
import Layout from "@/components/Layout";
import AddressCard from "@/components/AddressCard";
import AddAddress from "./add-address";

import styles from "./address.module.scss";
import { useAuth } from "@/firebase/context";
import { useAddresses } from "hooks/address.hook";
import { useRouter } from "next/router";

export default function Addresses() {
  const [toggleModal, setModal] = useState(false);

  const { user } = useAuth();
  const userLoading = useAuth().loading;

  const { data, loading } = useAddresses();

  if (!user && !userLoading) useRouter().push("/login");

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>내 주소들</h1>
        <div className={styles.content}>
          {loading ? (
            <span>로드 중...</span>
          ) : data.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>주소가 없습니다.</p>
              <button
                className={styles.addAddress}
                onClick={() => setModal(true)}
              >
                <p>+</p>새로운 주소 추가
              </button>
            </div>
          ) : (
            <div className={styles.addresses}>
              <button
                className={styles.addAddress}
                onClick={() => setModal(true)}
              >
                <p>+</p>새로운 주소 추가
              </button>
              {data?.map((item) => {
                return <AddressCard data={item} />;
              })}
            </div>
          )}
        </div>
        {toggleModal && <AddAddress closeEvent={() => setModal(false)} />}
      </main>
    </Layout>
  );
}
