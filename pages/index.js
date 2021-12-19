import Head from "next/head";
import styles from "./index.module.scss";

import Button from "components/FilterButton";
import HorizontalCard from "components/HomeCard/horizontal-card";
import VerticalCard from "components/HomeCard/vertical-card";
import Products from "components/HomeProducts";

import { db } from "config/firebase";
import Layout from "components/Layout";

import { useAuth } from "../firebase/context";

export default function Home() {
  const auth = useAuth();

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Giftbox - It's a site where you can find good gifts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.emoji}>⚡</span>오늘의 발견
            </h1>
            <div className={styles.headerButtons}>
              <Button type="sort" style={{ marginRight: 20 }} />
              <Button count={0} />
            </div>
          </div>

          <Products>
            <HorizontalCard
              bgColor="#BCE7F0"
              title="최대 50% 할인"
              image="https://i.ibb.co/wL3nWkm/Pngtree-memphis-style-line-point-line-3797599.png"
            />
            <HorizontalCard
              bgColor="#dec8f3"
              image="https://i.ibb.co/qdY3T5g/kindpng-53319.png"
              title="New Jordan Series"
              desc="Best of daily wear"
            />
            <VerticalCard
              bgColor="#ffffff"
              name="코오롱스포츠 남여공용뉴볼륨롱다운"
              image="http://gdimg.gmarket.co.kr/2106636378/still/300?ver=2021121815"
              price="234,000"
              sale_price="170,820"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="(신세계하남점)베이직 싱글 코트 NW1WHA02"
              image="http://gdimg.gmarket.co.kr/2248882189/still/280?ver=1639580711"
              price="296,860"
            />
          </Products>
          <Products reverse>
            <HorizontalCard
              bgColor="#FBE285"
              image="https://i.ibb.co/fd9gS8p/kisspng-model-fashion-photography-fashion-photography-model-5abb4a53e1f5b0-6067237715222236999256.png"
              title="새로운 니트"
              desc="Layers. On. Layers"
            />
            <HorizontalCard
              bgColor="#F9CADA"
              image="https://i.ibb.co/db3Ww4J/kisspng-barbara-palvin-fashion-model-5b2b93c8c2c3a8-5507716115295825367978.png"
              title="New Season"
              desc="Reflect your style"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="폴햄키즈 인기 ITEM 발열내의/맨투맨/팬츠 외 30종"
              image="http://gdimg.gmarket.co.kr/2266428923/still/300?ver=2021121815"
              price="19,900"
            />
            <VerticalCard
              bgColor="#ffffff"
              name="12%+7%쿠폰 크리스마스세일 주니어의류"
              image="http://gdimg.gmarket.co.kr/2162742250/still/300?ver=2021121815"
              price="39,600"
              sale_price="11,900"
            />
          </Products>
          <Products>
            <HorizontalCard
              bgColor="#99E6B0"
              image="https://i.ibb.co/0yKq1HK/kindpng-4043322.png"
              title="End of season"
              desc="Always sporty"
            />
            <HorizontalCard
              bgColor="#f3e6c8"
              image="https://i.ibb.co/68XpWPB/pngkey-com-ladies-purse-png-2499694.png"
              title="New Accessories"
              desc="Complete your combine"
            />
            <VerticalCard
              bgColor="#ffffff"
              name="코오롱스포츠 남여공용뉴볼륨롱다운"
              image="http://gdimg.gmarket.co.kr/2106636378/still/300?ver=2021121815"
              price="234,000"
              sale_price="170,820"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="(신세계하남점)베이직 싱글 코트 NW1WHA02"
              image="http://gdimg.gmarket.co.kr/2248882189/still/280?ver=1639580711"
              price="296,860"
            />
          </Products>
        </main>
      </div>
    </Layout>
  );
}
