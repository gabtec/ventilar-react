function SelectVentilatorItem({ ventilator, selectVentilatorEvent }) {
  return (
    <div className="field is-horizontal">
      <div className="control">
        <input
          className="radio"
          type="radio"
          name="selectvent"
          id={ventilator.id}
          value={ventilator.id}
          onChange={selectVentilatorEvent}
        />
      </div>
      <label className="label ml-2" htmlFor="selectvent">
        {getVentilatorDescriptionString(ventilator)}
      </label>
    </div>
  );
}

export default SelectVentilatorItem;

function getVentilatorDescriptionString(ventilator) {
  return `[${ventilator.serial}] ${ventilator.brand} ${ventilator.model}`;
}
