"use client";

import { Row, Col, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ShapeItem from "./ShapeItem";

const initialShapes = [
  "square",
  "circle",
  "ellipse",
  "rectangle",
  "parallelogram",
  "trapezoid",
];

export default function ShapeGrid() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState(initialShapes);
  const [swapOffset, setSwapOffset] = useState(false);

  const moveLeft = () => {
    const arr = [...shapes];
    const first = arr.shift();
    if (first) arr.push(first);
    setShapes(arr);
  };

  const moveRight = () => {
    const arr = [...shapes];
    const last = arr.pop();
    if (last) arr.unshift(last);
    setShapes(arr);
  };

  const swapRows = () => {
    const top = shapes.slice(0, 3);
    const bottom = shapes.slice(3, 6);
  
    setShapes([...bottom, ...top]);
    setSwapOffset(prev => !prev);
  };

  const shuffle = () => {
    const arr = [...shapes];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setShapes(arr);
  };

  return (
    <div>
      {/* Control Buttons */}
      <Row gutter={20} justify="center" style={{ marginBottom: 40 }}>
        <Col>
          <Button className="shape-btn" onClick={moveLeft}>
            <div className="triangle-left"></div>
            <span>{t("shape.moveShape")}</span>
          </Button>
        </Col>

        <Col>
          <Button className="shape-btn shape-btn-lg" onClick={swapRows}>
            <div className="shape-btn-content">
              <div className="triangle-up"></div>
              <div className="triangle-down"></div>
            </div>
            <span>{t("shape.movePosition")}</span>
          </Button>
        </Col>

        <Col>
          <Button className="shape-btn" onClick={moveRight}>
            <div className="triangle-right"></div>
            <span>{t("shape.oveShape")}</span>
          </Button>
        </Col>
      </Row>

      {/* Shape Grid */}
      <Row justify="center" gutter={16} style={{ marginBottom: 16 }}>
        {!swapOffset && <Col span={2} />}
        {shapes.slice(0, 3).map((shape, i) => (
          <Col key={i}>
            <ShapeItem type={shape} onClick={shuffle} />
          </Col>
        ))}
        {swapOffset && <Col span={2} />}
      </Row>
      
      <Row justify="center" gutter={16} style={{ marginBottom: 16 }}>
        {swapOffset && <Col span={2} />}
        {shapes.slice(3, 6).map((shape, i) => (
          <Col key={i}>
            <ShapeItem type={shape} onClick={shuffle} />
          </Col>
        ))}
        {!swapOffset && <Col span={2} />}
      </Row>
    </div>
  );
}