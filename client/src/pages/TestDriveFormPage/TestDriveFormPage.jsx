import { useParams } from 'react-router-dom';
import TestDriveForm from '../../components/forms/TestDriveForm/TestDriveForm';
import './TestDriveFormPage.scss';


const TestDriveFormPage = () => {
  const { id } = useParams();

  return (
    <div className="page testdrive-page">
      <div className="page-content">
        <div className="card-wrap">
          <div className="card">
            <TestDriveForm cardId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestDriveFormPage