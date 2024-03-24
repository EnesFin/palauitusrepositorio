import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import PersonAPI from './services/personsAPI';
import Notification from './components/Notification';
import Persons from './components/Persons';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    PersonAPI.getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => {
        console.error("Error fetching persons:", error);
        setNotification({ message: "Error fetching persons", success: false });
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        PersonAPI.update(existingPerson.id, nameObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotification({ message: `${newName} was successfully updated`, success: true });
            setTimeout(() => setNotification(null), 3000);
          })
          .catch((error) => {
            setNotification({ message: `Error updating ${newName}`, success: false });
            setTimeout(() => setNotification(null), 3000);
          });
      }
    } else {
      const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
      const newId = String(maxId + 1);
      // Koska käytän sisäänrakennettua "JSON-Server"-laajennusta, "ID"-muuttujien on oltava "string"-arvoja.
      const newPerson = {
        id: newId,
        ...nameObject,
      };

      PersonAPI.create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({ message: `${newName} was successfully added`, success: true });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          setNotification({ message: `${error.response.data.error}`, success: false });
          setTimeout(() => setNotification(null), 3000);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const removePerson = (id) => {
    const personToDelete = persons.find((person) => person.id == id);
  
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      PersonAPI.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id != id));
          setNotification({
            message: `${personToDelete.name} was successfully deleted`,
            success: true,
          });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          console.error(error);
          setNotification({
            message: `Error deleting ${personToDelete.name}`,
            success: false,
          });
          setTimeout(() => setNotification(null), 3000);
        });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson}></Persons>
    </div>
  );
};

export default App;