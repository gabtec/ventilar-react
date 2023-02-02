import { Link, useParams } from 'react-router-dom';
import ListWithoutItems from './ListWithoutItems';
import VentilatorsItemByWard from './VentilatorsItemByWard';
import { store } from '../store';
import useFetch from '../hooks/useFetch';

function VentilatorsList(props) {
  const token = store.getState().auth.accessToken;
  const params = useParams();
  const url = `http://localhost:3002/api/ventilators/?status=free&cat=${params.cat.toUpperCase()}`;

  const { loading, error, value } = useFetch(
    url,
    { headers: { authorization: `Bearer ${token}` } },
    [url]
  );

  return (
    <>
      <div className="columns is-centered pt-5">
        <div className="column is-three-quarters">
          <div className="title">{props.pageTitle}</div>
          {loading && <ListWithoutItems />}
          {!loading &&
            value.map((item) => (
              <VentilatorsItemByWard key={item.wardID} ventilator={item} />
            ))}
          <Link to="/spa" className="button is-info is-pulled-right">
            Voltar
          </Link>
        </div>
      </div>
    </>
  );
}

export default VentilatorsList;
