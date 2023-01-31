import { useSelector } from "react-redux";

export default function ListClass({ name, item }) {
  const { theme } = useSelector((state) => state);
  return (
    <div className=" d-flex align-items-center">
      <div className="d-flex w-100">
        <div className="w-25">
          <div className={`my-2 py-2 ${theme.mode}`}>{name}</div>
        </div>
        <div className="w-75">
          <div
            className={`${
              theme.mode === "dark" ? "bg-brown" : "bg-silver"
            }  d-block listClases w-100 my-2 rounded  py-2`}
          >
            {item}
          </div>
        </div>
      </div>
    </div>
  );
}
