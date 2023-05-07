import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function CurrentBlock(alchemy) {
	const [block, setBlock] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const currentBlock = await alchemy.alchemy.core.getBlock();
			setBlock(currentBlock);
		}
		fetchData();
	}, [alchemy.alchemy.core]);

	if (!block) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Latest Block 🆕</h2>
			<div className="p-4">
				<Link to={`/block/${block.number}`} className="px-2 cursor-pointer">
					<p className="text-white"><b>Block Number</b> {block.number}</p>
					<p className="text-white"><b>Mined By</b> {block.miner.slice(0, 6)}...{block.miner.slice(-4)}</p>
					<p className="text-white"><b>Total Transactions</b> {block.transactions.length}</p>
				</Link>
			</div>
		</div>
	);
}

export { CurrentBlock };