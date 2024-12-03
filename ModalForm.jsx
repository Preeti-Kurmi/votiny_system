import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function ModalForm({ onClose, onVote, students }) {
  const [voterName, setVoterName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (voterName.trim()) {
      onVote(voterName, selectedStudent);
      setVoterName('');
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="bg-red-700 p-10 rounded-xl w-full max-w-max modal-content">
        <button onClick={onClose} className="bg-black text-white p-2 w-20 rounded-l-lg">X</button>
        <form onSubmit={handleSubmit}>
          <label >
            Student Name:
            <input  
            
              type="text" 
              value={voterName} 
              onChange={(e) => setVoterName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Choose Monitor:
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
              {students.map(student => (
                <option key={student.name} value={student.name}>{student.name}</option>
              ))}
            </select>
          </label>
          <button type="submit" className='bg-green-500 rounded-lg m-16 p-4'>Vote</button>
        </form>
      </div>
    </div>,
    document.body // Portal target
  );
}

export default ModalForm;
