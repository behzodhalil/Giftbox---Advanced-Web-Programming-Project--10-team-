import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/firebase/context";

import styles from "./account.module.scss";
import AccountSidebar from "@/components/AccountSidebar";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { updateUser, updatePassword } from "@/firebase/update-user";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* 이름이 필요합니다.")
    .min(2, "* 이름이 너무 짧습니다."),
  surname: yup
    .string()
    .required("* 성을 입력해야 합니다.")
    .min(2, "* 성이 너무 짧습니다."),
  email: yup.string().email().required("* 이메일이 필요합니다."),
  phone: yup
    .string()
    .notRequired()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
      message: "잘못된 전화 번호",
      excludeEmptyString: true,
    }),
});

const schema2 = yup.object().shape({
  currentPassword: yup
    .string()
    .required("* 현재 암호가 필요합니다.")
    .min(8, "* 암호가 너무 짧습니다. 최소 8자여야 합니다."),
  newPassword: yup
    .string()
    .required("* 새 암호가 필요합니다.")
    .min(8, "* 암호가 너무 짧습니다. 최소 8자여야 합니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export default function AccountPage() {
  const [passwordError, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { user, loading } = useAuth();

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    getValues,
  } = useForm({
    resolver: yupResolver(schema2),
  });

  const onSubmit = ({ email, phone, name, surname }) => {
    updateUser({
      email,
      phone,
      name,
      surname,
      photo,
      finalEvent: () => window.location.reload(false),
    });
  };

  const changePassword = ({ currentPassword, newPassword }) => {
    const { reauth, update } = updatePassword({ currentPassword, newPassword });

    reauth()
      .then(() =>
        update()
          .then(() => setError("비밀번호 변경!"))
          .catch((e) => setError(e.message))
      )
      .catch((e) => setError(e.message));
  };

  if (!user && !loading) useRouter().push("/login");
  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>내 계정</h1>
        <div className={styles.content}>
          <div className={styles.accountContainer}>
            <h4>계정 정보</h4>
            <form key="account-form" onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <span>이름</span>
                <Input
                  name="name"
                  defaultValue={user?.name}
                  noMargin
                  register={register}
                  placeholder="이름"
                  error={errors.name}
                />
              </div>
              {errors.name && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.name.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>성</span>
                <Input
                  name="surname"
                  defaultValue={user?.surname}
                  noMargin
                  register={register}
                  placeholder="성"
                  error={errors.surname}
                />
              </div>
              {errors.surname && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.surname.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>이메일</span>
                <Input
                  name="email"
                  defaultValue={user?.email}
                  noMargin
                  register={register}
                  placeholder="이메일"
                  error={errors.email}
                />
              </div>
              {errors.email && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.email.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>전화번호</span>
                <Input
                  name="phone"
                  defaultValue={user?.phoneNumber}
                  noMargin
                  register={register}
                  error={errors.phone}
                />
              </div>
              {errors.phone && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.phone.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>프로필 사진</span>

                <label className={styles.uploadButton}>
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {photo?.name || "파일 선택"}
                </label>
              </div>
              <Button type="submit" name="update_button" value="Update">
              갱신하다
              </Button>
            </form>
          </div>
          <hr />
          <div className={styles.passwordContainer}>
            <h4>암호 변경</h4>
            <form key="password-form" onSubmit={handleSubmit2(changePassword)}>
              <div className={styles.inputContainer}>
                <span>현재 암호</span>
                <Input
                  name="currentPassword"
                  register={register2}
                  placeholder="현재 암호"
                  noMargin
                />
              </div>
              <div className={styles.inputContainer}>
                <span>새로운 암호</span>
                <Input
                  name="newPassword"
                  register={register2}
                  placeholder="새로운 암호"
                  noMargin
                />
              </div>
              {errors2.newPassword && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors2.newPassword.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>새 암호 확인</span>
                <Input
                  name="confirmPassword"
                  register={register2}
                  placeholder="새 암호 확인"
                  noMargin
                />
              </div>
              {errors2.confirmPassword && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors2.confirmPassword.message}
                </span>
              )}
              {passwordError && (
                <span
                  style={{
                    color:
                      passwordError === "Password Changed!" ? "black" : "red",
                    marginTop: 4,
                    fontSize: 14,
                  }}
                >
                  {passwordError}
                </span>
              )}
              <Button
                type="submit"
                name="password_button"
                value="Change Password"
              >
              확인
              </Button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
