import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: 64 }}>404</h1>
        <h2>찾고 있는 콘텐츠를 현재 사용할 수 없습니다.</h2>
        <Link href="/">
          <h3 style={{ cursor: "pointer", textDecoration: "underline" }}>
          쇼핑 계속하기
          </h3>
        </Link>
      </div>
    </Layout>
  );
}
