import produce from 'immer';

export const initialState = {
  Items: [],
}

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      
    }
  })
}