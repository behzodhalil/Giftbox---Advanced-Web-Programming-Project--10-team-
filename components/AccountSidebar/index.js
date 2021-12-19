import React from "react";

import styles from "./sidebar.module.scss";
import Link from "next/link";
import HelpIcon from "@/icons/help";

import { useAuth } from "@/firebase/context";

const SidebarItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.sidebarItem}>
      <Link href={link || "/account"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function AccountSidebar() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>메뉴</h2>
      <ul className={styles.categories}>
        <SidebarItem name="내 계정" emoji="🔒" />
        <SidebarItem name="내 주문" emoji="📦" link="/account/orders" />
        <SidebarItem name="찜 리스트" emoji="❤️" link="/account/favorites" />
        <SidebarItem name="주소들" emoji="🏘️" link="/account/addresses" />
        <SidebarItem name="로그아웃" emoji="🚪" link="/account/logout" />
      </ul>
      
    </div>
  );
}
