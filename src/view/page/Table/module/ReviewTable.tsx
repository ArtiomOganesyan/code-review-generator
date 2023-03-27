import style from "./reviewTable.module.css";
function ReviewTable() {
  return (
    <div
      class={style.review_table}
      style={{ "grid-template-columns": "repeat(11, 1fr)" }}
    >
      <div class={style.date_time}>
        <div>
          <p>Monday</p>
          <div>14:30 - 15:00</div>
          <div>15:00 - 15:30</div>
          <div>15:30 - 16:00</div>
          <div>16:00 - 16:30</div>
          <div>16:30 - 17:00</div>
          <div>17:00 - 13:00</div>
        </div>
        <div>
          <p>Tuesday</p>
          <div>14:30 - 15:00</div>
          <div>15:00 - 15:30</div>
          <div>15:30 - 16:00</div>
          <div>16:00 - 16:30</div>
          <div>16:30 - 17:00</div>
          <div>17:00 - 13:00</div>
        </div>
        <div>
          <p>Wednesday</p>
          <div>14:30 - 15:00</div>
          <div>15:00 - 15:30</div>
          <div>15:30 - 16:00</div>
          <div>16:00 - 16:30</div>
          <div>16:30 - 17:00</div>
          <div>17:00 - 13:00</div>
        </div>
        <div>
          <p>Thursday</p>
          <div>14:30 - 15:00</div>
          <div>15:00 - 15:30</div>
          <div>15:30 - 16:00</div>
          <div>16:00 - 16:30</div>
          <div>16:30 - 17:00</div>
          <div>17:00 - 13:00</div>
        </div>
        <div>
          <p>Friday</p>
          <div>14:30 - 15:00</div>
          <div>15:00 - 15:30</div>
          <div>15:30 - 16:00</div>
          <div>16:00 - 16:30</div>
          <div>16:30 - 17:00</div>
          <div>17:00 - 13:00</div>
        </div>
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
    </div>
  );
}

export default ReviewTable;

