import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;


export default function AntDesign() {
  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <div className="perform-query-date-time-picker">
      <DatePicker showTime placeholder="Start Date" onChange={onChange} onOk={onOk} />
      <DatePicker showTime placeholder="End Date" onChange={onChange} onOk={onOk} />
    </div>
  );
}
