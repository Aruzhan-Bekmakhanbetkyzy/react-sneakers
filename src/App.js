import Drawer from './components/Drawer';
import Header from './components/Header';
import Card from './components/Card';

const arr = [
  { 'name': "Men's Sneakers Nike Blazer Mid Suede", 'price': '219.99$', "imageUrl": "/img/sneakers/1.jpg" },
  { 'name': "Men's Sneakers Nike Air Max 270", 'price': '249.99$', "imageUrl": "/img/sneakers/2.jpg"  },
  { 'name': "Men's Sneakers Nike Blazer Mid Suede", 'price': '154.99$', "imageUrl": "/img/sneakers/3.jpg"  },
  { 'name': "Sneakers Puma X Aka Boku Future Rider", 'price': '163.99$', "imageUrl": "/img/sneakers/4.jpg"  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header />
      <div className='content p-40'>
        <div className='d-flex align-center justify-between mb-40'>
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"></img>
            <input placeholder="Search..."></input>
          </div>
        </div>
      
        <div className="d-flex">

          {arr.map((obj) => (
          <Card 
          title={obj.name}
          price={obj.price}
          imageUrl={obj.imageUrl} 
          onClick={() => console.log(obj)}
          /> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
