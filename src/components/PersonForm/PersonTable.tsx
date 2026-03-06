"use client"

import { Table, Button, Space, Checkbox } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { deletePerson, deleteMultiple } from "@/store/personSlice"
import { useEffect, useState } from "react"
import { Person } from "@/types/person"
import { useTranslation } from "react-i18next"

interface Props {
  setEditingPerson: (person: Person) => void;
}

export default function PersonTable({ setEditingPerson } : Props) {
  const { t } = useTranslation();
  const persons = useSelector((state: RootState) => state.persons.list)
  const dispatch = useDispatch()

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  const [mounted, setMounted] = useState(false)

  const columns: ColumnsType<Person> = [
    {
      title: t("table.name"),
      key: "name",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (_, record) => t(`table.gender${record.gender}`),
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("table.mobilePhone"),
      key: "phone",
      render: (_, record) => `${record.countryCode}${record.phone}`,
      sorter: (a, b) => a.countryCode.localeCompare(b.countryCode),
    },
    {
      title: t("table.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("table.manage"),
      key: "manage",
      render: (_, record) => (
        <Space>
          <Button 
            type="link"
            style={{color: "rgba(0, 0, 0, 0.88)"}}
            onClick={() => setEditingPerson(record)}
          >
            {t("table.edit")}
          </Button>
          <Button
            type="link"
            style={{color: "rgba(0, 0, 0, 0.88)"}}
            onClick={() => dispatch(deletePerson(record.id))}
          >
            {t("table.delete")}
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Table action buttons */}
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <Checkbox
          checked={selectedKeys.length === persons.length && persons.length > 0}
          indeterminate={selectedKeys.length > 0 && selectedKeys.length < persons.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedKeys(persons.map((p) => p.id))
            } else {
              setSelectedKeys([])
            }
          }}
        >
          {t("table.selectAll")}
        </Checkbox>
      
        <Button
          disabled={!selectedKeys.length}
          onClick={() => dispatch(deleteMultiple(selectedKeys as string[]))}
        >
          {t("table.delete")}
        </Button>
      </div>

      {/* Data table */}
      <Table<Person>
        rowKey="id"
        columns={columns}
        dataSource={persons}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => setSelectedKeys(keys),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          position: ["topRight"],
          showQuickJumper: false,
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return <a>{t("table.prev")}</a>
            }
            if (type === "next") {
              return <a>{t("table.next")}</a>
            }
            return originalElement
          }
        }}
      />
    </>
  )
}