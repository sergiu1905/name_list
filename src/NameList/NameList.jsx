import './NameList.css';
import { useState } from 'react';

export default function NameList() {
  const presetNames = [
    { firstName: 'Gheorghe', lastName: 'Hagi' },
    { firstName: 'Gica', lastName: 'Popescu' },
    { firstName: 'Lacatus', lastName: 'Marius' },
  ];
  const [importName, setImportName] = useState('');
  const [importSurname, setImportSurname] = useState('');
  const [selectedName, setSelectedName] = useState(null);
  const [fullName, setFullName] = useState(presetNames);
  const [filterName, setFilterName] = useState('');
  const handleName = (event) => {
    const firstName =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    setImportName(firstName);
  };

  const handleSurname = (event) => {
    const lastName =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    setImportSurname(lastName);
  };

  const handleCreateName = () => {
    if (importName && importSurname) {
      setFullName([
        ...fullName,
        { firstName: importName, lastName: importSurname },
      ]);
      setImportName('');
      setImportSurname('');
    } else {
      alert('you must write your first and last name');
    }
  };
  const handleItemClick = (index) => {
    setSelectedName(index);
    const selectedFullName = fullName[index];
    setImportName(selectedFullName.firstName);
    setImportSurname(selectedFullName.lastName);
  };
  const handleDeleteName = () => {
    setFullName(fullName.filter((_, index) => index !== selectedName));
    setSelectedName(null);
    setImportName('');
    setImportSurname('');
  };
  const handleFilterName = (event) => {
    const filter = event.target.value.toLowerCase();
    setFilterName(filter);
  };
  const handleUpdateName = () => {
    if (selectedName && (importName !== '' || importSurname !== '')) {
      setFullName((prevName) => {
        return prevName.map((name, index) => {
          if (index === selectedName) {
            return {
              firstName: importName !== '' ? importName : name.firstName,
              lastName: importSurname !== '' ? importSurname : name.firstName,
            };
          }
          return name;
        });
      });
      setImportName('');
      setImportSurname('');
      setSelectedName(null);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="decoration">
          <div className="circle red"></div>
          <div className="circle yellow"></div>
          <div className="circle green"></div>
        </div>
        <h3>Name List</h3>
      </div>
      <div className="body_container">
        <div className="filter">
          <h5>Filter prefix :</h5>
          <input type="text" value={filterName} onChange={handleFilterName} />
        </div>
        <div className="list_names">
          <div className="show_names">
            {fullName
              .filter((name) => {
                return (
                  name.firstName.toLowerCase().includes(filterName) ||
                  name.lastName.toLowerCase().includes(filterName)
                );
              })
              .map((name, index) => (
                <li
                  key={index}
                  className={selectedName === index ? 'selected' : ''}
                  onClick={() => handleItemClick(index)}
                >
                  {name.firstName} {name.lastName}
                </li>
              ))}
          </div>

          <div className="add_name">
            <div>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                value={importName}
                onChange={handleName}
              />
            </div>
            <div>
              <label htmlFor="surname">Surname :</label>
              <input
                type="text"
                id="surname"
                value={importSurname}
                onChange={handleSurname}
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleCreateName}>Create</button>
          <button onClick={handleUpdateName}>Update</button>
          <button onClick={handleDeleteName} disabled={selectedName === null}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
