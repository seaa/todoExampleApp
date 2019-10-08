import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TodoList from '../../components/TodoList/TodoList';

// this is a connected HOC component, we want the wrapped Home component inside of it
import { default as _Home } from './Home';
const Home = _Home.WrappedComponent;

// mock data
const todosMock = [
  {
    id: 1,
    title: 'todo 1',
    description: 'sarasa'
  },
  {
    id: 2,
    title: 'todo 2',
    description: 'sarasa'
  }
];

let component;

describe('Home', function() {

  beforeEach(() => {
    component = shallow(
      <Home
      todos={todosMock}
      />
    );
  });

  afterEach(() => {
    component = undefined;
  });

  it('renders correct components', () => {
    expect(component.find('div.Home')).to.have.length(1);
    expect(component.find('div.lander')).to.have.length(1);
    expect(component.find(TodoList)).to.have.length(1);
  });

  it('passes the correct props to TodoList', () => {
    const expectedProps = { data: todosMock };
    expect(component.find(TodoList).props()).to.deep.equal(expectedProps);
  });

});
