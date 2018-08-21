const channels = [{
    id: 1,
    name: 'soccer',
  }, {
    id: 2,
    name: 'baseballam',
  }];
  
  
  export const resolvers = {
    Query: {
      channels: () => {
        return channels;
      },
    },
  };
  