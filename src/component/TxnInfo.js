import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function TxnInfo(alchemy) {
	const [txnInfo, setTxnInfo] = useState(null);
	const { txnHash } = useParams();

	useEffect(() => {
		async function fetchData(tx) {
			const txnData = await alchemy.alchemy.core.getTransactionReceipt(tx);
			setTxnInfo(txnData);
		}
		fetchData(txnHash);
	}, [alchemy.alchemy.core, txnHash]);


	if (!txnInfo) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Txn Info 💡</h2>
			<div className="p-4">
				<p className="text-white"><b>Txn Hash</b> {txnInfo.transactionHash.slice(0, 6)}...{txnInfo.transactionHash.slice(-4)}</p>
				<p className="text-white"><b>Block</b> {txnInfo.blockNumber}</p>
				<p className="text-white"><b>From</b> <Link to={`/address/${txnInfo.from}`} className='underline'>{txnInfo.from.slice(0, 6)}...{txnInfo.from.slice(-4)}</Link></p>
				<p className="text-white"><b>To</b> <Link to={`/address/${txnInfo.to}`} className='underline'>{txnInfo.to.slice(0, 6)}...{txnInfo.to.slice(-4)}</Link></p>
			</div>
		</div>
	);
}

export { TxnInfo };