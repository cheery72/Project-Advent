
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Authentication() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.setItem("token", String(router.query.token));
  }

  useEffect(() => {
    if (localStorage.token !== "undefined"){
        router.push('/')
    }
  }, );

  return <></>;
}