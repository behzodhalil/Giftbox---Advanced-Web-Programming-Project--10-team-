import React from "react";

import styles from "./categories.module.scss";
import Link from "next/link";
import HelpIcon from "@/icons/help";

const CategoryItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.categoryItem}>
      <Link href={link || "/"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>카테고리</h2>
      <ul className={styles.categories}>
        <CategoryItem name="오늘의 발견" emoji="⚡" link="/" />
        <CategoryItem name="패션 의류" emoji="👚" link="/category/clothing" />
        <CategoryItem name="신발" emoji="👠" link="/category/shoes" />
        <CategoryItem
          name="가방"
          emoji="👜"
          link="/category/accessories"
        />
        <CategoryItem
          name="스포츠"
          emoji="🤸"
          link="/category/activewear"
        />
        <CategoryItem
          name="특별한 선물"
          emoji="🎁"
          link="/category/gifts_and_living"
        />
        <CategoryItem
          name="취미 & 도서"
          emoji="💎"
          link="/category/inspiration"
        />
      </ul>
      <div className={styles.helpContainer}>
        <div className={styles.helpIcon}>
          <HelpIcon width={18} height={18} />
        </div>
        <span>고객 센터</span>
      </div>
    </div>
  );
}
