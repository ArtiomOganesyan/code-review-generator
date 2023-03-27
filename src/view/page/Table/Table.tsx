import ReviewTable from "./module/ReviewTable";
import TableCreate from "./module/TableCreate";
import style from "./table.module.css";

function Table() {
  return (
    <div class={style.table}>
      <TableCreate></TableCreate>
      <ReviewTable></ReviewTable>
    </div>
  );
}

export default Table;

