"use client";

import { Col, Row } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="test-content">
      <Row gutter={16} justify="center">
        <Col>
          <Link href="/shape"
            className="test-card"
          >
            <div className="test-topic">
              <h3>{t("test1.topic")}</h3>
            </div>
            <div className="test-detail">
              <p>{t("test1.detail")}</p>
            </div>
          </Link>
        </Col>

        <Col>
          <Link href="/form"
            className="test-card"
          >
            <div className="test-topic">
              <h3>{t("test2.topic")}</h3>
            </div>
            <div className="test-detail">
              <p>{t("test2.detail")}</p>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
}