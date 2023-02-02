import VentilatorsList from '../../components/VentilatorsList';

const ventsList = [
  // {
  //   id: 3,
  //   brand: 'Phillips',
  //   model: 'Trillopy',
  //   serial: '3000-5X',
  //   category: 'VNI',
  //   is_available: true,
  //   parked_at: 2,
  //   created_at: '2023-01-31T17:45:54.399Z',
  //   updated_at: '2023-01-31T17:45:54.399Z',
  //   park: {
  //     id: 2,
  //     name: 'HDP_Urgência',
  //     belongs_to: 'HDP',
  //     created_at: '2023-01-26T09:27:09.967Z',
  //     updated_at: '2023-01-26T09:27:09.967Z',
  //   },
  // },
  // {
  //   id: 4,
  //   brand: 'Lifepack',
  //   model: '12',
  //   serial: '12P003-5X',
  //   category: 'VNI',
  //   is_available: true,
  //   parked_at: 2,
  //   created_at: '2023-01-31T17:46:16.007Z',
  //   updated_at: '2023-01-31T17:46:16.007Z',
  //   park: {
  //     id: 2,
  //     name: 'HDP_Urgência',
  //     belongs_to: 'HDP',
  //     created_at: '2023-01-26T09:27:09.967Z',
  //     updated_at: '2023-01-26T09:27:09.967Z',
  //   },
  // },
  {
    wardName: 'HDP_Urgência',
    wardID: 2,
    ventsCount: 3,
  },
  {
    wardName: 'HSA_Intensiva',
    wardID: 4,
    ventsCount: 5,
  },
];

function SpaConsumerAvailableVentsPage() {
  const pageTitle = 'Lista de Ventiladores Disponíveis:';

  return <VentilatorsList pageTitle={pageTitle} list={ventsList} />;
}

export default SpaConsumerAvailableVentsPage;
