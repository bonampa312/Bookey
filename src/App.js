import React, { Component } from 'react';
import logo from './bookslogo.jpg';
import './App.css';
import axios from 'axios'

const apiMLUrl = 'https://www.googleapis.com/books/v1/'
const apiKey = 'AIzaSyAKE2NkNWfLuBRoH_uWggVpcLwXoLHPJQw'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemName: '',
      itemsData: ['']
    }
    this.setParam = this.setParam.bind(this)
    this.getItems = this.getItems.bind(this);
  }

  getItems(props){
      var itemInput = this.state.itemName
      var self = this
      axios.get(apiMLUrl+'volumes', {
        params: {
          q: itemInput,
          key: apiKey
        }
      })
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
		      return;
        }
        console.log(response.data);
        self.setState({itemsData: response.data})
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  setParam(event){
    var itemInput = event.target.value
    this.setState({itemName: itemInput})
  }

  itemsList() {
     var items = this.state.itemsData.items
     var self = this
     if (items) {
       console.log(items);
       var listItems = items.map(function(item) {
         return (
          <div>
              <img src={item.volumeInfo.imageLinks.thumbnail} className="Card-image"/>
              <div className="Card-description">
                <div className="Card-title">{item.volumeInfo.title}</div>
              </div>
          </div>
        )
       })
       return(
         <div>{listItems}</div>
       )
     } else {
       console.log("Error");
       return(
         <div></div>
       )
     }

   }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <div id="search">
              <img src={logo} className="App-logo" alt="logo" />
              <br/>
              <div>
                <input type="text" onChange={this.setParam}></input>
                <button onClick={this.getItems}>Go for it</button>
              </div>
              <br/>
            </div>
          </header>
          <div className="App-intro">
            <div>{this.itemsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
