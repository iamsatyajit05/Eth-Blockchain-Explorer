import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function AddressInfo(alchemy) {
	const [addressInfo, setAddressInfo] = useState(null);
	const { address } = useParams();

	useEffect(() => {
		async function fetchData(address) {
			const addressData = await alchemy.alchemy.core.getBalance(address);
			setAddressInfo(addressData._hex);
		}
		fetchData(address);
	}, [alchemy.alchemy.core, address]);


	if (!addressInfo) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Address Data 💡</h2>
			<div className="p-4 text-white">
				<p className="text-white"><b>Address</b> {address.slice(0, 6)}...{address.slice(-4)}</p>
				<p className="text-white"><b>Balance</b> {parseInt(addressInfo, 16) / 1000000000000000000} ETH</p>
			</div>
		</div>
	);
}

export { AddressInfo };