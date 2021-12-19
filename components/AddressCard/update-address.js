import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./update.module.scss";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { updateAddress } from "@/firebase/addresses";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("* 제목이 필요합니다")
    .min(2, "* 제목이 너무 짧습니다"),
  city: yup
    .string()
    .required("* 도시 필요합니다")
    .min(2, "* 도시가 너무 짧습니다"),
  region: yup.string().required("* 지역이 필요합니다."),
  zipcode: yup.string().required("* 우편 번호가 필요합니다.."),
  full_address: yup.string().required("* 전체 주소가 필요합니다."),
});

export default function UpdateAddress({ addressData, closeEvent }) {
  const { id, title, full_address, zipcode, region, city } = addressData;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) =>
    updateAddress({ id, ...data }).finally(() => window.location.reload(false));

  const closeModal = (target) => {
    target?.id === "container" && closeEvent();
  };

  return (
    <div
      className={styles.container}
      id="container"
      onClick={(e) => closeModal(e.target)}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h4>갱신된 주소</h4>
          <div onClick={closeEvent}>×</div>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", paddingTop: 30 }}
        >
          <div className={styles.inputContainer}>
            <span>주소</span>
            <Input
              name="title"
              noMargin
              register={register}
              placeholder="집,사무실 등"
              defaultValue={title}
              error={errors.title}
            />
          </div>
          {errors.title && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.title.message}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>도시</span>
            <Input
              name="city"
              noMargin
              register={register}
              defaultValue={city}
              placeholder="서울,부산 등"
              error={errors.city}
            />
          </div>
          {errors.city && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.city.message}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>지역</span>
            <Input
              name="region"
              noMargin
              register={register}
              defaultValue={region}
              placeholder="한국,중국 등."
              error={errors.region}
            />
          </div>
          {errors.region && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.region.message}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>우편번호</span>
            <Input
              name="zipcode"
              noMargin
              register={register}
              defaultValue={zipcode}
              placeholder=""
              error={errors.zipcode}
            />
          </div>
          {errors.zipcode && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.zipcode.message}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>전체 주소</span>
            <Input
              name="full_address"
              noMargin
              register={register}
              defaultValue={full_address}
              placeholder="서울특별시, 노원구 서울과학기술대학교"
              error={errors.full_address}
            />
          </div>
          {errors.full_address && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.full_address.message}
            </span>
          )}
          <Button type="submit" style={{ marginBottom: 0 }}>
            주소 갱신
          </Button>
        </form>
      </div>
    </div>
  );
}
