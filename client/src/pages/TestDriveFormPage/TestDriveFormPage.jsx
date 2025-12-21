import React from 'react';
import TestDriveForm from '../../components/forms/TestDriveForm/TestDriveForm';
import './TestDriveFormPage.scss';

const TestDriveFormPage = () => {
  return (
    <div className="page testdrive-page">
      <div className="page-content">
        <div className="card-wrap">
          <div className="card">
            {/* keep original form inside card if needed */}
            <TestDriveForm />
          </div>
        </div>

  {/* cart badge removed per design request */}
      </div>
    </div>
  )
}

export default TestDriveFormPage