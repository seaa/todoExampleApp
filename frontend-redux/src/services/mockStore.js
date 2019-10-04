import uuid from 'uuid/v1';

const resourcesMap = {
  'token-auth/':        { method: 'login', resource: [] },
  'core/users/':        { method: 'signup', resource: [] },
  'core/current_user/': { method: 'executeRequest', resource: 'current' },
  'api/':               { method: 'executeRequest', resource: 'todos' }
}

const store = {
  data: {
    users: [
      {
        username: 'user',
        password: '123'
      }
    ],
    current: {},
    todos: [
      {
        id: uuid(),
        title: "Learn JS",
        description: "description"
      },
      {
        id: uuid(),
        title: "Learn React",
        description: "description"
      },
      {
        id: uuid(),
        title: "Learn Redux",
        description: "description"
      }
    ]
  },
  save: () => {
    localStorage.setItem('mockstore', store.data);
  },
  load: () => {
    const saved = localStorage.getItem('mockstore');
    store.data = {...saved};
  },
  exec: (req) => {
    const body = req.method === 'POST' && JSON.parse(req.body);
    const behavior = resourcesMap[req.service];

    // uncomment load and save to get the store to persist between runs
    //store.load();
    const response = store[behavior.method]({...req, body}, behavior.resource);
    //store.save();
    return response
  },
  executeRequest: (req, resource) => {
    switch (req.method) {
      case 'GET': {
        return store.data[resource];
      }
      case 'POST': {
        const slice = store.data[resource];
        let update;
        if (Array.isArray(slice)) {
          update = [...slice, { ...req.body, id: uuid() }];
        } else {
          update = req.body;
        }
        store.data[resource] = update;
        return update;
      }
      // case PUT, DELETE
      // ...
      default: return store;
    }
  },
  login: (req) => {
    const user = store.data.users.find((u) => u.username === req.body.username);
    if (user && user.password === req.body.password) {
      store.data.current = {...user};
      return {user, token: uuid()};
    } else {
     throw Error('bad request');
    }
  },
  signup: (req) => {
    const user = {...req.body, id: uuid()};
    store.data.users = [store.data.users, user];
    store.data.current = user;
    return {...user, token: uuid()};
  },
};

export {
  store
};
