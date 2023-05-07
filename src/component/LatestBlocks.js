import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function LatestBlocks(alchemy) {
	const [blocks, setBlocks] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const localBlocks = [];
			const currentBlockNumber = await alchemy.alchemy.core.getBlockNumber();
			for (let i = 1; i < 6; i++) {
				const blockNumber = currentBlockNumber - i;

				console.log(blockNumber, typeof blockNumber);
				const block = await alchemy.alchemy.core.getBlock(blockNumber);
				localBlocks.push(block);
			}
			setBlocks(localBlocks);
		}
		fetchData();
	}, [alchemy.alchemy.core]);

	if (!blocks) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Previous Blocks 📦</h2>
			<div className="p-4">
				{blocks.map((block, index) => (
					<Link to={`/block/${block.number}`}>
						<div key={block.number} className={`px-2 py-4 cursor-pointer ${index === blocks.length - 1 ? "pb-0" : "border-b-2 border-b-slate-400"}`}>
							<p className="text-white"><b>Block Number </b> {block.number}</p>
							<p className="text-white"><b>Mined By </b> {block.miner.slice(0, 6)}...{block.miner.slice(-4)}</p>
							<p className="text-white"><b>Total Transactions</b> {block.transactions.length}</p>
						</div>
					</Link>
				))}
			</div>
			{/* <div className="w-full mt-4 border-t-[1px] border-t-slate-400">
                <button className="w-full p-3 text-white hover:bg-slate-800 focus:bg-slate-800">
                    View All Blocks
                </button>
            </div> */}
		</div>
	);
}

export { LatestBlocks };