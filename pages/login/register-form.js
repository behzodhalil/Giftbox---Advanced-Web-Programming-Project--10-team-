import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@/components/Input";
import Button from "@/components/Button";
import SocialMediaButton from "@/components/SocialMediaButton";
import { emailRegister, registerDatabase } from "firebase/register";
import googleAuth from "firebase/google-auth";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* 이름이 필요합니다.")
    .min(2, "* 이름이 너무 짧습니다."),
  surname: yup
    .string()
    .required("* 성이 필요합니다.")
    .min(2, "* 성이 너무 짧습니다."),
  email: yup.string().email().required("* 이메일이 필요합니다."),
  password: yup
    .string()
    .required("* 암호가 필요합니다.")
    .min(8, "* 암호가 너무 짧습니다. 최소 8자여야 합니다."),
});

export default function RegisterForm() {
  const [registerError, setRegisterError] = useState();
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ email, password, name, surname }) =>
    emailRegister({ email, password })
      .then((response) => {
        registerDatabase({
          id: response.user.uid,
          email,
          name,
          surname,
        })
          .then(() =>
            setRegisterError(
              "성공적으로 등록되었습니다. 지금 로그인할 수 있습니다."
            )
          )
          .catch((e) => setRegisterError(e.message));
      })
      .catch((error) => setRegisterError(error.message));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", paddingTop: 30 }}
    >
      {/*   소셜 메디어 버튼들  */}
      <hr style={{ width: "100%", height: 1, color: "#f6f6f655" }} />
      <span
        style={{
          textAlign: "center",
          marginTop: -35,
          padding: 15,
          backgroundColor: "white",
          display: "flex",
          alignSelf: "center",
          width: "max-content",
          fontWeight: "500",
        }}
      >
        소셜 미디어로 가입
      </span>

      <div style={{ display: "flex" }}>
        <SocialMediaButton
          style={{ marginRight: 20 }}
          icon="google"
          onClick={googleAuth}>구글</SocialMediaButton>
        <SocialMediaButton icon="apple">애플</SocialMediaButton>
      </div>

      <hr
        style={{ width: "100%", height: 1, color: "#f6f6f655", marginTop: 50 }}
      />
      <span
        style={{
          textAlign: "center",
          marginTop: -35,
          padding: 15,
          backgroundColor: "white",
          display: "flex",
          alignSelf: "center",
          width: "max-content",
          fontWeight: "500",
        }}
      >
        이메일로 회원 가입
      </span>

      <Input
        name="name"
        register={register}
        placeholder="이름"
        error={errors.name}
      />
      {errors.name && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.name.message}
        </span>
      )}
      <Input
        name="surname"
        register={register}
        placeholder="성"
        error={errors.surname}
      />
      {errors.surname && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.surname.message}
        </span>
      )}
      <Input
        name="email"
        register={register}
        placeholder="이메일"
        error={errors.email}
      />
      {errors.email && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.email.message}
        </span>
      )}
      <Input
        name="password"
        register={register}
        placeholder="비밀번호"
        type="password"
        error={errors.password}
      />
      {errors.password && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.password.message}
        </span>
      )}
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      {registerError && (
        <span
          style={{
            color: "red",
            marginTop: 20,
            fontSize: 14,
            marginBottom: -10,
          }}
        >
          {registerError}
        </span>
      )}

      <Button type="submit">가입</Button>
      <div style={{ fontSize: 12, display: "flex" }}>
      등록을 클릭하면 이용 약관을 사용하고 쿠키 사용을 포함한 데이터 사용 정책을 읽었음을 동의한다.
      </div>
    </form>
  );
}
