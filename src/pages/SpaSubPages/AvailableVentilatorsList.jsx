import { Link, useParams } from 'react-router-dom';
import ListWithoutItems from '../../components/ListWithoutItems';
import VentilatorsItemByWard from '../../components/VentilatorsItemByWard';
import { store } from '../../store';
import useFetch from '../../hooks/useFetch';

function AvailableVentilatorsList(props) {
  const token = store.getState().auth.accessToken;
  const params = useParams();
  const url = `http://localhost:3002/api/ventilators/?status=true&cat=${params.cat.toUpperCase()}`;

  const { loading, error, value } = useFetch(
    url,
    { headers: { authorization: `Bearer ${token}` } },
    [url]
  );

  return (
    <>
      <div className="columns is-centered pt-5">
        <div className="column is-three-quarters">
          <div className="title">Lista de Ventiladores Disponíveis:</div>

          {loading && <ListWithoutItems />}
          {!loading &&
            value.map((item) => (
              <VentilatorsItemByWard key={item.wardID} ventilator={item} />
            ))}
          <Link to="/spa" className="button is-info is-pulled-right">
            <box-icon color="white" name="chevron-left-circle" />
            <span className="ml-2">Voltar</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AvailableVentilatorsList;
