import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function TxnsOfBlock(alchemy) {
	const [txnList, setTxnList] = useState(null);
	const { currentBlockNumber } = useParams();

	useEffect(() => {
		async function fetchData(blockNumber) {
			const blockTxnList = await alchemy.alchemy.core.getBlockWithTransactions(parseInt(blockNumber));
			setTxnList(blockTxnList.transactions.reverse());
		}
		fetchData(currentBlockNumber);
	}, [alchemy.alchemy.core, currentBlockNumber]);


	if (!txnList) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Txn on Block 💸</h2>
			<div className="px-4 py-0 h-96 overflow-auto">
				{txnList.map((txn, index) => (
					<Link to={`/txn/${txn.hash}`}>
						<div key={txn.hash} className={`px-2 py-4 cursor-pointer ${index === txn.length - 1 ? "pb-0" : "border-b-2 border-b-slate-400"}`}>
							<p className="text-white"><b>Txn Index</b> {index + 1}</p>
							<p className="text-white"><b>Txn Hash</b> {txn.hash.slice(0, 6)}...{txn.hash.slice(-4)}</p>
							<p className="text-white"><b>To</b> {txn.to.slice(0, 6)}...{txn.to.slice(-4)}</p>
							<p className="text-white"><b>From</b> {txn.from.slice(0, 6)}...{txn.from.slice(-4)}</p>
							<p className="text-white"><b>Value</b>  {parseInt(txn.value._hex, 16) / 1000000000000000000} ETH</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export { TxnsOfBlock };