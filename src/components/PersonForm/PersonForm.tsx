"use client";

import {
  Form,
  Input,
  Select,
  Button,
  Radio,
  Row,
  Col,
  DatePicker,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addPerson,
  editPerson,
  clearEditingPerson,
} from "@/store/personSlice";
import { FormValues } from "../../types/person";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import dayjs from "dayjs";


export default function PersonForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editingPerson = useSelector((state: RootState) => state.persons.editingPerson);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingPerson) {
      form.setFieldsValue({
        ...editingPerson,
        birthday: dayjs(editingPerson.birthday),
      });
      return;
    }

    form.resetFields();
  }, [editingPerson, form]);

  const onFinish = (values: Omit<FormValues, "id">) => {
    const data = {
      ...values,
      id: uuid(),
      birthday: values.birthday.format("YYYY-MM-DD"),
    }

    if (editingPerson) {
      dispatch(
        editPerson({
          ...data,
          id: editingPerson.id,
        })
      );
      dispatch(clearEditingPerson());
    } else {
      dispatch(
        addPerson({
          ...data,
          id: uuid(),
        })
      );
    }
    form.resetFields();
  };

  return (
    <div className="content-form">
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              name="title"
              label={t("form.prefix")}
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "1", label: t("form.prefix.mr") },
                  { value: "2", label: t("form.prefix.mrs") },
                ]}
                placeholder={t("form.prefix")}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="firstname"
              label={t("form.firstName")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="lastname"
              label={t("form.lastName")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="birthday"
              label={t("form.birthDate")}
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder={t("form.birthDate.placeholder")}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="nationality"
              label={t("form.nationality")}
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  {
                    value: "Thai",
                    label: (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Image src="https://flagcdn.com/w20/th.png" alt="Thailand flag" width={20} preview={false} />
                        {t("form.nationality.thai")}
                      </div>
                    ),
                  },
                  {
                    value: "USA",
                    label: (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Image src="https://flagcdn.com/w20/us.png" alt="United States flag" width={20} preview={false} />
                        {t("form.nationality.usa")}
                      </div>
                    ),
                  },
                  {
                    value: "France",
                    label: (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Image src="https://flagcdn.com/w20/fr.png" alt="France flag" width={20} preview={false} />
                        {t("form.nationality.france")}
                      </div>
                    ),
                  },
                ]}
                placeholder={t("form.nationality.placeholder")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Citizen ID">
          <Form.Item name={["citizenId", 0]} noStyle>
            <Input style={{ width: 60, textAlign: "center" }} maxLength={1} />
          </Form.Item>

          <span style={{ padding: "0 8px" }}>-</span>

          <Form.Item name={["citizenId", 1]} noStyle>
            <Input style={{ width: 80, textAlign: "center" }} maxLength={4} />
          </Form.Item>

          <span style={{ padding: "0 8px" }}>-</span>

          <Form.Item name={["citizenId", 2]} noStyle>
            <Input style={{ width: 90, textAlign: "center" }} maxLength={5} />
          </Form.Item>

          <span style={{ padding: "0 8px" }}>-</span>

          <Form.Item name={["citizenId", 3]} noStyle>
            <Input style={{ width: 70, textAlign: "center" }} maxLength={2} />
          </Form.Item>

          <span style={{ padding: "0 8px" }}>-</span>

          <Form.Item name={["citizenId", 4]} noStyle>
            <Input style={{ width: 60, textAlign: "center" }} maxLength={1} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="gender"
          label={t("form.gender")}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="Male">{t("form.genderMale")}</Radio>
            <Radio value="Female">{t("form.genderFemale")}</Radio>
            <Radio value="Unsex">{t("form.genderUnsex")}</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item label={t("form.phoneNumber")} required>
              <Form.Item
                name="countryCode"
                noStyle
                rules={[{ required: true }]}
              >
                <Select style={{ width: 140 }}>
                  <Select.Option value="+66">
                    <Image
                      alt="Thailand flag"
                      src="https://flagcdn.com/w20/th.png"
                      width={20}
                      preview={false}
                      style={{ marginRight: 8 }}
                    />
                    +66
                  </Select.Option>

                  <Select.Option value="+1">
                    <Image
                      alt="United States flag"
                      src="https://flagcdn.com/w20/us.png"
                      width={20}
                      preview={false}
                      style={{ marginRight: 8 }}
                    />
                    +1
                  </Select.Option>

                  <Select.Option value="+33">
                    <Image
                      alt="France flag"
                      src="https://flagcdn.com/w20/fr.png"
                      width={20}
                      preview={false}
                      style={{ marginRight: 8 }}
                    />
                    +33
                  </Select.Option>
                </Select>
              </Form.Item>

              <span style={{ padding: "0 8px" }}>-</span>

              <Form.Item
                name="phone"
                noStyle
                rules={[{ required: true }]}
              >
                <Input style={{ width: 300 }} />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name="passport" label={t("form.passport")}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="bottom">
          <Col span={10}>
            <Form.Item
              name="salary"
              label={t("form.expectedSalary")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item>
              <div style={{ marginLeft: 150, display: "flex", gap: 120 }}>
                <Button htmlType="reset">{t("form.reset")}</Button>
                <Button htmlType="submit">
                  {t("form.submit")}
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
