import { Store, createStore } from 'redux';
import reducer from './reducer';

declare var window: any;

const localState = localStorage.getItem('state');


const persistedState = typeof localState === 'string'
	? JSON.parse(localState)
	: {};

const store: Store<any> = createStore(
	reducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(()=>{
	localStorage.setItem('state', JSON.stringify(store.getState()))
});

export default store;
