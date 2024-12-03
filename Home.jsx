import React, { useState } from 'react';
import ModalForm from './ModalForm';

const initialData = [
  { name: "Suresh", votes: 0, voters: [] },
  { name: "Deepank", votes: 0, voters: [] },
  { name: "Abhik", votes: 0, voters: [] }
];

function Home() {
  const [students, setStudents] = useState(initialData);
  const [showModal, setShowModal] = useState(false);

  const handleVote = (voterName, selectedStudent) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.name === selectedStudent ? 
          { ...student, votes: student.votes + 1, voters: [...student.voters, voterName] } 
          : student
      )
    );
    setShowModal(false); // Close modal after voting
  };
  const totalVotes=students.reduce((acc,stu)=>acc+stu.votes,0);
  // const totalVotes = students.reduce((acc, student) => acc + student.votes, 0);

  const handleDeleteVote = (studentName, voterName) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.name === studentName ? 
          { 
            ...student, 
            votes: student.votes - 1, 
            voters: student.voters.filter(voter => voter !== voterName) 
          } 
          : student
      )
    );
  };

  return (
    <div>
        <div className='bg-black text-white '>
      <h1 className='text-3xl '>Class Monitor Vote</h1>
      <p>Total Votes:{totalVotes}</p>
      <button className='bg-red-800 h-11 w-36 rounded-lg' onClick={() => setShowModal(true)}>Add New Vote</button>
      
      {students.map(student => (
        <div  className="bg-red-500 flex p-7 m-11" key={student.name}>
          <h2>{student.name}</h2>
          <p className='flex ml-10'>Total Votes: {student.votes}</p>
          {student.voters.map((voter, index) => (
            <div key={index} className='flex ml-10'>
              {voter} <button className="bg-black w-20 h-10 rounded-lg ml-11"onClick={() => handleDeleteVote(student.name, voter)}>Delete</button>
            </div>
          ))}
        </div>
        
      ))}

      {showModal && <ModalForm onClose={() => setShowModal(false)} onVote={handleVote} students={students} />}
    </div>
    </div>
  );
}

export default Home;
