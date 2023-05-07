import { Alchemy, Network } from 'alchemy-sdk';
import { Route, Switch, Link } from 'react-router-dom';
import { SearchInput } from './component/SearchInput';
import { LatestBlocks } from './component/LatestBlocks';
import { CurrentBlock } from './component/CurrentBlock';
import { CurrentBlockInfo } from './component/CurrentBlockInfo';
import { TxnsOfBlock } from './component/TxnsOfBlock';
import { TxnInfo } from './component/TxnInfo';
import { AddressInfo } from './component/AddressInfo';

import './App.css';

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
	return (
		<div className='bg-slate-950 min-h-screen'>
			<div className="max-w-[425px] m-auto">
				<nav className='text-white text-2xl font-bold text-center py-4'><Link to="/">Ethereum Blockchain Explorer</Link></nav>
				<SearchInput></SearchInput>
				<Switch>
					<Route exact path="/">
						<CurrentBlock alchemy={alchemy}></CurrentBlock>
						<LatestBlocks alchemy={alchemy}></LatestBlocks>
					</Route>
					<Route path="/block/:currentBlockNumber">
						<CurrentBlockInfo alchemy={alchemy} />
						<TxnsOfBlock alchemy={alchemy} />
					</Route>
					<Route path="/txn/:txnHash">
						<TxnInfo alchemy={alchemy} />
					</Route>
					<Route path="/address/:address">
						<AddressInfo alchemy={alchemy} />
					</Route>
				</Switch>

				<footer className='text-center p-4'>
					<p className='text-white mb-1'>Made with 💛 by <a className='text-white underline' href="https:/twitter.com/0xSatyajit" target='_blank'>Satyajit</a></p>
					<p><a className='text-white underline' href="https://university.alchemy.com/">Alchemy University - Ethereum Dev. Bootcamp</a></p>
				</footer>
			</div>
		</div>
	);
}

export default App;
