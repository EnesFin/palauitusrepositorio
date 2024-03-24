import React from "react";

const Persons = ({ persons, newFilter, removePerson }) => {
  if (!persons || !Array.isArray(persons)) {
    return <p>Loading...</p>; // Or display a placeholder message
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()) // Case-insensitive filtering
  );

  return (
    <ul>
      {filteredPersons.map((filteredPerson) => (
        <li key={filteredPerson.id}>
          {filteredPerson.name} {filteredPerson.number}
          <button onClick={() => removePerson(filteredPerson.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
