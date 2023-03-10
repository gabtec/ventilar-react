import { Link, useParams } from 'react-router-dom';
import ListWithoutItems from '../../components/ListWithoutItems';
import VentilatorsItemByWard from '../../components/VentilatorsItemByWard';
import api from '../../apiConnector/axios';
import { useEffect, useState } from 'react';

function AvailableVentilatorsList() {
  const params = useParams();
  const [ventilators, setVentilators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const resp = await api.get(
          `/ventilators/?status=true&cat=${params.cat.toUpperCase()}`
        );
        setVentilators(resp.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="column is-three-quarters">
        <div className="title">Lista de Ventiladores Disponíveis:</div>

        {isLoading && <ListWithoutItems />}
        {!isLoading &&
          ventilators.map((item) => (
            <VentilatorsItemByWard key={item.wardID} ventilator={item} />
          ))}
        <Link
          to="/spa/consumer"
          className="button is-info is-pulled-right"
          data-cy="close-available-vents"
        >
          <box-icon color="white" name="chevron-left-circle" />
          <span className="ml-2">Voltar</span>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
}

export default AvailableVentilatorsList;
