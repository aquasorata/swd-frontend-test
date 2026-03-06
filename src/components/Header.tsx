"use client";

import { Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case "/form":
        return t("form.title");
      case "/shape":
        return t("shape.title");
      default:
        return t("");
    }
  };

  return (
    <div className="header">
      <h1>{getTitle()}</h1>
      <div  className="header-content">
        <Select
          defaultValue="th"
          style={{ width: 120 }}
          onChange={(val) => i18n.changeLanguage(val)}
          options={[
            { value: "th", label: "ไทย" },
            { value: "en", label: "EN" },
          ]}
        />
        {pathname !== "/" ?         
          <Link href="/">
            <Button>
              {t("header.homebtn")}
            </Button>
          </Link> 
        :
          ""}
      </div>
    </div>
  );
}