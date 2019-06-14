import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
        // {this.state.filters.type !== 'all' or === 'all' }
      }
    }
  }

  fetchPets = () => {
    // create a fetch function to fetch the API of the pets and set the url being fetched to a mock URL for sake of simplification

    let url = '/api/pets';
    // !== returns true if the objects are the same type and similar  we are expecting !== to equal 'all' or similar.  Look to line 17 for source

    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`;
    }
    // now we must fetch from the url 
    fetch(url) 
    // .then ( response TO .json())
      .then( res => res.json() )
      // .then take pets TO this.setState *set the state* ({ pets })
      .then( pets => this.setState( {pets} ));  
  };

  // create callback prop to change whenever the value of <select> is changed with the value of the  <select>
  onChangeType = ({ target: {value} }) => {
    this.setState({ filters: { ...this.state.filters, type: value }});
  };

  // create function to find pets via iteration.   create and constant and set it to this.state.pets.  Iterate over the pets with map().  Return all the pets  whose ID matches the pet object.  Its easier to use the spread operator to return truthy objects for every pet object that isAdopted value is set to true
  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">

            <div className="four wide column">
              <Filters 
              onChangeType = { this.onChangeType }
              onFindPetsClick = {this.fetchPets}
              />
            </div>

            <div className="twelve wide column">
              <PetBrowser 
              pets = {this.state.pets} 
              onAdoptPet = {this.onAdoptPet}
              />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
