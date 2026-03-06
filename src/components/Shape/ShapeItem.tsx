type Props = {
  type: string
  onClick: () => void
}

export default function ShapeItem({ type, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        width: 350,
        height: 150,
        padding: 20,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
      }}
    >
      <div className={`shape ${type}`} />
    </div>
  )
}