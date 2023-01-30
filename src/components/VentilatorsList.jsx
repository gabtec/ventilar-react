import ListWithoutItems from './ListWithoutItems';
import VentilatorsItem from './VentilatorsItem';

function VentilatorsList() {
  const vents = [
    { id: 1, brand: 'Philips' },
    { id: 1, brand: 'Zoll' },
  ];

  const isEmpty = false;

  return (
    <div className="columns is-centered pt-5">
      <div className="column is-three-quarters">
        <div className="title">Lista de Ventiladores:</div>
        {isEmpty && <ListWithoutItems />}

        {!isEmpty &&
          vents.map((item) => (
            <VentilatorsItem key={item.id} ventilator={item} />
          ))}
        <button className="button is-info is-pulled-right">Adicionar</button>
      </div>
    </div>
  );
}

export default VentilatorsList;
